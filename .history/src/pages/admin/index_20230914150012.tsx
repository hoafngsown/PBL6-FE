import { COLORS } from "@/constants";
import { Button } from "@mui/material";

const Admin = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="font-medium text-base leading-5">Yêu Cầu</span>
      </div>
      {/* TABLE CONTAINER */}
      <div className="bg-white mt-6 p-6 rounded-[5px]">
        <div className="mt-6">
          <div className="tableContainer">
            <textarea
              className="border border-gray-500 rounded-md w-full"
              rows={5}
            />

            <Button
              sx={{
                padding: "10px 16px 10px 16px",
                backgroundColor: COLORS.secondaryButton,
                color: COLORS.primary,
                marginTop: "40px",
              }}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
