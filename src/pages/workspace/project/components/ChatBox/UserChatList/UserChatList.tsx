import { getApi } from '@/api/api';
import { API_PATH } from '@/api/path';
import { r } from '@/utils/routes';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import UserChatItem from './UserChatItem';

const DEFAULT_ITEM_PER_PAGE = 10;

interface IProps {
  onGoToChatDetail: (id?: string) => void;
}

function UserChatList(props: IProps) {
  const { id } = useParams();
  const [itemsPerPage, setItemsPerPage] = useState<number>(DEFAULT_ITEM_PER_PAGE);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [listUser, setListUser] = useState([]);
  useQuery({
    queryKey: ["init_fetch", itemsPerPage],
    queryFn: async () => getListUser(),
    keepPreviousData: true,
  });

  const onLoadMoreListUser = () => {
    if (itemsPerPage < totalItems) {
      setTimeout(() => setItemsPerPage(itemsPerPage + DEFAULT_ITEM_PER_PAGE), 1500);
    }
  };

  const getListUser = async () => {
    const { data } = await getApi(r(API_PATH.PROJECT.USERS , {id}), {
      page: 1,
      limit: itemsPerPage,
    });

    const result = data.metadata;
    // const totalItemsRes = data.metadata.meta.totalItems;

    const groupChatRecord = {
      user: {
       userName: 'Group Chat',
      },
      isGroup: true
    };

    setListUser([...result, groupChatRecord]);
    setTotalItems(10);
    // setTotalItems(totalItemsRes);
  };

  const handleGoToChatDetail = (user) => {
    if (user.isGroup) return props.onGoToChatDetail();
    return props.onGoToChatDetail(user.user.id);
  }

  return (
    <div className='pt-2'>
      <h3 className='text-center text-xl font-bold mb-4'>Chat</h3>
      <InfiniteScroll
        dataLength={itemsPerPage}
        next={onLoadMoreListUser}
        style={{ display: "flex", flexDirection: "column-reverse", overflowX: "hidden" }}
        inverse={true}
        hasMore={itemsPerPage + DEFAULT_ITEM_PER_PAGE - totalItems >= DEFAULT_ITEM_PER_PAGE ? false : true}
        loader={<h4 className="text-center">Loading...</h4>}
        scrollableTarget="listMessage"
      >
        {listUser.map((user, index) =>
          <div key={index} onClick={() => handleGoToChatDetail(user)}>
            <UserChatItem user={user} />
          </div>
        )}
      </InfiniteScroll>
    </div>
  )
}

export default UserChatList;