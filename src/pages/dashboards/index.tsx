import IconDelete from "@/assets/images/ic-garbage.svg";
import { User } from "@/types/admin";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { deleteApi, getApi } from "@/api/api";
import { API_PATH } from "@/api/path";
import { SUCCESS } from "@/constants/messages";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

const columns = [
  "Name",
  "Email",
  "Phone Number",
  "Profile Image",
  "Role",
  "Action",
];

const Dashboards = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(true);
  const [idDelete, setIdDelete] = useState<string>("");

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const getListUser = async () => {
    try {
      const { data } = await getApi(`${API_PATH.USER}/users`, {});
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { data, refetch: refetchListUser } = useQuery({
    queryKey: ["get_list_user"],
    queryFn: async () => await getListUser(),
    keepPreviousData: true,
    onError(error: any) {
      console.log({ error });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteApi(`${API_PATH.USER}/admin/${idDelete}`, {}),
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
      <div className="flex items-center justify-between">
        <span className="font-medium text-base leading-5">
          Quản lí tài nguyên
        </span>
      </div>
      {/* TABLE CONTAINER */}
      <div className="bg-white mt-6 p-6 rounded-[5px]">
        <div className="mt-6">
          <div className="tableContainer">
            <TableContainer component={Paper}>
              <Table
                sx={{ width: "100%", height: "100%" }}
                aria-label="customized table"
              >
                <TableHead className="tableHeader">
                  <TableRow>
                    {columns.map((col: string, index: number) => (
                      <TableCell
                        key={index}
                        align={index === columns.length - 1 ? "right" : "left"}
                      >
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody className="tableBody">
                  {data &&
                    data?.data &&
                    data?.data.length > 0 &&
                    (data.data as User[]).map((row: User, index: number) => (
                      <TableRow key={index} sx={{ m: 0, p: 0 }}>
                        <TableCell
                          className="w-[300px]"
                          component="th"
                          scope="row"
                          align="left"
                        >
                          {row?.firstName + row?.lastName}
                        </TableCell>
                        <TableCell align="left">{row?.email}</TableCell>
                        <TableCell align="left" className="w-[300px]">
                          {row?.phoneNumber}
                        </TableCell>
                        <TableCell className="w-[205px]" align="left">
                          <div className="flex items-center justify-between ">
                            <img
                              className="w-20 h-20"
                              src={row?.profileImageUrl}
                              alt="profile-img"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="w-[205px]" align="left">
                          <div className="flex items-center justify-between ">
                            <span>{row?.role}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="w-[80px] ">
                          <button
                            onClick={() => {
                              handleOpenDialog();
                              setIdDelete(row.accountId);
                            }}
                          >
                            <img src={IconDelete} alt="ic-edit" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>

      {/* {isLoading || isFetching ? <Spinner /> : ""} */}
      {/* <DialogDelete
        open={isOpenDialog}
        onClose={handleCloseDialog}
        doAction={onConfirmDelete}
      /> */}
    </>
  );
};

export default Dashboards;
