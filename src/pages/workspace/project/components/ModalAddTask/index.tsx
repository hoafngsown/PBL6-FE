import FormTextField from '@/components/form/FormTextField';
import { Backdrop, Button, CircularProgress, FormHelperText, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { postApi, postApiMultipart } from '@/api/api';
import { API_PATH } from '@/api/path';
import FormDatePicker from '@/components/form/FormDatePicker';
import { addTaskSchema } from '@/libs/validations/login';
import { IRole } from '@/types/project';
import { r } from '@/utils/routes';
import { NotifyTypeEnum, notify } from '@/utils/toast';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import clsx from 'clsx';
import { useFormik } from 'formik';
import moment from 'moment';
import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
interface IFormValues {
  title: string;
  description: string;
  dueDate: Date | string;
  startDate: Date | string;
  assigneeId: string;
};

interface IProps {
  projectId: string;
  columnID: string;
  onAddTask: () => void;
  assigneList: IRole[];
}

const DEFAULT_FORM_VALUES: IFormValues = {
  title: '',
  description: '',
  assigneeId: '',
  dueDate: new Date(),
  startDate: new Date(),
}

function ModalAddTask(props: IProps) {
  const isSubmitted = useRef(false);

  const [file, setFile] = useState<File>();

  const [isLoading, setIsLoading] = useState(false);
  const [isAnalysis, setIsAnalysis] = useState(false);

  const [sourceText, setSourceText] = useState("");
  const [analizeText, setAnalizeText] = useState("");

  const formik = useFormik<IFormValues>({
    initialValues: DEFAULT_FORM_VALUES,
    validationSchema: addTaskSchema,
    onSubmit: (values) => {
      const params = {
        ...values,
        startDate: moment(values.startDate).format('DD-MM-YYYY'),
        dueDate: moment(values.startDate).format('DD-MM-YYYY'),
      }
      mutate(params);
    },
  });

  const { mutate, isLoading: isLoadingSubmitForm } = useMutation({
    mutationFn: (values: IFormValues) => {
      return postApi(r(API_PATH.PROJECT.TASK.CREATE, { projectId: props.projectId, columnId: props.columnID }), values, "")
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

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setFile(file)
  };

  const handleAnalysis = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("file", file);
      const response = await postApiMultipart(`/v1/api/spellcorrection`, formData);

      setSourceText(response.data.metadata.original_text);
      setAnalizeText(response.data.metadata.predict_text);
      formik.setFieldValue('description', response.data.metadata.predict_text);

      setIsAnalysis(true);
    } catch (error) {
      console.log({ error });
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-w-[450px]'>
      <div className='mb-6 flex items-center justify-center'>
        <div className='mb-6 flex items-center justify-center gap-x-4'>
          {!file && !isAnalysis && <Button
            size='large'
            fullWidth
            component="label"
            variant="contained"
            disabled={isLoading}
            onClick={() => setIsAnalysis(true)}
          >
            Typing
          </Button>}

          {file && !isAnalysis ?
            <Button
              variant='contained'
              size='large'
              className='w-full custom-button'
              type='button'
              disabled={isLoading}
              onClick={handleAnalysis}
            >
              Analyze
            </Button>
            : (isAnalysis ? <></> : <Button
              size='large'
              fullWidth
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              disabled={isLoading}
            >
              Upload
              <VisuallyHiddenInput type="file" onChange={handleUpload} />
            </Button>)
          }

        </div >

        {file && !isAnalysis && <span className='text-medium font-lg italic'>{file.name}</span>}


        {
          isAnalysis &&
          <form
            onSubmit={(e) => {
              isSubmitted.current = true;
              formik.handleSubmit(e);
            }}
            noValidate
          >
            <div className='mt-6 mb-1'>
              <span className='text-lg'>Origin Text: </span>
              <textarea
                disabled
                value={sourceText}
                className='border border-gray-500 rounded-md w-full p-2'
                rows={5}
              />
            </div>

            <div className='custom-input'>
              <div className='mb-6'>
                <span className='text-lg'>Predict Text: </span>
                <textarea
                  value={analizeText}
                  className={clsx('border border-gray-500 rounded-md w-full p-2', {
                    'border border-red-500 focus:border-red-500 focus:outline-red-500 focus:outline-[0.5px]': formik.errors.description

                  })}
                  rows={5}
                  onChange={(e) => {
                    setAnalizeText(e.target.value);
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

            <div className="custom-input mb-6">
              <FormDatePicker
                required
                key="start_date"
                label="Start Date"
                formik={formik}
                name="startDate"
                isSubmitted={isSubmitted.current}
                isDisabledTextField={true}
                isDisabledPast={true}
              />
            </div>
            <div className="custom-input mb-6">
              <FormDatePicker
                required
                key="deadline_date"
                label="Deadline Date"
                formik={formik}
                name="dueDate"
                isSubmitted={isSubmitted.current}
                isDisabledTextField={true}
                isDisabledPast={true}
              />
            </div>
            <div className="custom-input mb-6">
              <Select
                id="demo-simple-select"
                value={formik.values.assigneeId}
                label="Assignee"
                onChange={(event: SelectChangeEvent) => formik.setValues({ ...formik.values, assigneeId: event.target.value })}
                fullWidth
              >
                {props.assigneList.map((item) => <MenuItem value={item.userId}>{item.userId}</MenuItem>)}
              </Select>
            </div>

            <div>
              <Button
                variant='contained'
                size='large'
                className='w-full custom-button'
                type='submit'
                disabled={isLoadingSubmitForm}
              >
                Add
              </Button>
            </div>


          </form>
        }


        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div >
    </div >
  )
}

export default ModalAddTask

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});