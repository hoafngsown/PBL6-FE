
import { getApi, postApi } from '@/api/api';
import { API_PATH } from '@/api/path';
import FormAutoComplete, { IOptionRecord } from '@/components/form/FormAutoComplete';
import { EProjectRole, ROLE_OPTIONS } from '@/constants/project';
import { getTokenAndUserId } from '@/utils';
import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

interface ISearch {
  email: string[];
}

interface IProps {
  projectID: string;
  onClose: () => void;
}

function ModalAddUser(props: IProps) {
  const { userId } = getTokenAndUserId();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [page, setPage] = useState(1);
  const [userOptionList, setUserOptionList] = useState<IOptionRecord[]>([]);
  const [roles, setRoles] = useState<EProjectRole[]>([]);

  const { control, getValues, watch, setValue } = useForm<ISearch>({ defaultValues: { email: [] } });

  const getAllUsers = async () => {
    const response = await getApi(API_PATH.USER.GET_ALL, {
      limit: 10,
      page: page,
      search: watch('email'),
      searchBy: 'email'
    });
    return response.data.metadata;
  }

  const { data: listUser } = useQuery({
    queryKey: ['GET_LIST_USER', page],
    queryFn: () => getAllUsers(),
    enabled: page !== - 1,
    onSuccess: (res) => {
      if (res.length === 0) return setPage(-1);
      setUserOptionList((prev) => ([...prev, ...res.map(x => ({ value: x.id, label: x.email }))]))
    }
  })

  const handleAddUserToProject = async () => {
    try {

      const listUserMapping = listUser.filter((x) => getValues('email').includes(x.email));

      const params = listUserMapping.map((z, index) => {
        const x = {
          projectId: props.projectID,
          userId: z.id,
          role: roles[index]
        }

        postApi(API_PATH.PROJECT.INVITATION, x, {});
      });

      await Promise.all(params);

      props.onClose();
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  }

  const handleChangeRole = (index: number, event: SelectChangeEvent) => {
    const newRoles = [...roles];
    newRoles[index] = event.target.value as EProjectRole;
    setRoles(newRoles);
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

      <div className='custom-input mb-6 mt-10 flex flex-col gap-y-2'>
        {watch('email') && watch('email').map(((email: string, index: number) =>
          <div key={index} className='flex items-center justify-between'>
            <span className='inline-block'>{email}</span>
            <div className='w-[120px]'>
              <Select
                id="demo-simple-select"
                value={roles[index]}
                label="Role"
                onChange={(event: SelectChangeEvent) => handleChangeRole(index, event)}
                fullWidth
              >
                {ROLE_OPTIONS.map((item) => <MenuItem value={item.value}>{item.label}</MenuItem>)}
              </Select>
            </div>
          </div>
        ))}
      </div>

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
