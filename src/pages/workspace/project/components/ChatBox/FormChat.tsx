import socketMessage from '@/utils/socketMessages';
import { useCallback, useState } from "react";
import { IInitChatDetailParams } from './ChatContainer';


export interface IMessage {
  userID: string;
  projectID: string;
  message: string;
}

interface IProps {
  defaultValues: IInitChatDetailParams | null;
}

export const FormChat = (props: IProps) => {

  const [message, setMessage] = useState<string>("");

  const sendMessages = (e) => {
    e.preventDefault();

    if (!message) return false;

    const contentMessage = {
      ...props.defaultValues,
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
