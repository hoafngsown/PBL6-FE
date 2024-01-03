import { deleteApi, getApi, putApi } from "@/api/api";
import { API_PATH } from "@/api/path";
import MyDialog from "@/components/common/Dialog";
import { EProjectRole } from '@/constants/project';
import { IRole } from '@/types/project';
import { getTokenAndUserId } from '@/utils';
import { r } from "@/utils/routes";
import { NotifyTypeEnum, notify } from "@/utils/toast";
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
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";
import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ChatContainer from "./components/ChatBox/ChatContainer";
import ColumnSection from "./components/ColumnSection";
import ModalAddColumn from "./components/ModalAddColumn";
import ModalAddUser from './components/ModalAddUser';
import TaskItem from "./components/TaskItem";

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
  const { userId } = getTokenAndUserId();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [project, setProject] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [draggingItem, setDraggingItem] = useState<ITask>();

  const [isSlideFormChat, setIsSlideFormChat] = useState<boolean>(false);
  const [isOpenModalAddColumn, setIsOpenModalAddColumn] = useState(false);
  const [isOpenModalAddUser, setIsOpenModalAddUser] = useState(false);

  const [assigneList, setAssigneList] = useState<IRole[]>([]);

  const [, setIsReRender] = useState(false);

  const [taskParams, setTaskParams] = useState<any>();

  const getProjectDetail = async () => {
    const response = await getApi(r(API_PATH.PROJECT.DETAIL, { id: id }), {});
    return response.data.metadata;
  };

  const getColumnList = async () => {
    const response = await getApi(r(API_PATH.PROJECT.COLUMN.INDEX, { projectId: id }), {});
    return response.data.metadata;
  };

  const getPermission = async () => {
    const response = await getApi(r(API_PATH.PROJECT.PERMISSION, { id }), {});
    return response.data.metadata;
  };

  const { refetch: refetchProject, isLoading: isLoadingProject } = useQuery({
    queryKey: ["get_project_detail", id],
    queryFn: getProjectDetail,
    onSuccess: (data) => {
      setProject(data);
      setAssigneList(data.roles.filter(x => x.id !== userId))
    },
  });

  const { refetch: refetchColumn } = useQuery({
    queryKey: ["get_column_list", id],
    queryFn: getColumnList,
    onSuccess: (data) => setColumns(data)
  });

  const { data: permission } = useQuery({
    queryKey: ["get_permission", id],
    queryFn: getPermission,
  });

  const mutateDeleteTask = useMutation({
    mutationFn: ({ taskId, columnId }: any) => {
      return deleteApi(r(API_PATH.PROJECT.TASK.DELETE, { projectId: id, columnId, taskId }), "");
    },
    onSuccess: () => {
      notify("Delete Task Success !", NotifyTypeEnum.SUCCESS);
      refetchColumn();
    },
    onError: (err: any) => {
      notify(err.response.data.message, NotifyTypeEnum.ERROR);
    },
  });

  const handleDragStart = ({ active }: DragStartEvent) => {
    const taskId = active.id;
    const columnId = active.data.current.sortable.containerId;

    const column = columns.find(x => x.id === columnId);
    const task = column?.tasks.find(x => x.id === taskId);

    setDraggingItem(task);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const activeSortable = active?.data?.current?.sortable;
    const overSortable = over?.data?.current?.sortable;

    if (!activeSortable || !overSortable) return;

    const currentActiveTaskIndex = activeSortable.index;
    const currentOverTaskIndex = overSortable.index
    const activeContainerId = activeSortable.containerId;
    const overContainerId = overSortable.containerId;

    const activeContainerIndex = columns.findIndex((x) => x.id === activeContainerId);
    const overContainerIndex = columns.findIndex((x) => x.id === overContainerId);

    if (!activeContainerId || !overContainerId) return;

    const copyColumns = JSON.parse(JSON.stringify(columns));

    if (activeContainerId === overContainerId) {
      const newTasks = arrayMove(
        copyColumns[activeContainerIndex].tasks,
        currentActiveTaskIndex,
        currentOverTaskIndex
      );

      copyColumns[activeContainerIndex].tasks = newTasks;
      setColumns(copyColumns);
    } else {
      const copyActiveTasks = JSON.parse(JSON.stringify(copyColumns[activeContainerIndex].tasks));
      const copyOverTasks = JSON.parse(JSON.stringify(copyColumns[overContainerIndex].tasks));

      const newActiveTasks = [
        ...copyActiveTasks.slice(0, currentActiveTaskIndex),
        ...copyActiveTasks.slice(currentActiveTaskIndex + 1),
      ];

      const newOverTasks = [
        ...copyOverTasks.slice(0, currentOverTaskIndex),
        copyColumns[activeContainerIndex].tasks[
        currentActiveTaskIndex
        ],
        ...copyOverTasks.slice(currentOverTaskIndex),
      ];

      copyColumns[activeContainerIndex].tasks = newActiveTasks;
      copyColumns[overContainerIndex].tasks = newOverTasks;
      setColumns(copyColumns);
    };

    const paramsApi = {
      sourceColumnId: activeContainerId,
      targetColumnId: overContainerId,
      index: currentOverTaskIndex,
      taskId: active.id,
    };

    setTaskParams(paramsApi);
  }

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {

    if (!taskParams) return;
    await putApi(r(API_PATH.PROJECT.TASK.UPDATE, { projectId: id, taskId: taskParams.taskId }), taskParams);
    setDraggingItem(null);
  };

  const handleCloseBoxChat = (e) => {
    if (e.target === e.currentTarget) return setIsSlideFormChat(false);
  };

  const onAddTask = () => {
    refetchColumn();
  };

  const onAddColumn = () => {
    setIsOpenModalAddColumn(false);
    refetchColumn();
  };

  const onDeleteTask = async (values) => {
    await mutateDeleteTask.mutate(values);
    setIsReRender((x) => !x);
  };

  const role = project?.role?.role as EProjectRole;

  if (!project) return <></>;

  return (
    <div className="w-screen h-screen overflow-x-scroll p-4 relative">
      <div className="grid grid-cols-3 my-8">
        <div className="flex items-center gap-x-8">
          <>
            {((role === EProjectRole.ADMIN) || (role === EProjectRole.OWNER)) && <button
              onClick={() => setIsOpenModalAddColumn(true)}
              className="px-2 py-1 w-[130px] h-10 flex items-center justify-center gap-x-2 border border-white rounded-lg
        bg-gradient-to-r from-purple-400 to-pink-300"
            >
              <AddIcon fontSize="small" htmlColor="#fff" />
              <span className="text-white font-medium text-sm">Add Column</span>
            </button>}
            {
              ((role !== EProjectRole.GUEST) && <button
                onClick={() => setIsSlideFormChat(true)}
                className="px-2 py-1 w-[130px] h-10 flex items-center justify-center gap-x-2 border border-white rounded-lg
        bg-gradient-to-r from-purple-400 to-pink-300"
              >
                <span className="text-white font-medium text-sm">Open Chat</span>
                <ChatIcon className="font-sm text-white" />
              </button>)
            }

            {((role === EProjectRole.ADMIN) || (role === EProjectRole.OWNER)) && <button
              onClick={() => setIsOpenModalAddUser(true)}
              className="px-2 py-1 w-[130px] h-10 flex items-center justify-center gap-x-2 border border-white rounded-lg
        bg-gradient-to-r from-purple-400 to-pink-300"
            >
              <span className="text-white font-medium text-sm">Add User</span>
              <ChatIcon className="font-sm text-white" />
            </button>}
          </>
        </div>
        <p className="text-2xl font-bold uppercase">{project.title}</p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="flex gap-x-6">
          {columns && columns.length && columns.map((col) => {
            return (
              <ColumnSection
                onAddTask={onAddTask}
                onDeleteTask={onDeleteTask}
                col={col}
                key={col.id}
                refetch={refetchColumn}
                assigneList={assigneList}
                role={role}
              />
            );
          })}
          <DragOverlay dropAnimation={dropAnimation}>
            {draggingItem ? (
              <div className="shadow-md">
                <TaskItem task={draggingItem} />
              </div>
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>

      <img
        src="https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2655.jpg"
        alt="bg-gardient"
        className="absolute top-0 left-0 right-0 bottom-0 object-cover w-full h-full -z-10"
      />

      <ChatContainer onClose={handleCloseBoxChat} isOpen={isSlideFormChat} />

      <MyDialog
        open={isOpenModalAddColumn}
        title="Add Column"
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


      {isOpenModalAddUser && <MyDialog
        open={isOpenModalAddUser}
        title="Add Users"
        isShowAction={false}
        onClose={() => setIsOpenModalAddUser(false)}
        doAction={() => { }}
      >
        <ModalAddUser projectID={id} />
      </MyDialog>}


      {isLoadingProject && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default Project;
