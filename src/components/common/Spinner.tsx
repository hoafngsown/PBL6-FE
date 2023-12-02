import { CircularProgress } from "@mui/material";

export default function Spinner() {
  return (
    <div className="fixed block w-full h-full top-0 left-0 opacity-70 z-[99] bg-[#fff]">
      <CircularProgress className="h-[2.5rem] w-[2.5rem] absolute top-[48%] left-[49%] z-[100]" />
    </div>
  );
}
