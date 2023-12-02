import { getTokenAndUserId } from '@/utils';
import socketMessage from '@/utils/socketMessages';
import { useCallback, useState } from "react";
import { useParams } from 'react-router-dom';


export interface IMessage {
  userID: string;
  projectID: string;
  message: string;
}

export const FormChat = () => {
  const { userId } = getTokenAndUserId();
  const { id: projectID } = useParams();


  const [message, setMessage] = useState<string>("");

  const sendMessages = (e) => {
    e.preventDefault();

    if (!message) return false;

    const contentMessage: IMessage = {
      userID: userId,
      projectID,
      message,
    };

    socketMessage?.emit("send-message", contentMessage);
    setMessage("");
  };

  const onChange = useCallback((e) => setMessage(e.target.value), []);

  return (
    <form className="flex  items-center px-4" onSubmit={sendMessages}>
      <input
        type="text"
        value={message}
        placeholder="Typing..."
        className="w-full h-[2.5rem] pl-4 rounded-[3rem] border border-solid  focus:outline-none"
        onChange={onChange}
      // onFocus={updateLastSeen}
      />
      <button type="submit">
        <img
          className="ml-[0.625rem]"
          src="/images/icons/send-messages.svg"
          alt="icon-send-message"
        />
      </button>
    </form>
  );
};
