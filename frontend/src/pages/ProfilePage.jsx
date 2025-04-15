import { useEffect, useState } from "react";
import { Navigation } from "../components/user/othercomponent/Navigation";
import { ProfileHeader } from "../components/user/profilepage/ProfileHeader";
import { ProfileSection } from "../components/user/profilepage/ProfileSection";
import { VerificationItem } from "../components/user/profilepage/VerificationItems";
import { useDispatch, useSelector } from "react-redux"
import ProfileDetailModal from "../components/user/profilepage/ProfileDetailModal";
import ProfileGovUpload from "../components/user/profilepage/ProfileGovUploadModal";
import VehicleDetailModal from "../components/user/profilepage/VehicleDetailModal";
import VehicleSelector from "../components/user/profilepage/VehicleSelector";
import { getalluservehicles, updateVehicles } from "../Endpoints/APIs";
import { setUser, setVehicles } from "../store/slices/UserSlice";
import BioModal from "../components/user/profilepage/BioModal";
import { useLocation } from "react-router-dom";
import PasswordChangeModal from "../components/user/profilepage/PasswordChangeModal";

export const ProfilePage = () => {
  const verificationIcon = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.0204 4.12698C17.2212 -0.91436 9.20449 -1.10167 4.15066 3.70946C-0.903168 8.52058 -1.11031 16.5368 3.68892 21.5781C8.48815 26.6195 16.5048 26.8068 21.5587 21.9956C26.6125 17.1845 26.8196 9.16832 22.0204 4.12698ZM20.6103 5.46937C24.6851 9.7497 24.5105 16.5041 20.2196 20.589C15.9287 24.6739 9.17381 24.5161 5.09903 20.2357C1.02426 15.9554 1.1988 9.20095 5.48974 5.11609C9.78067 1.03122 16.5355 1.18904 20.6103 5.46937ZM14.0025 6.69033L12.0265 6.64416L11.8922 11.8415L6.69451 11.7201L6.64345 13.696L11.8411 13.8174L11.7068 19.0148L13.6828 19.0609L13.8171 13.8636L19.0148 13.985L19.0659 12.0091L13.8682 11.8877L14.0025 6.69033Z" fill="#0087BD"/>
  </svg>`;
  const user = useSelector((state) => state.user)
  const vehicles = useSelector((state) => state.user.vehicles);
  const dispatch = useDispatch()
  const location = useLocation()

  const [isModelOpen, setISModelOpen] = useState(false)
  const [isModelGovidOpen, setIsModelGovidOpen] = useState(false)
  const [isModelVehicleOpen, setIsModelVehicleOpen] = useState(false)
  const [isModelBioOpen, setIsModelBioOpen] = useState(false)
  const [isModelChangePassOpen, setIsModelChangePassOpen] = useState(false)



  const handleOpen = () => setISModelOpen(true)
  const handleClose = () => setISModelOpen(false)

  const handleGovOpen = () => setIsModelGovidOpen(true)
  const handleGovClose = () => setIsModelGovidOpen(false)

  const handleVehicleOpen = () => setIsModelVehicleOpen(true)
  const handleVehicleClose = () => setIsModelVehicleOpen(false)

  const handleBioOpen = () => setIsModelBioOpen(true)
  const handleBioClose = () => setIsModelBioOpen(false)

  const handleChangePassOpen = () => setIsModelChangePassOpen(true)
  const handleChangePassClose = () => setIsModelChangePassOpen(false)

  useEffect(() => {

    const fetchUserAndVehicles = async () => {
      if (!user?.user?.id) return;
      try {
        const res = await getalluservehicles(user.user.id)

        if (res?.data?.success) {
          dispatch(setUser(res.data.user));
        }

        if (res?.data?.success) {
          dispatch(setVehicles(res.data.vehicles));
        }
      } catch (error) {
        console.error("Error fetching user or vehicles:", error);
      }
    };

    fetchUserAndVehicles();
  }, [location]);

  const getSelectedId = async (id) => {
    try {
      const response = await updateVehicles({ "user_id": user.user.id, "vehicle_id": id })
      if (response?.data?.success === true) {
        dispatch(setVehicles(response.data.vehicle))
      }
    }
    catch (error) {

    }
  }

  return (
    <main className="w-full bg-black min-h-[screen]">
      <Navigation />
      <div className="flex flex-col gap-5 items-center px-20 py-10 max-md:px-10 max-sm:px-5">
        <ProfileHeader user_id={user?.user?.id} username={user?.user?.username || "Guest"} profile_url={user?.user?.profile_url} is_verified={user?.user?.is_verified || false} />

        <section className="p-8 w-full rounded-3xl bg-stone-950 max-w-[937px] relative">
          <div className="absolute top-4 right-4 group">
            <button onClick={handleOpen} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-2 shadow-md hover:bg-white/20 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
                />
              </svg>
            </button>

          </div>

          <div className="flex flex-col gap-5">
            <ProfileSection title="Gender" value={user?.user?.gender || "nill"} />
            <ProfileSection title="Date of Birth" value={user?.user?.date_of_birth || "YYYY-MM-DD"} />
            <ProfileSection title="Email" value={user?.user?.email || "example@gmail.com"} />
            <ProfileSection title="Phone No" value={user?.user?.phone_no || "+91 9999999999"} />
          </div>
          {isModelOpen && <ProfileDetailModal isOpen={isModelOpen} onClose={handleClose} user={user?.user} />}
        </section>


        <section className="p-8 w-full  rounded-3xl bg-stone-950 max-w-[937px]">
          {user?.user?.gov_url ? (
            <div className="flex flex-col gap-2 items-center-safe">
              <h3 className="text-sm font-semibold text-zinc-700 uppercase tracking-wide">Government ID</h3>

              <img
                src={user.user.gov_url}
                alt="Government ID Preview"
                className="w-full max-w-md h-auto rounded-lg border object-contain"
              />

              <div className="flex justify-between items-center w-full max-w-md mt-2">
                <button
                  onClick={handleGovOpen}
                  disabled={user.user.gov_status === "verified"}
                  className={`px-4 py-2 text-black rounded-full text-sm tracking-wider uppercase
                    ${user.user.gov_status === "verified"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gray-50 hover:bg-gray-200"}
                  `}
                >
                  Change / Replace
                </button>

                <span
                  className={`text-sm font-semibold uppercase px-3 py-1 rounded-full
                  ${user.user.gov_status === "verified" ? "bg-green-200 text-green-800" :
                      user.user.gov_status === "pending" ? "bg-yellow-200 text-yellow-800" :
                        "bg-red-200 text-red-800"}
                `}
                >
                  {user.user.gov_status}
                </span>
              </div>
            </div>

          ) : (
            <>
              <VerificationItem
                onClick={handleGovOpen}
                icon={verificationIcon}
                title="verify your gov.id"
              />
            </>
          )}

          {isModelGovidOpen && (
            <ProfileGovUpload
              isOpen={isModelGovidOpen}
              onClose={handleGovClose}
              user={user?.user}
            />
          )}
          <div className="my-5 h-px bg-neutral-700" />
          {!user?.user?.is_google&&<VerificationItem
            onClick={handleChangePassOpen}
            icon={verificationIcon}
            title="Change Password"
          />}
          {isModelChangePassOpen && (
            <PasswordChangeModal
              isOpen={isModelChangePassOpen}
              onClose={handleChangePassClose}
            />
          )}

        </section>

        <section className="p-8 w-full rounded-3xl bg-stone-950 max-w-[937px]">
          <VerificationItem onClick={handleBioOpen} icon={verificationIcon} title="Add a mini bio" />
          {user?.user?.bio && (
            <div className="mt-3 ml-8 mr-8 group">
              <div className="p-6  border border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <p className="text-sm text-white leading-relaxed whitespace-pre-line">
                      {user.user.bio}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}


          {isModelBioOpen && (
            <BioModal
              isOpen={isModelBioOpen}
              onClose={handleBioClose}
              user={user?.user}
            />
          )}
          <div className="my-5 h-px bg-neutral-700" />
          <VerificationItem icon={verificationIcon} title="vehicle details" onClick={handleVehicleOpen} />
          {isModelVehicleOpen && (
            <VehicleDetailModal
              isOpen={isModelVehicleOpen}
              onClose={handleVehicleClose}
              user={user?.user}
            />
          )}
          <VehicleSelector vehicles={vehicles} onSelect={getSelectedId} />
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
