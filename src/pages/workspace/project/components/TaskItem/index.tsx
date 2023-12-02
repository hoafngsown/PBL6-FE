
interface IProps {
  task: any;
};

function TaskItem(props: IProps) {
  return (
    <div className='p-2 bg-white rounded-md'>
      <span className='block text-base font-medium tracking-wide'>{props.task.title}</span>
      <span className='block text-sm'>{props.task.description}</span>
      <div className='mt-1 flex items-center justify-end'>
        <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt='avt-user' className='w-7 h-7 rounded-[50%] object-contain' />
      </div>
    </div>
  )
}

export default TaskItem;