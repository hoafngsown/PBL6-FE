
function UserChatItem({ user }) {
  return (
    <div className='border-b border-gray-200 cursor-pointer transition-all hover:bg-gray-100'>
      <div className='px-3 pb-4 pt-2 flex items-center justify-between'>
        <div className="w-[45px] h-[45px] shrink-0 bg-[#C8C7C7] rounded-full flex justify-center items-center">
          <img
            className={"!w-full !h-full object-cover rounded-full"}
            src="https://i.pngimg.me/thumb/f/720/456c6c08f2.jpg"
            alt="avt-img"
          />
        </div>

        <div className='ml-2 flex flex-col gap-y-2 flex-1'>
          <h4 className='font-bold'>{user.user.userName}</h4>
        </div>
      </div>
    </div>
  )
}

export default UserChatItem