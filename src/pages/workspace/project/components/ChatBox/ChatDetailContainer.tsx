import { IInitChatDetailParams } from './ChatContainer';
import { FormChat } from './FormChat';
import { ListMessages } from './ListMessages';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface IProps {
  onBack: () => void;
  defaultValues: IInitChatDetailParams | null;
};

function ChatDetailContainer(props: IProps) {
  console.log({ props })
  return (
    <div className='w-full h-full px-4'>
      <div className='grid grid-cols-3 items-center mt-4'>
        <div>
          <button onClick={props.onBack}><ArrowBackIosIcon /></button>
        </div>
        <h5 className='text-lg font-bold line-clamp-1'>{props.defaultValues.roomName}</h5>
      </div>
      <ListMessages defaultValues={props.defaultValues} />
      <div>
        <FormChat defaultValues={props.defaultValues} />
      </div>
    </div>
  )
}

export default ChatDetailContainer