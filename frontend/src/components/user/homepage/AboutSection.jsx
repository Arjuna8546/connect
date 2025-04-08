import { ArrowIcon } from "./Icons";


export const AboutSection = () => {
  return (
    <section className="px-20 py-36 bg-white max-md:px-10 max-sm:px-5 max-sm:py-16">
      <div className="flex gap-32 items-center mx-auto max-w-screen-xl max-md:flex-col">
        <div className="bg-zinc-300 h-[600px] w-[600px] max-md:w-full max-md:h-[400px] max-sm:h-[300px]" />
        <div className="flex-1">
          <div className="flex gap-2 items-center mb-5 text-xs font-bold tracking-wider text-black uppercase">
            <ArrowIcon />
            <span>About Us</span>
          </div>
          <h2 className="mb-10 text-4xl leading-10 text-black max-md:text-3xl max-md:leading-9">
            Seamless Rides. Smarter Connections. Trusted Journeys. Empowering
            Travel. Anytime, Anywhere.
          </h2>
          <button className="px-12 py-4 text-xs font-bold tracking-widest text-white uppercase bg-black rounded-[50px]">
            About Optinet
          </button>
        </div>
      </div>
    </section>
  );
};
