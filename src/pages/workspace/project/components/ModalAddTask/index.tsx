import FormTextField from '@/components/form/FormTextField';
import { Button } from '@mui/material';

import { postApi } from '@/api/api';
import { API_PATH } from '@/api/path';
import FormDatePicker from '@/components/form/FormDatePicker';
import { NotifyTypeEnum, notify } from '@/utils/toast';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { useMutation } from 'react-query';

interface IFormValues {
  title: string;
  description: string;
  deadline_date: Date | string;
};

interface IProps {
  columnLength: number;
  columnID: string;
  onAddTask: () => void;
}

const DEFAULT_FORM_VALUES: IFormValues = {
  title: '',
  description: '',
  deadline_date: new Date(),
}

function ModalAddTask(props: IProps) {
  const isSubmitted = useRef(false);

  const formik = useFormik<IFormValues>({
    initialValues: DEFAULT_FORM_VALUES,
    // validationSchema: signInSchema,
    onSubmit: (values) => mutate(values),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: IFormValues) => {
      const params = {
        ...values,
        index: props.columnLength,
        columnID: props.columnID
      }
      return postApi(API_PATH.PROJECT.TASK.ADD, params, "")
    },
    onSuccess: () => {
      notify('Add Task Success !', NotifyTypeEnum.SUCCESS);
      formik.resetForm({ values: DEFAULT_FORM_VALUES });
      props.onAddTask();
    },
    onError: (err: any) => {
      notify(err.response.data.message, NotifyTypeEnum.ERROR)
    }
  });

  return (
    <div className='min-w-[450px]'>
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

        <div className='custom-input'>
          <div className='mb-6'>
            <FormTextField
              key='description'
              label='Description'
              formik={formik}
              type='text'
              name='description'
              required
              isSubmitted={isSubmitted.current}
            />
          </div>
        </div>

        <div className="custom-input mb-6">
          <FormDatePicker
            required
            key="deadline_date"
            label="Deadline Date"
            formik={formik}
            name="deadline_date"
            isSubmitted={isSubmitted.current}
            isDisabledTextField={true}
            isDisabledPast={true}
          />
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
  )
}

export default ModalAddTask