export const MobileAppSection = () => {
  return (
    <section className="px-20 py-8 bg-zinc-100 max-md:px-10 max-sm:px-5 max-sm:py-16">
      <div className="flex gap-32 items-center mx-auto max-w-screen-xl max-md:flex-col">

        <div className="relative w-[300px] aspect-[3/5] rounded-[2rem] overflow-hidden shadow-xl bg-black max-md:w-[250px] max-sm:w-[200px] border-8 border-stone-900">
          <img
            src="/homeconnect.jpg"
            alt="Phone Background"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />

          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-stone-900 rounded-full z-10"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-white px-4">
            <img src="/connectlogo.png" alt="Connect Logo" className="w-14 h-14 mb-2" />
            <span className="text-3xl font-bold">connect</span>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-5 z-10">
            <span className="w-3 h-3 bg-white/60 rounded-full"></span>
            <span className="w-3 h-3 bg-white/60 rounded-full"></span>
            <span className="w-3 h-3 bg-white/60 rounded-full"></span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">

          <h2 className="mb-6 text-4xl leading-10 text-black max-md:text-3xl max-md:leading-9">
            Seamless Rides. Smarter Connections. Trusted Journeys. Empowering Travel.
            Anytime, Anywhere.
          </h2>

          <p className="mb-10 text-base text-gray-700 max-w-3xl mx-auto md:mx-0">
            Our Optinet mobile app enhances the ride-sharing experience with real-time location tracking of riders.
            Whether you're a driver or passenger, the app ensures accurate live updates, increased safety,
            and smoother coordination throughout the journey — all from the palm of your hand.
          </p>

          <a
            href="ConnectTracker.apk" 
            download
            className="inline-block px-12 py-4 text-xs font-bold tracking-widest text-white uppercase bg-black rounded-[50px]"
          >
            Download Our App
          </a>
        </div>
      </div>
    </section>
  );
};

