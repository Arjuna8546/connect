const VerifyUserCard = ({ id, username, profile_url, email, phone_no, hasNotification, setUserId, setIsModalOpen}) => {
    const handleClick = (id) =>{
        setUserId(id)
        setIsModalOpen(true)
    }
    return (
        <article className="flex justify-between items-center p-6 rounded-3xl bg-stone-950 max-sm:flex-col max-sm:gap-5 max-sm:text-center">
            <div className="flex gap-8 items-center max-sm:flex-col max-sm:gap-3">
                <div className="overflow-hidden relative rounded-full border-2 border-blue-500 border-solid h-[34px] w-[34px]">
                    <img src={profile_url ? profile_url : "/userAvatar.png"} alt={username} />
                    {hasNotification && (
                        <div className="absolute -top-2.5 -right-2.5 w-4 h-4 bg-blue-500 rounded-full" />
                    )}
                </div>
                <div className="flex gap-6 text-sm font-medium text-stone-300 max-sm:flex-col max-sm:items-center">
                    <div className="w-32 truncate">{username}</div>
                    <div className="w-52 ">{email}</div>
                    <div className="w-32 truncate">{phone_no}</div>
                </div>
            </div>
            <button className="text-white border border-white rounded-full px-4 py-1 hover:bg-white hover:text-black transition duration-200 text-lg"
            onClick={()=>handleClick(id)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="cursor-pointer hover:scale-110 transition duration-200"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>

        </article>
    );
};

export default VerifyUserCard;
