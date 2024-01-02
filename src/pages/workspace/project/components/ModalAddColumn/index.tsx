import FormTextField from '@/components/form/FormTextField';
import { Button } from '@mui/material';

import { postApi } from '@/api/api';
import { API_PATH } from '@/api/path';
import { r } from '@/utils/routes';
import { NotifyTypeEnum, notify } from '@/utils/toast';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { useMutation } from 'react-query';

interface IFormValues {
  title: string;
};

interface IProps {
  onAddColumn: () => void;
  columnLength: number;
  projectID: string;
}

const DEFAULT_FORM_VALUES: IFormValues = {
  title: '',
}

function ModalAddColumn(props: IProps) {
  const isSubmitted = useRef(false);

  const formik = useFormik<IFormValues>({
    initialValues: DEFAULT_FORM_VALUES,
    onSubmit: (values) => mutate(values),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: IFormValues) => {
      return postApi(r(API_PATH.PROJECT.COLUMN.INDEX, { projectId: props.projectID }), values, "")
    },
    onSuccess: () => {
      notify('Add Column Success !', NotifyTypeEnum.SUCCESS);
      formik.resetForm({ values: DEFAULT_FORM_VALUES });
      props.onAddColumn();
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

export default ModalAddColumn