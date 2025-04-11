
import React, { useState } from "react";
import { updateuser } from "../../../Endpoints/APIs";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slices/UserSlice";
import toast from "react-hot-toast";

const BioModal = ({ isOpen, onClose, user }) => {
    const dispatch = useDispatch()
    const [bio,setBio] = useState(user.bio)
    const handleSubmit = async () => {
        try {
          const response = await updateuser({ user_id: user.user_id, bio });
          if (response?.data?.success === true) {
            dispatch(setUser(response.data.userDetails));
            toast.success(response?.data?.message);
            onClose(); 
          }
        } catch (error) {
          toast.error("Something went wrong!");
        }
      };
      

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 transition-opacity "
                onClick={onClose}
            />

            <article className="flex relative flex-col bg-white rounded-3xl w-[653px] max-md:w-[90%] max-sm:w-[90%] mx-4 sm:mx-5 z-10">
                <header className="flex justify-between items-start px-16 pt-10 max-md:px-10 max-sm:px-5">
                    <h1 className="text-xl font-bold leading-6 text-neutral-950">
                        ADD A MINI BIO ABOUT YOU
                    </h1>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="w-[24px] h-[24px] cursor-pointer"
                    >
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[24px] h-[24px]"
                        >
                            <path
                                d="M16.6904 8.10052C16.8868 8.29472 16.8885 8.6113 16.6943 8.80761L8.95839 16.6279C8.76419 16.8242 8.44761 16.8259 8.2513 16.6317L7.54036 15.9284C7.34405 15.7342 7.34233 15.4177 7.53653 15.2213L15.2724 7.40109C15.4666 7.20477 15.7832 7.20306 15.9795 7.39726L16.6904 8.10052Z"
                                fill="black"
                            />
                            <path
                                d="M16.0294 16.5894C15.8352 16.7857 15.5186 16.7874 15.3223 16.5932L7.50202 8.85732C7.30571 8.66312 7.30399 8.34654 7.49819 8.15022L8.20145 7.43929C8.39565 7.24297 8.71223 7.24125 8.90855 7.43546L16.7288 15.1713C16.9251 15.3655 16.9268 15.6821 16.7326 15.8784L16.0294 16.5894Z"
                                fill="black"
                            />
                        </svg>
                    </button>
                </header>

                <section className="px-16 pt-6 max-md:px-10 max-sm:px-5">
                    <textarea
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us a little about yourself!"
                        rows={6}
                        className="w-full p-4 rounded-3xl text-sm font-medium text-zinc-600 bg-zinc-300 outline-none resize-none min-h-[150px]"
                    />
                </section>

                <footer className="flex justify-end px-16 py-6 max-md:px-10 max-sm:px-5">
                    <button
                        onClick={handleSubmit}
                        className="h-10 text-xs font-bold text-white uppercase bg-stone-950 rounded-[33px] tracking-[2.1px] w-[131px]"
                    >
                        SUBMIT
                    </button>
                </footer>
            </article>

        </div>
    );
};

export default BioModal;
