import { getTokenAndUserId } from '@/utils';
import clsx from 'clsx';
import { Suspense, lazy, useState } from 'react';
import { useParams } from 'react-router-dom';

interface IProps {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLDivElement>;
};

export interface IInitChatDetailParams {
  projectId: string;
  senderId: string;
  receiverId: string;
  isGroup?: boolean;
  roomName: string;
}

enum ChatFrame {
  ListUser = 'list-user',
  ChatDetail = 'chat-detail',
};

const UserChatListComponent = lazy(() => import('./UserChatList/UserChatList'));
const ChatDetailContainerComponent = lazy(() => import('./ChatDetailContainer'));

function ChatContainer(props: IProps) {

  const { id: projectId } = useParams();
  const { userId } = getTokenAndUserId();

  const [chatFrame, setChatFrame] = useState(ChatFrame.ListUser);
  const [initChatDetailParams, setInitChatDetailParams] = useState<IInitChatDetailParams | null>(null)

  const onGoToChatDetail = (roomName: string, id?: string) => {
    setChatFrame(ChatFrame.ChatDetail);
    setInitChatDetailParams({
      projectId: projectId as string,
      senderId: userId as string,
      receiverId: id || null,
      isGroup: id ? false : true,
      roomName: roomName
    });
  };

  const onGoBackToListUser = () => {
    setChatFrame(ChatFrame.ListUser);
    setInitChatDetailParams(null);
  }

  return (
    <div
      onClick={props.onClose}
      className={clsx(
        "fixed top-0 right-0 bottom-0 left-0 w-screen transition-all duration-300 z-0",
        {
          "translate-x-full": !props.isOpen,
          "translate-x-0 bg-gray-100/70": props.isOpen,
        }
      )}>
      <div className='w-[450px] pt-[75px] h-full max-h-screen overflow-y-scroll ml-auto z-20 bg-[#fff] rounded-[5px] py-[1rem] shadow-[0px_0px_30px_rgba(0,0,0,0.05)]'>
        <Suspense fallback={<div>Loading...</div>}>
          {
            chatFrame === ChatFrame.ListUser &&
            <UserChatListComponent onGoToChatDetail={onGoToChatDetail} />
          }
          {
            chatFrame === ChatFrame.ChatDetail &&
            <ChatDetailContainerComponent
              onBack={onGoBackToListUser}
              defaultValues={initChatDetailParams}
            />
          }
        </Suspense>
      </div>
    </div>
  )
}

export default ChatContainer