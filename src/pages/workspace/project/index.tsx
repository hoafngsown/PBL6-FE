import { postApi } from '@/api/api';
import { API_PATH } from '@/api/path';
import MyDialog from '@/components/common/Dialog';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  defaultDropAnimation,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import { Backdrop, CircularProgress } from '@mui/material';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { FormChat } from './components/ChatBox/FormChat';
import { ListMessages } from './components/ChatBox/ListMessages';
import ColumnSection from './components/ColumnSection';
import ModalAddColumn from './components/ModalAddColumn';
import TaskItem from './components/TaskItem';

export interface IBoard {
  id: string;
  title: string;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  content: string;
  cardId: string;
}

const dropAnimation: DropAnimation = { ...defaultDropAnimation };


function Project() {
  const { id } = useParams();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const ref = useRef(null);

  const [project, setProject] = useState<any>();
  const [draggingItem, setDraggingItem] = useState<ITask>();
  const [isSlideFormChat, setIsSlideFormChat] = useState<boolean>(false);
  const [isOpenModalAddColumn, setIsOpenModalAddColumn] = useState(false);

  const [taskParams, setTaskParams] = useState<any>();

  const getProjectDetail = async () => {
    const response = await postApi(API_PATH.PROJECT.DETAIL, { projectID: id }, {});
    return response.data.metadata;
  }

  const { refetch: refetchProject, isLoading: isLoadingProject } = useQuery({
    queryKey: ['get_project_detail', id],
    queryFn: getProjectDetail,
    onSuccess: (data) => {
      setProject(data)
    }
  })

  const handleDragStart = ({ active }: DragStartEvent) => {
    let currentTask;

    active.data.current.sortable.items.forEach((x) => {
      if (currentTask) return;
      currentTask = (x.taskID === active.id) ? x : undefined;
    });

    setDraggingItem(currentTask);
  };


  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (ref.current) clearTimeout(ref.current);

    const activeSortable = active.data.current.sortable;
    const overSortable = over.data.current.sortable;
    const currentActiveTaskIndex = activeSortable.items.findIndex(x => x.taskID === active.id);
    const currentOverTaskIndex = overSortable.items.findIndex(x => x.taskID === over.id);
    const activeContainerId = activeSortable.containerId;
    const overContainerId = overSortable.containerId;
    const activeContainerIndex = project.columns.findIndex(x => x.columnID === activeContainerId);
    const overContainerIndex = project.columns.findIndex(x => x.columnID === overContainerId);

    const paramsApi = {
      sourceColumnID: activeSortable.containerId,
      targetColumnID: overSortable.containerId,
      newIndex: currentOverTaskIndex,
      oldIndex: currentActiveTaskIndex,
      taskID: active.id,
    };

    setTaskParams(paramsApi);

    ref.current = setTimeout(() => {
      const newProject = JSON.parse(JSON.stringify(project));

      if (!activeContainerId || !overContainerId) return;

      if (activeContainerId === overContainerId) {
        const newTasks = arrayMove(newProject.columns[activeContainerIndex].tasks, currentActiveTaskIndex, currentOverTaskIndex);

        newProject.columns[activeContainerIndex].tasks = newTasks;
        setProject(newProject);
      } else {
        const copyActiveTasks = JSON.parse(JSON.stringify(newProject.columns[activeContainerIndex].tasks));
        const copyOverTasks = JSON.parse(JSON.stringify(newProject.columns[overContainerIndex].tasks));

        const newActiveTasks = [
          ...copyActiveTasks.slice(0, currentActiveTaskIndex),
          ...copyActiveTasks.slice(currentActiveTaskIndex + 1),
        ];

        const newOverTasks = [
          ...copyOverTasks.slice(0, currentOverTaskIndex),
          newProject.columns[activeContainerIndex].tasks[currentActiveTaskIndex],
          ...copyOverTasks.slice(currentOverTaskIndex),
        ];

        newProject.columns[activeContainerIndex].tasks = newActiveTasks;
        newProject.columns[overContainerIndex].tasks = newOverTasks;
        setProject(newProject);
      };
    }, 500);
  };

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!taskParams) return;

    await postApi(API_PATH.PROJECT.TASK.CHANGE_INDEX, taskParams, {});
    setDraggingItem(null)
  };

  const handleCloseBoxChat = (e) => {
    if (e.target === e.currentTarget) return setIsSlideFormChat(false);
  };

  const onAddTask = () => {
    refetchProject();
  }

  const onAddColumn = () => {
    setIsOpenModalAddColumn(false)
    refetchProject();
  }

  if (!project) return <></>;

  return (
    <div className='w-screen h-screen overflow-hidden p-4 relative'>
      <div className='grid grid-cols-3 my-8'>
        <button
          onClick={() => setIsOpenModalAddColumn(true)}
          className='px-2 py-1 w-[130px] flex items-center justify-center gap-x-2 border border-white rounded-lg
        bg-gradient-to-r from-purple-400 to-pink-300'>
          <AddIcon fontSize='small' htmlColor='#fff' />
          <span className='text-white font-medium text-sm'>Add Column</span>
        </button>
        <p className='text-2xl font-bold uppercase'>{project.title}</p>
        <button
          onClick={() => setIsSlideFormChat(true)}
          className='px-2 py-1 w-[130px] flex items-center justify-center gap-x-2 border border-white rounded-lg
        bg-gradient-to-r from-purple-400 to-pink-300'>
          <span className='text-white font-medium text-sm'>Open Chat</span>
          <ChatIcon className='font-sm text-white' />
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className='grid grid-cols-4 gap-x-6'>
          {
            project.columns && project.columns.length && project.columns.map((col) => {
              return <ColumnSection onAddTask={onAddTask} col={col} key={col.columnID} />
            })
          }
          <DragOverlay dropAnimation={dropAnimation}>
            {draggingItem ? <div className='shadow-md animate-bounce'>
              <TaskItem task={draggingItem} />
            </div> : null}
          </DragOverlay>
        </div>
      </DndContext>

      <img
        src="https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2655.jpg"
        alt='bg-gardient'
        className='absolute top-0 left-0 right-0 bottom-0 object-cover w-full h-full -z-10'
      />

      <div
        onClick={handleCloseBoxChat}
        className={clsx(
          "fixed top-0 right-0 bottom-0 left-0 w-screen transition-all duration-300 z-0",
          {
            "translate-x-full": !isSlideFormChat,
            "translate-x-0 bg-gray-100/70": isSlideFormChat,
          }
        )}>
        <div className='w-[450px] pt-[75px] h-full ml-auto z-20 bg-[#fff] rounded-[5px] py-[1rem] shadow-[0px_0px_30px_rgba(0,0,0,0.05)]"
        '>
          <ListMessages />
          <div>
            <FormChat />
          </div>
        </div>
      </div>


      <MyDialog
        open={isOpenModalAddColumn}
        title='Add Column'
        isShowAction={false}
        onClose={() => setIsOpenModalAddColumn(false)}
        doAction={() => { }}
      >
        <ModalAddColumn
          projectID={id}
          columnLength={project.columns?.length || 0}
          onAddColumn={onAddColumn}
        />
      </MyDialog>



      {
        isLoadingProject && (<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>)
      }
    </div>
  )
}

export default Project