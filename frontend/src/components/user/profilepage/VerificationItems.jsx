export const VerificationItem = ({ icon, title, subtitle }) => {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 items-center">
          <div dangerouslySetInnerHTML={{ __html: icon }} />
          <h3 className="text-sm font-bold text-white uppercase tracking-[2.73px]">
            {title}
          </h3>
          {subtitle && (
            <span className="text-sm text-white uppercase tracking-[2.73px]">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    );
  };
  