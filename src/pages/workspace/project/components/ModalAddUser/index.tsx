
import { getApi, postApi } from '@/api/api';
import { API_PATH } from '@/api/path';
import FormAutoComplete from '@/components/form/FormAutoComplete';
import { ISelectOption } from '@/components/form/FormAutoCompleteSearch';
import { getTokenAndUserId } from '@/utils';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ISearch {
  email: string;
}

interface IProps {
  projectID: string;
}

function ModalAddUser(props: IProps) {
  const { userId } = getTokenAndUserId();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [page, setPage] = useState(1);

  const [userOptionList, setUserOptionList] = useState<ISelectOption[]>([]);

  const { control, getValues } = useForm<ISearch>({ defaultValues: { email: '' } });

  useEffect(() => {
    if (page === -1) return;
    getAllUsers();
  }, [page]);

  const getAllUsers = async () => {
    try {
      const params = { email: getValues('email'), page: page, itemsPerPage: 10, outSideProject: true, projectID: props.projectID }
      const response = await getApi(API_PATH.USER.GET_ALL, params);

      const data = response.data.metadata.data;
      const options = data.map((x) => ({ value: x.userID, label: x.email }))

      if (data.length === 0) return setPage(-1);

      setUserOptionList(prev => [...prev, ...options]);
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  const handleAddUserToProject = async () => {
    try {
      const userReceiveIds = userOptionList.filter(x => getValues('email').includes(x.label)).map(x => x.value);
      const params = {
        userReceiveIds,
        userSendId: userId,
        projectID: props.projectID,
        message
      };

      await postApi(API_PATH.INVITATION.INDEX, params, {});
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  }

  return (
    <div className='min-w-[450px]'>
      <FormAutoComplete
        multiple
        freeSolo={false}
        shouldLoadMore={page >= 1}
        setPage={setPage}
        inputStyle={{ padding: '0' }}
        options={userOptionList}
        placeholder="Search user in system you want to add to your project..."
        control={control}
        name="email"
      />

      <div className='mt-6'>
        <textarea
          value={message}
          className='border border-gray-500 rounded-md w-full p-2'
          rows={5}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className='mt-8 flex items-center justify-center'>
        <Button
          variant='contained'
          size='large'
          className='w-full custom-button'
          type='button'
          onClick={handleAddUserToProject}
          disabled={isLoading}
        >
          Add
        </Button>
      </div>
    </div>
  )
}

export default ModalAddUser;
