import { postApiMultipart } from "@/api/api";
import { COLORS } from "@/constants";
import { Button } from "@mui/material";
import { useState } from "react";

const Admin = () => {
  const [text, setText] = useState("");
  const [analizeText, setAnalizeText] = useState("");
  const [isAnalysis, setIsAnalysis] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("file", file);
    const response = await postApiMultipart(
      "/api/process/upload",
      formData
    );

    setText(response.data);

    console.log({ response });
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
              disabled
              value={text}
              className='border border-gray-500 rounded-md w-full'
              rows={5}
            />

            <input type='file' onChange={handleUpload} />
          </div>
          <Button>Phân tích</Button>
        </div>
      </div>
    </>
  );
};

export default Admin;
