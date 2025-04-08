export const ProfileSection = ({ title, value }) => {
    return (
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold text-white uppercase tracking-[2.73px]">
          {title}
        </h3>
        <p className="text-xs text-stone-300">{value}</p>
      </div>
    );
  };
  