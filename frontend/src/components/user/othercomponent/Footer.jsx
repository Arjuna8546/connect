export const Footer = () => {
    return (
      <footer className="px-20 pt-40 pb-16 bg-black max-md:px-10 max-sm:px-5 max-sm:pt-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-3 gap-10 mb-56 max-md:grid-cols-1">
            <div className="max-w-[526px]">
              <h2 className="mb-10 text-4xl leading-10 text-white max-md:text-3xl max-md:leading-9">
                <span>Ready to redefine</span>
                <span className="font-bold">ride-sharing</span>
                <span>with</span>
                <span className="font-bold">seamless</span>
                <span>,</span>
                <span className="font-bold">smart</span>
                <span>, and</span>
                <span className="font-bold">secure</span>
                <span>connections?</span>
              </h2>
            </div>
            <div />
            <div>
              <button className="px-14 py-4 text-xs font-bold tracking-widest text-white uppercase bg-[linear-gradient(57deg,#0F0F0F_0%,#373939_50%,#0F0F0F_100%)] rounded-[50px]">
                GET IN TOUCH
              </button>
            </div>
          </div>
  
          <h3 className="mb-5 text-xs font-bold tracking-wider uppercase text-white text-opacity-30">
            BUSINESS
          </h3>
  
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-6/12 max-md:ml-0 max-md:w-full">
              <address className="text-lg leading-7 text-white not-italic">
                <span>CONNECT Limited</span>
                <br />
                <span>HEAD OFFICE</span>
                <br />
                <span>Floor 37</span>
                <br />
                <span>One Canada Square</span>
                <br />
                <span>London E14 5AA</span>
              </address>
              <h3 className="mb-5 text-xs font-bold tracking-wider uppercase text-white text-opacity-30">
                CONTACT US
              </h3>
              <address className="text-lg leading-7 text-white not-italic">
                <span>SOUTHEND</span>
                <br />
                <span>Skyline Plaza</span>
                <br />
                <span>Victoria Avenue</span>
                <br />
                <span>Southend</span>
                <br />
                <span>Essex SS2 6BB</span>
              </address>
            </div>
  
            <nav className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col gap-2.5">
                <a href="#" className="text-base text-white uppercase">
                  About Us
                </a>
                <a href="#" className="text-base text-white uppercase">
                  Careers
                </a>
                <a href="#" className="text-base text-white uppercase">
                  Partners
                </a>
                <a href="#" className="text-base text-white uppercase">
                  Privacy Policy
                </a>
              </div>
            </nav>
          </div>
  
          <div className="flex justify-between items-center pt-10   border-opacity-10 max-sm:flex-col max-sm:gap-5">
            <p className="text-xs leading-5 text-white text-opacity-40">
              Optinet U.K. Limited registered in England &amp; Wales Company
              number 10482483
            </p>
            <p className="text-xs leading-5 text-white text-opacity-40">
              Copyright © Optinet All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    );
  };
  