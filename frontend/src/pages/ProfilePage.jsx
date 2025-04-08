import { Navigation } from "../components/user/othercomponent/Navigation";
import { ProfileHeader } from "../components/user/profilepage/ProfileHeader";
import { ProfileSection } from "../components/user/profilepage/ProfileSection";
import { VerificationItem } from "../components/user/profilepage/VerificationItems";

export const ProfilePage = () => {
  const verificationIcon = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.0204 4.12698C17.2212 -0.91436 9.20449 -1.10167 4.15066 3.70946C-0.903168 8.52058 -1.11031 16.5368 3.68892 21.5781C8.48815 26.6195 16.5048 26.8068 21.5587 21.9956C26.6125 17.1845 26.8196 9.16832 22.0204 4.12698ZM20.6103 5.46937C24.6851 9.7497 24.5105 16.5041 20.2196 20.589C15.9287 24.6739 9.17381 24.5161 5.09903 20.2357C1.02426 15.9554 1.1988 9.20095 5.48974 5.11609C9.78067 1.03122 16.5355 1.18904 20.6103 5.46937ZM14.0025 6.69033L12.0265 6.64416L11.8922 11.8415L6.69451 11.7201L6.64345 13.696L11.8411 13.8174L11.7068 19.0148L13.6828 19.0609L13.8171 13.8636L19.0148 13.985L19.0659 12.0091L13.8682 11.8877L14.0025 6.69033Z" fill="#0087BD"/>
  </svg>`;

  return (
    <main className="w-full bg-black min-h-[screen]">
      <Navigation />
      <div className="flex flex-col gap-5 items-center px-20 py-10 max-md:px-10 max-sm:px-5">
        <ProfileHeader />

        <section className="p-8 w-full rounded-3xl bg-stone-950 max-w-[937px]">
          <div className="flex flex-col gap-5">
            <ProfileSection title="First name" value="Sundhar" />
            <ProfileSection title="last name" value="kum" />
            <ProfileSection title="Gender" value="male" />
            <ProfileSection title="date of birth" value="15-07-2002" />
            <ProfileSection title="eamil" value="Sundarkumm@gmail.com" />
            <ProfileSection title="Phone No" value="12554181281" />
          </div>
        </section>

        <section className="p-8 w-full rounded-3xl bg-stone-950 max-w-[937px]">
          <VerificationItem
            icon={verificationIcon}
            title="verify your gov.id"
          />
          <div className="my-5 h-px bg-neutral-700" />
          <VerificationItem
            icon={verificationIcon}
            title="Phone - no"
            subtitle="+91 9836745456"
          />
        </section>

        <section className="p-8 w-full rounded-3xl bg-stone-950 max-w-[937px]">
          <VerificationItem icon={verificationIcon} title="Add a mini bio" />
          <div className="my-5 h-px bg-neutral-700" />
          <VerificationItem icon={verificationIcon} title="vehicle details" />
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
