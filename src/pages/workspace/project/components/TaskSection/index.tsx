import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface IProps {
  id: string;
  task: any;
};

const TaskSection = ({ id, task }: IProps) => {

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='p-2 bg-white rounded-md'>
      <span className='block text-base font-medium tracking-wide'>{task.title}</span>
      <span className='block text-sm'>{task.description}</span>
      <div className='mt-1 flex items-center justify-end'>
        <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt='avt-user' className='w-7 h-7 rounded-[50%] object-contain' />
      </div>
    </div>
  )
}

export default TaskSection