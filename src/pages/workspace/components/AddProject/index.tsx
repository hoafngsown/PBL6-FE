import { postApi } from '@/api/api';
import { API_PATH } from '@/api/path';
import MyDialog from '@/components/common/Dialog';
import FormTextField from '@/components/form/FormTextField';
import { addProjectSchema } from '@/libs/validations/login';
import { NotifyTypeEnum, notify } from '@/utils/toast';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { useMutation } from 'react-query';

interface IProps {
  open: boolean;
  onClose: () => void;
  onAddProject: () => void;
}

interface IFormValues {
  title: string;
}

const DEFAULT_FORM_VALUES = {
  title: ""
}

function AddProject(props: IProps) {
  const isSubmitted = useRef(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: IFormValues) => {
      return postApi(API_PATH.PROJECT.CREATE, values, "")
    },
    onSuccess: () => {
      notify('Add Project Success !', NotifyTypeEnum.SUCCESS);
      formik.resetForm({ values: DEFAULT_FORM_VALUES });
      props.onAddProject();
    },
    onError: (err: any) => {
      notify(err.response.data.message, NotifyTypeEnum.ERROR)
    }
  });

  const formik = useFormik<IFormValues>({
    initialValues: DEFAULT_FORM_VALUES,
    validationSchema: addProjectSchema,
    onSubmit: (values) => { mutate(values) },
  });

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
          <div className='custom-input'>
            <div className='mb-6'>
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