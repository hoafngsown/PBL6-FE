import { postApi, postApiMultipart } from "@/api/api";
import { COLORS } from "@/constants";
import { Button } from "@mui/material";
import { useState } from "react";

const Admin = () => {
  const [id, setId] = useState("");
  const [text, setText] = useState("");
  const [analizeText, setAnalizeText] = useState("");
  const [isAnalysis, setIsAnalysis] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("file", file);
    const response = await postApiMultipart(
      `/api/document/${id}/upload`, // Sử dụng tham số "id" để tạo đường dẫn phù hợp
      formData
    );

    setText(response.data);
  };

  const handleAnalysis = async () => {
    setIsAnalysis(true);
    const response = await postApi(
      "/api/error/ai",
      { text },
      ""
    );

    const correction = response.data.correction;

    let resultText = "";

    correction.forEach((item) => {
      const isCorrect = item[0] === 0;
      if (isCorrect) resultText += item[1];
      else resultText += item[2];
    });

    setAnalizeText(resultText);
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
        <div className='mt-6 '>
          <div className='tableContainer'>
            <textarea
              disabled
              value={text}
              className='border border-gray-500 rounded-md w-full'
              rows={5}
            />

            <div className='flex items-center gap-x-4'>
              <input type='file' onChange={handleUpload} />
              <Button
                variant='contained'
                onClick={handleAnalysis}
              >
                Phân tích
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isAnalysis && (
        <div className='mt-6'>
          <textarea
            disabled
            value={analizeText}
            className='border border-gray-500 rounded-md w-full'
            rows={5}
          />
        </div>
      )}
    </>
  );
};

export default Admin;
