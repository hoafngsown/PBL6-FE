import { postApiMultipart } from "@/api/api";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useState } from "react";

const Admin = () => {
  const [text, setText] = useState("");
  const [analizeText, setAnalizeText] = useState("");
  const [isAnalysis, setIsAnalysis] = useState(false);
  const [file, setFile] = useState<File>();

  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setFile(file)
  };

  const handleAnalysis = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("file", file);
      const response = await postApiMultipart(`/v1/api/spellcorrection`, formData);

      setText(response.data.metadata.original_text);
      setAnalizeText(response.data.metadata.predict_text);
      setIsAnalysis(true);
    } catch (error) {
      console.log({ error });
    }
    finally {
      setIsLoading(false);
    }
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
                disabled={isLoading}
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

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Admin;
