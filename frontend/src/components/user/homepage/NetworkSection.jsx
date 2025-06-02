import { ArrowIcon } from "./Icons";

export const NetworkSection = () => {
  return (
    <section className="relative overflow-hidden px-20 py-72 bg-black max-md:px-10 max-md:py-36 max-sm:px-5 max-sm:py-20">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10" />

      <div className="relative z-20 mx-auto text-center max-w-[880px]">
        <div className="flex gap-2 justify-center items-center mb-5 text-xs font-bold tracking-wider text-white uppercase">
          <ArrowIcon />
          <span>OUR NETWORK</span>
        </div>
        <h2 className="mb-10 text-4xl leading-10 text-white max-md:text-3xl max-md:leading-10 max-sm:text-3xl max-sm:leading-9">
          <span>
            Find rides, share journeys, and connect with people heading your
            way.
          </span>
          <span className="font-bold">Affordable</span>
          <span>,</span>
          <span className="font-bold">convenient</span>
          <span>, and</span>
          <span className="font-bold">eco-friendly</span>
          <span>travel made simple.</span>
        </h2>
        <div className="flex gap-5 justify-center max-sm:flex-col">
          <button className="px-14 py-4 text-xs font-bold tracking-widest text-white uppercase bg-[linear-gradient(57deg,#212020_0%,#5D5D5D_0.01%,#212020_100%)] rounded-[50px]">
            FIND OUT MORE
          </button>
          <button className="px-9 py-4 text-xs font-bold tracking-widest text-white uppercase bg-black border border-white border-opacity-20 rounded-[50px]">
            contact us
          </button>
        </div>
      </div>
    </section>
  );
};

