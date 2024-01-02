import { getApi, postApi } from '@/api/api';
import { API_PATH } from '@/api/path';
import MyDialog from '@/components/common/Dialog';
import FormAutoComplete, { IOptionRecord } from '@/components/form/FormAutoComplete';
import FormTextField from '@/components/form/FormTextField';
import { ROLE_OPTIONS } from '@/constants/project';
import { addProjectSchema } from '@/libs/validations/login';
import { NotifyTypeEnum, notify } from '@/utils/toast';
import { Button, FormHelperText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

interface IProps {
  open: boolean;
  onClose: () => void;
  onAddProject: () => void;
}

interface IFormValues {
  title: string;
  description: string;
  email: string[];
  roles: string[];
}

const DEFAULT_FORM_VALUES = {
  title: "",
  description: "",
  email: [],
  roles: []
}

function AddProject(props: IProps) {
  const isSubmitted = useRef(false);

  const [page, setPage] = useState(1);
  const [userOptionList, setUserOptionList] = useState<IOptionRecord[]>([]);
  const [description, setDescription] = useState("");

  const { control, watch, reset } = useForm<Pick<IFormValues, 'email'>>({ defaultValues: { email: [] } });

  const { data: listUser } = useQuery({
    queryKey: ['GET_LIST_USER', page],
    queryFn: () => getAllUsers(),
    enabled: page !== - 1,
    onSuccess: (res) => {
      if (res.length === 0) return setPage(-1);
      setUserOptionList((prev) => ([...prev, ...res.map(x => ({ value: x.id, label: x.email }))]))
    }
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: any) => {
      return postApi(API_PATH.PROJECT.CREATE, values, "")
    },
    onSuccess: () => {
      notify('Add Project Success !', NotifyTypeEnum.SUCCESS);
      formik.resetForm({ values: DEFAULT_FORM_VALUES });
      setDescription('')
      reset({ email: [] })
      props.onAddProject();
    },
    onError: (err: any) => {
      notify(err.response.data.message, NotifyTypeEnum.ERROR)
    }
  });

  const getAllUsers = async () => {
    const response = await getApi(API_PATH.USER.GET_ALL, {
      limit: 10,
      page: page,
      search: watch('email'),
      searchBy: 'email'
    });
    return response.data.metadata;
  }

  const formik = useFormik<IFormValues>({
    initialValues: DEFAULT_FORM_VALUES,
    validationSchema: addProjectSchema,
    onSubmit: (values) => {
      if (!listUser) return;

      const params = {
        title: values.title,
        description,
        projectUsers: watch('email').map((em, index) => ({
          id: listUser.find((x) => x.email === em).id,
          role: values.roles[index]
        }))
      }

      mutate(params)
    },
  });

  const handleChangeRole = (index: number, event: SelectChangeEvent) => {
    const newRoles = [...formik.values.roles];
    newRoles[index] = event.target.value;
    formik.setFieldValue('roles', newRoles);
  }

  return (
    <MyDialog
      open={props.open}
      onClose={() => props.onClose()}
      doAction={() => formik.submitForm()}
      title='Add New Project'
      buttonName='Add'
      isShowAction={false}
    >
      <div className='w-[400px]'>
        <form
          onSubmit={(e) => {
            isSubmitted.current = true;
            formik.handleSubmit(e);
          }}
          noValidate
        >
          <div className='custom-input mb-6'>
            <FormTextField
              key='title'
              label='Title'
              formik={formik}
              type='text'
              name='title'
              required
              isSubmitted={isSubmitted.current}
            />
          </div>

          <div className='custom-input mb-6'>
            <div className='mb-6'>
              <span className='text-lg'>Description: </span>
              <textarea
                value={description}
                className={clsx('border border-gray-500 rounded-md w-full p-2', {
                  'border border-red-500 focus:border-red-500 focus:outline-red-500 focus:outline-[0.5px]': formik.errors.description

                })}
                rows={5}
                onChange={(e) => {
                  setDescription(e.target.value);
                  formik.setFieldValue('description', e.target.value);
                }}
              />
              {formik.errors.description && (
                <FormHelperText error={!!formik.errors.description}>
                  {formik.errors.description}
                </FormHelperText>
              )}
            </div>
          </div>

          <div className='custom-input mb-6'>
            <FormAutoComplete
              multiple
              freeSolo={false}
              shouldLoadMore={page >= 1}
              setPage={setPage}
              inputStyle={{ padding: '0' }}
              options={userOptionList}
              placeholder="Search user in system you want to add to your project..."
              control={control}
              name="email"
            />
          </div>

          <div className='custom-input mb-6 flex flex-col gap-y-2'>
            {watch('email') && watch('email').length && watch('email').map(((email: string, index: number) =>
              <div key={index} className='flex items-center justify-between'>
                <span className='inline-block'>{email}</span>
                <div className='w-[120px]'>
                  <Select
                    id="demo-simple-select"
                    value={formik.values.roles[index]}
                    label="Role"
                    onChange={(event: SelectChangeEvent) => handleChangeRole(index, event)}
                    fullWidth
                  >
                    {ROLE_OPTIONS.map((item) => <MenuItem value={item.value}>{item.label}</MenuItem>)}
                  </Select>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Button
              variant='contained'
              size='large'
              className='w-full custom-button'
              type='submit'
              disabled={isLoading}
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </MyDialog>
  )
}

export default AddProject