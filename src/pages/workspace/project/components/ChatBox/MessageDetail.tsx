import { getTokenAndUserId } from "@/utils";
import format from "date-fns/format";

interface IPropsMessageDetail {
  message: any;
}

export const MessageDetail = (props: IPropsMessageDetail) => {
  const { message } = props;

  const { userId } = getTokenAndUserId();

  return (
    <>
      {message.senderId === userId ? (
        <div className="mb-4 ml-4">
          <div>
            <p className="w-[calc(100%-40px)] overflow-y-auto text-[0.5rem] text-end text-[#878687]">
              {format(new Date(message.createdAt), "HH:mm")}
            </p>
            <div className="flex items-end">
              <p className="w-[calc(100%-40px)] break-all px-[0.5rem] py-[0.75rem] rounded-[10px_10px_0px_10px] bg-[#556EE6] text-[#fff]">
                {message.message}
              </p>
              <div className="w-[32px] h-[32px] bg-[#C8C7C7] ml-1 rounded-full flex justify-center items-center">
                <img
                  className={"!w-full !h-full rounded-full"}
                  src="https://scontent.fdad3-6.fna.fbcdn.net/v/t1.15752-9/403404105_894110541793814_5802275011316563369_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHqcHSABdUAwGxDZepPFvDvGpLwWc_OutEakvBZz8660YjQUpjZ3aY9sFiCfLsy0P6VtczSG00rtBzkl-rvHTvj&_nc_ohc=OreroOKYS7MAX_65OgX&_nc_ht=scontent.fdad3-6.fna&oh=03_AdR2Ft2SRdi0yvyv401Eduzw_-XRNYYM9W3P7Y2akaIFPQ&oe=659142EC"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4 mr-4">
          <div>
            <div className="flex">
              <div className="w-[2rem] h-[2rem] mr-1 rounded-full bg-[#C8C7C7] flex justify-center items-center">
                <img
                  className={"!w-full !h-full rounded-full"}
                  src="https://scontent.fdad3-6.fna.fbcdn.net/v/t1.15752-9/403404105_894110541793814_5802275011316563369_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHqcHSABdUAwGxDZepPFvDvGpLwWc_OutEakvBZz8660YjQUpjZ3aY9sFiCfLsy0P6VtczSG00rtBzkl-rvHTvj&_nc_ohc=OreroOKYS7MAX_65OgX&_nc_ht=scontent.fdad3-6.fna&oh=03_AdR2Ft2SRdi0yvyv401Eduzw_-XRNYYM9W3P7Y2akaIFPQ&oe=659142EC"
                  alt=""
                />
              </div>
              <div className="w-[calc(100%-40px)]">
                <span className="font-medium text-[0.625rem]">
                  {message.receiver.userName}
                </span>
                <span className="ml-[0.25rem] text-[0.5rem] text-[#878687]">
                  {format(new Date(message.createdAt), "HH:mm")}{" "}
                </span>
                <p className="px-[0.5rem] break-all py-[0.75rem] rounded-[10px_10px_0px_10px] bg-[#F6F6F6]">
                  {message.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
