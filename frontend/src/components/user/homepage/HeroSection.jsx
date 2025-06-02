import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const HeroSection = () => {
  const nav = useNavigate()
  return (


    <section className="flex relative flex-col justify-center items-center px-5 text-center bg-black h-[718px] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/background1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>

      {/* Center Text Content with Motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 50 }}
        animate={{ opacity: 1, scale: 1.1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="relative z-[1] mx-auto max-w-[877px] flex flex-col items-center"
      >
        <p className="gap-2 mb-3 text-xs font-bold tracking-wider uppercase text-zinc-500">
          Connect Rides, Connect Lives.
        </p>
        <p className="mb-10 text-xs font-bold tracking-wider uppercase text-white text-opacity-60">
          Ride. Connect. Go.
        </p>
        <h2 className="text-8xl tracking-tighter uppercase leading-[90px] text-neutral-500 max-md:text-6xl max-md:leading-[70px] max-sm:text-4xl max-sm:leading-[50px]">
          <span className="font-bold ">Book.</span>
          <span className="text-[#9b87f5]">Beyond Rides.</span>
          <span className="font-bold">connect.</span>
        </h2>
        <button onClick={() => nav('/search')} className="flex gap-2.5 items-center px-8 py-4 mt-10 text-xs font-bold tracking-widest text-black uppercase bg-white rounded-[50px]">
          <span >search</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.6153 7.42045L7.62374 0.428932L6.44199 1.61068L11.565 6.73367L1.31546 6.73721L0.552673 7.5L1.33137 8.2787L11.5561 8.27517L6.44199 13.3893L7.62374 14.5711L14.6153 7.42045Z"
              fill="black"
            />
          </svg>
        </button>
      </motion.div>


      {/* Arrow buttons (unchanged) */}
      <div className="flex absolute left-5 top-2/4 flex-col gap-2 max-md:hidden">
        <button className="flex justify-center items-center w-11 h-11 border border-white border-opacity-50 rounded-[44px]" aria-label="Previous">
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.8 6.1875L7.8 12.1875L8.76 11.2275L3.84 6.1875L8.76 1.1475L7.8 0.1875L1.8 6.1875Z" fill="white" />
          </svg>
        </button>
        <button className="flex justify-center items-center w-11 h-11 border border-white border-opacity-50 rounded-[44px]" aria-label="Next">
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2 6.1875L4.2 0.1875L3.24 1.1475L8.16 6.1875L3.24 11.2275L4.2 12.1875L10.2 6.1875Z" fill="white" />
          </svg>
        </button>
      </div>
    </section>


  );
};
