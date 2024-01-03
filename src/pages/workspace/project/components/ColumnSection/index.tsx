import { putApi } from '@/api/api';
import { API_PATH } from '@/api/path';
import MyDialog from '@/components/common/Dialog';
import FormTextField from '@/components/form/FormTextField';
import { IRole } from '@/types/project';
import { r } from '@/utils/routes';
import { NotifyTypeEnum, notify } from '@/utils/toast';
import { useDroppable } from '@dnd-kit/core';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import ModalAddTask from '../ModalAddTask';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskSection from '../TaskSection';

interface IProps {
  col: any;
  onAddTask: () => void;
  onDeleteTask: (id: string) => void;
  refetch: any;
  assigneList: IRole[];
}

interface IFormValues {
  title: string;
  id: string;
}

const DEFAULT_FORM_VALUES = { title: "", id: "" }
function ColumnSection(props: IProps) {
  const { id } = useParams();
  const isSubmitted = useRef(false);

  const { setNodeRef } = useDroppable({ id: props.col.columnID });

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (values: IFormValues) => {
      return putApi(r(API_PATH.PROJECT.COLUMN.DETAIL, { projectId: id, columnId: values.id }), { title: values.title })
    },
    onSuccess: () => {
      notify('Edit Column Success !', NotifyTypeEnum.SUCCESS);
      formik.resetForm({ values: DEFAULT_FORM_VALUES });
      props.refetch();
    },
    onError: (err: any) => {
      notify(err.response.data.message, NotifyTypeEnum.ERROR)
    }
  });

  const formik = useFormik<IFormValues>({
    initialValues: DEFAULT_FORM_VALUES,
    onSubmit: (values) => mutate(values),
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
  }

  const onAddTask = () => {
    setIsOpenModal(false);
    props.onAddTask();
  }

  return (
    <div className='p-2 rounded-md bg-gray-100 border border-solid border-white w-[350px] max-h-[600px] overflow-y-scroll'>
      <div className='flex items-center justify-between'>
        {
          formik.values.id === props.col.id ?
            <form
              onSubmit={(e) => {
                isSubmitted.current = true;
                formik.handleSubmit(e);
              }}
              noValidate
            >
              <FormTextField
                key='title'
                label='Title'
                formik={formik}
                type='text'
                name='title'
                required
                isSubmitted={isSubmitted.current}
              />
            </form>
            :
            <h5 className='text-xl font-bold tracking-wide border-b boder-solid border-transparent'>
              {props.col.title}
            </h5>
        }

        <EditIcon
          fontSize='small'
          className='cursor-pointer'
          onClick={() => {
            if (formik.values.id === props.col.id) formik.handleSubmit()
            else formik.setValues({ title: props.col.title, id: props.col.id })
          }}
        />
      </div>
      <SortableContext
        id={props.col.id}
        items={props.col.tasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className='flex flex-col gap-y-2 mt-2'>
          {props.col.tasks && props.col.tasks.length && props.col.tasks.map((task) => (
            <div key={task.id}>
              <TaskSection id={task.id} task={task} onDeleteTask={props.onDeleteTask} />
            </div>
          ))}
        </div>
      </SortableContext>
      <div className='mt-4'>
        <div className='flex items-center gap-x-1 w-fit cursor-pointer' onClick={() => setIsOpenModal(true)}>
          <AddIcon fontSize='small' />
          <span className='font-medium'>Add</span>
        </div>
      </div>

      <MyDialog
        open={isOpenModal}
        title='Add Task'
        isShowAction={false}
        onClose={onCloseModal}
        doAction={() => { }}
      >
        <ModalAddTask
          projectId={id}
          columnID={props.col.id}
          onAddTask={onAddTask}
          assigneList={props.assigneList}
        />
      </MyDialog>
    </div>
  )
}

export default ColumnSection