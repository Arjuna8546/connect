import { blockuser } from "../../../Endpoints/AdminAPI";

const UserCard = ({ id, username, profile_url, email, phone_no, status, hasNotification, setUsers }) => {
  const handleSubmit = async () => {
    try {
      const newStatus = status === "blocked" ? "active" : "blocked";
      const res = await blockuser({ id, status: newStatus });

      if (res?.data?.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, status: newStatus } : user
          )
        );
      } else {
        console.error("Failed to update user status:", res?.data?.message);
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <article className="flex justify-between items-center p-6 rounded-3xl bg-white shadow-md border max-sm:flex-col max-sm:gap-5 max-sm:text-center">
      <div className="flex gap-8 items-center max-sm:flex-col max-sm:gap-3">
        <div className="overflow-hidden relative rounded-full border-2 border-blue-500 h-[34px] w-[34px]">
          <img
            src={profile_url ? profile_url : "/userAvatar.png"}
            alt={username}
            className="object-cover h-full w-full"
          />
          {hasNotification && (
            <div className="absolute -top-2.5 -right-2.5 w-4 h-4 bg-blue-500 rounded-full" />
          )}
        </div>
        <div className="flex gap-6 text-sm font-medium text-gray-800 max-sm:flex-col max-sm:items-center">
          <div className="w-32 truncate">{username}</div>
          <div className="w-52 underline truncate text-blue-600">{email}</div>
          <div className="w-32 truncate">{phone_no}</div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className={`px-5 py-2.5 text-xs font-bold uppercase rounded-[30px] tracking-[2.1px] transition duration-200 ${
          status === "active"
            ? "text-red-500 bg-red-100 hover:bg-red-200"
            : "text-green-600 bg-green-100 hover:bg-green-200"
        }`}
      >
        {status === "active" ? "Block" : "Unblock"}
      </button>
    </article>
  );
};

export default UserCard;
