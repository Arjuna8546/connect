import { useRef } from "react";
import { updateuser } from "../../../Endpoints/APIs";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slices/UserSlice";
import { showError, showSuccess } from "../../../utils/toastUtils";

export const ProfileHeader = ({ user_id, username, profile_url, is_verified }) => {
  const dispatch = useDispatch()
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "connect_preset");
    formData.append("folder", "connect");

    if (file) {
      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dljqwak5o/image/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        const res = await updateuser({ "user_id": user_id, "profile_url": data.secure_url })
        if (res.data?.success === true) {
          dispatch(setUser(res?.data?.userDetails))
          showSuccess(res?.data?.message)
        }

      } catch (error) {
        showError(error);
      }
    }
  };


  return (
    <section className="p-8 w-full rounded-3xl backdrop-blur-[7.5px] bg-zinc-900 bg-opacity-50 max-w-[943px]">
      <div className="flex gap-8 items-center">
        <div className="relative h-[119px] w-[114px]">
          <label htmlFor="avatarInput" className="cursor-pointer block w-full h-full">
            <img
              src={profile_url || "/userAvatar.png"}
              alt="Profile"
              className="w-full h-full rounded-[119px] border-[2px] border-[#3897F0]"
            />
          </label>
          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <h2 className="text-xl text-stone-300">{username}</h2>
            {is_verified && (
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[16px] h-[17px]"
              >
                <path
                  d="M5.52727 17L4.14545 14.4095L1.52727 13.7619L1.78182 10.7667L0 8.5L1.78182 6.23333L1.52727 3.2381L4.14545 2.59048L5.52727 0L8 1.17381L10.4727 0L11.8545 2.59048L14.4727 3.2381L14.2182 6.23333L16 8.5L14.2182 10.7667L14.4727 13.7619L11.8545 14.4095L10.4727 17L8 15.8262L5.52727 17ZM7.23636 11.3738L11.3455 6.8L10.3273 5.62619L7.23636 9.06667L5.67273 7.36667L4.65455 8.5L7.23636 11.3738Z"
                  fill="#3897F0"
                />
              </svg>
            )}
          </div>
          <div className="flex gap-5 items-center">
            <svg id="60:3778" className="w-[53px] h-[60px]"></svg>
          </div>
        </div>
      </div>
    </section>
  );
};
