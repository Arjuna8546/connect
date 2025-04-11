const UserCard = ({ username, profile_url, email, phone_no, status, hasNotification }) => {
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
                    <div className="w-52 underline truncate">{email}</div>
                    <div className="w-32 truncate">{phone_no}</div>
                </div>
            </div>
            <button
                className={`px-5 py-2.5 text-xs font-bold uppercase rounded-[30px] tracking-[2.1px] ${status === "active"
                        ? "text-white bg-red-500 bg-opacity-10"
                        : "text-white bg-green-400 bg-opacity-10"
                    }`}
            >
                {status === "active" ? "block" : "unBlock"}
            </button>
        </article>      
    );
};

export default UserCard;
