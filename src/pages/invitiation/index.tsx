import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


const columns = [
  "Invited User",
  "Date",
  "Status",
  "Action",
];

const Invitiation = () => {

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between'>
        <span className='font-medium text-base leading-5'>
          Quản Lí Lời Mời
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
                {/* <TableBody className='tableBody'>
                  {data &&
                    data.length > 0 &&
                    data.map((row, index: number) => (
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
                          {row?.errorContent}
                        </TableCell>
                        <TableCell align='left'>
                          {row?.editedContent}
                        </TableCell>
                        <TableCell
                          align='left'
                          className='w-[300px]'
                        >
                          {row?.createdDate}
                        </TableCell>
                        <TableCell
                          className='w-[205px]'
                          align='left'
                        >
                          {row?.modifiedDate}
                        </TableCell>
                        <TableCell
                          className='w-[205px]'
                          align='left'
                        >
                          {row?.documentName}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody> */}
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invitiation;
