import { COLORS } from "@/constants";
import { Button } from "@mui/material";

const Admin = () => {
  const handleUpload = (e) => {
    const files = e.target.files;
    const formData = new FormData();

    console.log({ files });
    //        formData.append("file", this.state.selectedFile);
    //
    //        // Make an API request to the server to handle the file upload
    //        fetch("/upload", {
    //          method: "POST",
    //          body: formData,
    //        })
    //          .then((response) => response.json())
    //          .then((data) => {
    //            // Handle the response from the server
    //            console.log("Server response:", data);
    //          })
    //          .catch((error) => {
    //            console.error("Error:", error);
    //          });
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
