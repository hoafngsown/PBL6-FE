import { isDeadlineDate } from '@/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Popper } from '@mui/material';
import clsx from 'clsx';
import moment from 'moment';
import { useState } from 'react';


interface IProps {
  id: string;
  task: any;
  onDeleteTask: (values: any) => void;
};

const TaskSection = ({ id, task, onDeleteTask }: IProps) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickButtonMore = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (

    <div className='relative group'>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='p-2 bg-white rounded-md'>
        <span className='block text-base font-medium tracking-wide'>{task.title}</span>
        <span className='block text-sm'>{task.description}</span>
        <div className='mt-1 flex items-center justify-between'>
          <span className='flex items-center gap-x-1 text-sm'>
            Deadline:
            <span className={clsx({ 'text-red-500': isDeadlineDate(task.dueDate) })}>
              {moment(task.dueDate).format('YYYY-MM-DD')}
            </span>
          </span>
          <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt='avt-user' className='w-7 h-7 rounded-[50%] object-contain' />
        </div>
      </div>
      <div className='z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute top-1 right-1'>
        <button aria-describedby={Boolean(anchorEl) ? id : undefined} type="button" className='cursor-pointer' onClick={handleClickButtonMore}>
          <MoreVertIcon fontSize='medium' />
        </button>
      </div>

      <Popper id={Boolean(anchorEl) ? id : undefined} open={Boolean(anchorEl)} anchorEl={anchorEl}>
        <Box sx={{ border: 0.2, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', gapY: '2px' }}>
          <button className='hover:bg-[#ccc]/40 transition-all px-2 py-1' onClick={() => onDeleteTask({ taskId: id })}>Delete</button>
        </Box>
      </Popper>
    </div>

  )
}

export default TaskSection