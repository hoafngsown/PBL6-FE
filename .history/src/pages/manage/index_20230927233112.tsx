import IconDelete from "@/assets/images/ic-garbage.svg";
import { ILocation } from "@/types/admin";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { deleteApi, getApi } from "@/api/api";
import { API_PATH } from "@/api/path";
import DialogDelete from "@/components/common/DialogDelete";
import { LocationTypo } from "@/components/common/LocationTypo";
import { SUCCESS } from "@/constants/messages";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import PopupDetailLocation from "./components/PopupDetailLocation";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/constants";

const columns = [
  "Name",
  "",
  "Address",
  "Rating",
  "Review Count",
  "Action",
];

errorContent;
editedContent;
createdDate;
modifiedDate;
documentName;

cho hien thi 5 truong nay thoi a


const Locations = () => {
  const [isOpenDialogDetail, setIsOpenDialogDetail] =
    useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");

  const [locationDetail, setLocationDetail] =
    useState<ILocation>();

  const [currentUser, setCurrentUser] = useRecoilState(
    currentUserState
  );

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };
  const handleOpenDialogDetail = () => {
    setIsOpenDialogDetail(true);
  };
  const handleCloseDialogDetail = () => {
    setIsOpenDialogDetail(false);
  };

  const getListErrorList = async () => {
    try {
      const { data } = await getApi(
        `/api/document/${currentUser.id}/error-list`,
        {}
      );
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { data, refetch: refetchListUser } = useQuery({
    queryKey: ["get_list_error"],
    queryFn: async () => await getListErrorList(),
    keepPreviousData: true,
    onError(error: any) {
      console.log({ error });
    },
  });

  console.log({ data });

  const deleteMutation = useMutation({
    mutationFn: () =>
      deleteApi(`${API_PATH.LOCATION}/${idDelete}`, {}),
    onSuccess: () => {
      toast.success(SUCCESS.DELETE_USER_SUCCESS, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleCloseDialog();
      refetchListUser();
    },
    onError(error: any) {
      console.log({ error });
    },
  });

  const onConfirmDelete = () => {
    if (!idDelete) return;
    deleteMutation.mutate();
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <span className='font-medium text-base leading-5'>
          Quản Lí Kết Quả
        </span>
      </div>
      {/* TABLE CONTAINER */}
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
                    data?.data &&
                    data?.data.length > 0 &&
                    (data.data as ILocation[]).map(
                      (row: ILocation, index: number) => (
                        <TableRow
                          key={index}
                          sx={{ m: 0, p: 0 }}
                        >
                          <TableCell
                            className='w-[300px] underline cursor-pointer'
                            component='th'
                            scope='row'
                            align='left'
                            onClick={() => {
                              setLocationDetail(row);
                              handleOpenDialogDetail();
                            }}
                          >
                            {row?.name}
                          </TableCell>
                          <TableCell align='left'>
                            {row?.description}
                          </TableCell>
                          <TableCell
                            align='left'
                            className='w-[300px]'
                          >
                            <LocationTypo
                              country={
                                row?.address?.country?.name
                              }
                              province={
                                row?.address?.province?.name
                              }
                              district={
                                row?.address?.district?.name
                              }
                              ward={
                                row?.address?.ward?.name
                              }
                              streetAddress={
                                row?.address?.streetAddress
                              }
                            />
                          </TableCell>
                          <TableCell
                            className='w-[205px]'
                            align='left'
                          >
                            <div className='flex items-center justify-between '>
                              <span>
                                reviews : {row.reviewCount}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell
                            className='w-[205px]'
                            align='left'
                          >
                            <div className='flex items-center justify-between '>
                              <span>
                                {row?.reviewCount}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell
                            align='right'
                            className='w-[80px] '
                          >
                            <button
                              onClick={() => {
                                handleOpenDialog();
                                setIdDelete(row.id);
                              }}
                            >
                              <img
                                src={IconDelete}
                                alt='ic-edit'
                              />
                            </button>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <DialogDelete
        open={isOpenDialog}
        onClose={handleCloseDialog}
        doAction={onConfirmDelete}
      />
      <PopupDetailLocation
        isOpen={isOpenDialogDetail}
        onClose={handleCloseDialogDetail}
        location={locationDetail as ILocation}
      />
    </>
  );
};

export default Locations;
