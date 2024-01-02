import { getApi, putApi } from '@/api/api';
import { API_PATH } from '@/api/path';
import { NotifyTypeEnum, notify } from '@/utils/toast';
import { Button, Pagination, TableBody } from '@mui/material';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';


const columns = [
  "Project",
  "Invited Role",
  "Status",
  "Action",
];

const Invitiation = () => {

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(10);

  const getInvitiation = async () => {
    const response = await getApi(API_PATH.PROJECT.INVITATION, {
      limit: 10,
      page: page,
    });
    return response.data.metadata;
  }

  const { data } = useQuery({
    queryKey: ['get_list_intiviation', page],
    queryFn: getInvitiation,
    onSuccess(data) {
      console.log({ data })
    },
    onError(err) {
      console.log({ err })
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: (params: any) => putApi(API_PATH.PROJECT.INVITATION, params),
    onSuccess: () => {
      notify('Change Status Success', NotifyTypeEnum.SUCCESS);
    },
    onError: (err: any) => {
      notify(err.response.data.message, NotifyTypeEnum.ERROR)
    }
  });

  const handleChangeStatus = (status: boolean, intivationId: string) => {
    const params = {
      invitationId: intivationId,
      isAccept: status
    }

    updateStatusMutation.mutate(params)
  }

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between'>
        <span className='font-medium text-base leading-5'>
          Quản Lí Lời Mời
        </span>
      </div>

      <div className='bg-white mt-6 p-6 rounded-[5px]'>
        <div className='mt-6'>
          <div className='tableContainer'>
            <TableContainer component={Paper}>
              <Table
                sx={{ width: "100%", height: "100%" }}
                aria-label='customized table'
              >
                <TableHead className='tableHeader'>
                  <TableRow>
                    {columns.map(
                      (col: string, index: number) => (
                        <TableCell
                          key={index}
                          align={
                            index === columns.length - 1
                              ? "right"
                              : "left"
                          }
                        >
                          {col}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody className='tableBody'>
                  {data &&
                    data.length > 0 &&
                    data.map((row, index: number) => (
                      <TableRow
                        key={index}
                        sx={{ m: 0, p: 0 }}
                      >
                        <TableCell align='left'>
                          {row.project.title}
                        </TableCell>
                        <TableCell
                          align='left'
                          className='w-[300px]'
                        >
                          {row.roleInvited}
                        </TableCell>
                        <TableCell
                          className='w-[205px]'
                          align='left'
                        >
                          {row.status}
                        </TableCell>
                        <TableCell
                          className='w-[205px]'
                          align='right'

                        >
                          <div className='flex items-center justify-end gap-x-4'>
                            <Button
                              size='small'
                              variant='outlined'
                              onClick={() => handleChangeStatus(false, row.id)}
                            >
                              Reject
                            </Button>
                            <Button
                              size='small'
                              variant='contained'
                              onClick={() => handleChangeStatus(true, row.id)}
                            >
                              Accept
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>


      <div className='mt-10 flex items-center justify-center'>
        <Pagination count={totalPages} page={page} onChange={(_, p: number) => setPage(p)} />
      </div>
    </div>
  );
};

export default Invitiation;
