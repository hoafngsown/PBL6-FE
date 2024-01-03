import { isDeadlineDate } from '@/utils';
import clsx from 'clsx';
import moment from 'moment';

interface IProps {
  task: any;
};

function TaskItem(props: IProps) {
  console.log({ task: props.task })
  return (
    <div className='p-2 bg-white rounded-md'>
      <span className='block text-base font-medium tracking-wide'>{props.task.title}</span>
      <span className='block text-sm'>{props.task.description}</span>
      <div className='mt-1 flex items-center justify-between'>
        <span className='flex items-center gap-x-1 text-sm'>
          Deadline:
          <span className={clsx({ 'text-red-500': isDeadlineDate(props.task.dueDate) })}>
            {moment(props.task.dueDate).format('YYYY-MM-DD')}
          </span>
        </span>
        <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt='avt-user' className='w-7 h-7 rounded-[50%] object-contain' />
      </div>
    </div>
  )
}

export default TaskItem;