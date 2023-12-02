import { postApiMultipart } from "@/api/api";
import { COLORS } from "@/constants";
import { Button } from "@mui/material";

const Admin = () => {
  const handleUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("file", file);
    const response = await postApiMultipart(
      "/api/process/upload",
      formData
    );
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <span className='font-medium text-base leading-5'>
          Yêu Cầu
        </span>
      </div>
      {/* TABLE CONTAINER */}
      <div className='bg-white mt-6 p-6 rounded-[5px]'>
        <div className='mt-6'>
          <div className='tableContainer'>
            <textarea
              className='border border-gray-500 rounded-md w-full'
              rows={5}
            />

            <input type='file' onChange={handleUpload} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
