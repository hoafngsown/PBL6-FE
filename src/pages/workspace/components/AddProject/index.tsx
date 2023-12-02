import MyDialog from '@/components/common/Dialog';
import { addProjectSchema } from '@/libs/validations/login';
import { Button } from '@mui/material';
import { useFormik } from 'formik';

interface IProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

interface IFormValues {
  title: string;
}

const initValues = {
  title: ""
}
function AddProject(props: IProps) {

  const formik = useFormik<IFormValues>({
    initialValues: initValues,
    validationSchema: addProjectSchema,
    onSubmit: (values) => { console.log({ values }) },
  });

  return (
    <MyDialog
      open={props.open}
      onClose={() => props.onClose()}
      doAction={() => props.onSubmit()}
      title='Add New Project'
      buttonName='Add'
      isShowAction={false}
    >
      <div className='w-[600px]'>
        <Button type='submit' variant='contained'>Add</Button>
      </div>
    </MyDialog>
  )
}

export default AddProject