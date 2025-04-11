
import UserCard from "./UserCard";

const UserManagement = ({ users, search, setSearch }) => {

    return (
        <main className="p-10 ml-64 max-md:ml-0 max-md:p-5">
            <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
                <h1 className="text-2xl font-bold text-stone-300">USER MANAGEMENT</h1>
                <div className="flex gap-5">
                    <div className="flex items-center px-4 py-2 border-2 border-white rounded-full bg-transparent text-white max-sm:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mr-2 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                            />
                        </svg>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by ....."
                            className="bg-transparent focus:outline-none text-white placeholder-white text-sm w-40"
                        />
                    </div>
                    <button className="px-6 py-3 text-sm font-bold text-white uppercase bg-blue-500 rounded-[20px] tracking-[1.5px] max-sm:w-full max-sm:text-center">
                        verify requests
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                {users.length > 0 ? (
                    users.map((user, index) => <UserCard key={index} {...user} />)
                ) : (
                    <div className="text-center text-stone-400 text-sm font-medium mt-10">
                        No users found.
                    </div>
                )}
            </div>
        </main>

    );
};

export default UserManagement;
