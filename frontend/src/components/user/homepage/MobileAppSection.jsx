export const MobileAppSection = () => {
    return (
      <section className="px-20 py-36 bg-white max-md:px-10 max-sm:px-5 max-sm:py-16">
        <div className="flex gap-32 items-center mx-auto max-w-screen-xl max-md:flex-col">
          <div className="relative w-[600px] max-md:w-full">
            <svg
              width="600"
              height="862"
              viewBox="0 0 600 862"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0 w-full"
            >
              {/* Phone SVG content */}
              <mask
                id="mask0_197_362"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="600"
                height="862"
              >
                <rect
                  width="599.997"
                  height="861.888"
                  fill="url(#pattern0_197_362)"
                />
              </mask>
              <g mask="url(#mask0_197_362)">
                <rect
                  width="246.667"
                  height="354.378"
                  transform="translate(180.444 61.4175)"
                  fill="#1F1F1F"
                />
                {/* Additional phone details would be included here */}
              </g>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="gap-2 mb-5 text-xs font-bold tracking-wider text-black uppercase">
              About Us
            </h3>
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
  