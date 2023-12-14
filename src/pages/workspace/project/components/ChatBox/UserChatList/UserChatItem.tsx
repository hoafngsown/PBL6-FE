import React from 'react'

function UserChatItem({ user }) {
  return (
    <div className='border-b border-gray-200 cursor-pointer transition-all hover:bg-gray-100'>
      <div className='px-3 pb-4 pt-2 flex items-center justify-between'>
        <div className="w-[45px] h-[45px] shrink-0 bg-[#C8C7C7] rounded-full flex justify-center items-center">
          <img
            className={"!w-full !h-full object-cover rounded-full"}
            src="https://scontent.fdad3-6.fna.fbcdn.net/v/t1.15752-9/403404105_894110541793814_5802275011316563369_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHqcHSABdUAwGxDZepPFvDvGpLwWc_OutEakvBZz8660YjQUpjZ3aY9sFiCfLsy0P6VtczSG00rtBzkl-rvHTvj&_nc_ohc=OreroOKYS7MAX_65OgX&_nc_ht=scontent.fdad3-6.fna&oh=03_AdR2Ft2SRdi0yvyv401Eduzw_-XRNYYM9W3P7Y2akaIFPQ&oe=659142EC"
            alt="avt-img"
          />
        </div>

        <div className='ml-2 flex flex-col gap-y-2 flex-1'>
          <h4 className='font-bold'>{user.userName}</h4>
          {/* <p className='line-clamp-2'>Du ma may troi oi la troi du ma mayyyyyyy mayyyyyyymaysssyyyyyy mayyyyyyy mayyyyyyymaysssyyyyyy mayyyyyyy mayyyyyyymaysssyyyyyy</p> */}
        </div>
      </div>
    </div>
  )
}

export default UserChatItem