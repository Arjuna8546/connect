export const Footer = () => {
  return (
    <footer className="bg-black px-5 sm:px-10 md:px-20 pt-20 md:pt-40 pb-10 md:pb-16">
      <div className="mx-auto max-w-screen-xl">
        {/* Top Section: Business, Contact, Links */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Business Section */}
          <div className="md:w-1/3">
            <h3 className="mb-4 text-xs font-bold tracking-wider uppercase text-white text-opacity-30">
              Business
            </h3>
            <address className="text-lg leading-7 text-white not-italic">
              <div>CONNECT Limited</div>
              <div>HEAD OFFICE</div>
              <div>Floor 37</div>
              <div>Ernakulam,Kerala,India</div>
              <div>Central,Squre apertment F57BB</div>
            </address>
          </div>

          <div className="md:w-1/3">
            <h3 className="mb-4 text-xs font-bold tracking-wider uppercase text-white text-opacity-30">
              Contact Us
            </h3>
            <address className="text-sx leading-7 text-white not-italic">
              <div>CONNECT</div>
              <div>Arjuna Chandran v v</div>
              <div>Full-Stack-Developer</div>
              <div>arjunachandranvv8546@gmail.com</div>
              <div>+91 8590473744</div>
            </address>
          </div>

          <div className="md:w-1/3">
            <h3 className="mb-4 text-xs font-bold tracking-wider uppercase text-white text-opacity-30">
              About Us
            </h3>
            <nav className="flex flex-col gap-2.5">
              <a  className="text-base text-white uppercase">
                About Us
              </a>
              <a className="text-base text-white uppercase">
                Careers
              </a>
              <a  className="text-base text-white uppercase">
                Partners
              </a>
              <a  className="text-base text-white uppercase">
                Privacy Policy
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex justify-between items-center pt-10 border-t border-white border-opacity-10 text-white text-opacity-40 text-xs max-sm:flex-col max-sm:gap-4 mt-10">
          <p>
            Connect U.K. Limited registered in England &amp; Wales Company number 10482483
          </p>
          <p>Copyright © Optinet All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

