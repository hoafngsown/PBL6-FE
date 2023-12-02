import { getApi } from '@/api/api';
import { API_PATH } from '@/api/path';
import { getTokenAndUserId } from '@/utils';
import socketMessage from '@/utils/socketMessages';
import { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { MessageDetail } from './MessageDetail';

export const ListMessages = (props) => {
  const { id } = useParams();

  const { userId } = getTokenAndUserId();
  const [mounted, setMounted] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [messages, setMessages] = useState<any[]>([]);

  const [newMessage, setNewMessage] = useState<any>();

  useQuery({
    queryKey: ["init_fetch", itemsPerPage],
    queryFn: async () => fetchListMessages(),
    keepPreviousData: true,
  });


  useEffect(() => {
    handleNewMessage(newMessage);
  }, [newMessage]);

  const fetchListMessages = async () => {
    const { data } = await getApi(API_PATH.PROJECT.MESSAGES.GET_ALL, {
      page: 1,
      itemsPerPage,
      projectID: id
    });

    const result = data.metadata.data;
    const totalItemsRes = data.metadata.meta.totalItems;

    setTotalItems(totalItemsRes);
    setMessages(result)
  };

  const loadMoreListMessages = () => {
    if (itemsPerPage < totalItems) {
      setTimeout(() => {
        setItemsPerPage(itemsPerPage + 10);
      }, 1500);
    }
  };

  const handleNewMessage = (msg) => {
    if (msg) {
      setMessages([msg, ...messages]);
      if (msg.user.userID !== userId) {
        const audio = new Audio("/audio/messenger_ny.mp3");
        audio.play();
      } else {
        updateScroll(0);
      }
    }
  }

  const updateScroll = (timeOut: number) => {
    const element = document.getElementById("listMessage");
    setTimeout(() => {
      element.scrollTop = element.scrollHeight;
    }, timeOut);
  };

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      joinChatRoom();
      socketMessage?.on("receive-message", (data) => {
        setNewMessage(data);
      });
    }

    return function cleanupListener() {
      if (mounted) {
        socketMessage.off("receive-message");
        const myDiv = document.getElementById("listMessage");
        myDiv?.removeEventListener("scroll", () => "");
      }
    };
  }, []);

  const joinChatRoom = () => {
    socketMessage.emit("join", {
      id: userId,
      projectID: id,
    });
  }

  return (
    <>
      <div
        id="listMessage"
        className="mx-[1rem] h-[calc(100%-80px)] list-message flex flex-col-reverse"
      >
        <InfiniteScroll
          dataLength={itemsPerPage}
          next={loadMoreListMessages}
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            overflowX: "hidden",
          }}
          inverse={true}
          hasMore={itemsPerPage + 10 - totalItems >= 10 ? false : true}
          loader={<h4 className="text-center">Loading...</h4>}
          scrollableTarget="listMessage"
        >
          {messages?.map((message, index) => (
            <div key={message?.date + index}>
              <MessageDetail
                key={message.createdAt + index}
                message={message}
              />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};
