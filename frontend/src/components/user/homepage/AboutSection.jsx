import { ArrowIcon } from "./Icons";
import RideFlowChart from "./RideFlowChart";

export const AboutSection = () => {
  return (
    <section className="px-5 py-16 sm:px-10 sm:py-24 md:px-20 md:py-36 bg-white">
      <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-20 lg:gap-32 items-center mx-auto max-w-screen-xl">
        <div className="w-full md:flex-1 text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center gap-2 mb-4 text-xs font-bold tracking-wider text-black uppercase">
            <ArrowIcon />
            <span>About Us</span>
          </div>
          <h2 className="mb-8 text-2xl sm:text-3xl md:text-4xl font-semibold text-black leading-snug">
            Seamless Rides. Smarter Connections. Trusted Journeys. Empowering
            Travel. Anytime, Anywhere.
          </h2>
          <div className="flex justify-center md:justify-start">
            <button className="px-10 py-3 sm:px-12 sm:py-4 text-xs sm:text-sm font-bold tracking-widest text-white uppercase bg-black rounded-full">
              App flow
            </button>
          </div>
        </div>
        <div className="hidden md:block w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <RideFlowChart />
        </div>
      </div>
    </section>
  );
};
