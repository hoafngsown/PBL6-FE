import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskSection from '../TaskSection';

import MyDialog from '@/components/common/Dialog';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import ModalAddTask from '../ModalAddTask';

interface IProps {
  col: any;
  onAddTask: () => void;
  onDeleteTask: (id: string) => void;
}
function ColumnSection(props: IProps) {

  const { setNodeRef } = useDroppable({ id: props.col.columnID });

  const [isOpenModal, setIsOpenModal] = useState(false);

  const onCloseModal = () => {
    setIsOpenModal(false);
  }

  const onAddTask = () => {
    setIsOpenModal(false);
    props.onAddTask();
  }

  return (
    <div className='p-2 rounded-md bg-gray-100 border border-solid border-white w-[350px] max-h-[600px] overflow-y-scroll'>
      <h5 className='text-xl font-bold tracking-wide border-b boder-solid border-transparent'>
        {props.col.title}
      </h5>
      <SortableContext
        id={props.col.columnID}
        items={props.col.tasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className='flex flex-col gap-y-2 mt-2'>
          {props.col.tasks && props.col.tasks.length && props.col.tasks.map((task) => (
            <div key={task.taskID}>
              <TaskSection id={task.taskID} task={task} onDeleteTask={props.onDeleteTask} />
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
          columnID={props.col.columnID}
          columnLength={props.col.tasks.length}
          onAddTask={onAddTask}
        />
      </MyDialog>
    </div>
  )
}

export default ColumnSection