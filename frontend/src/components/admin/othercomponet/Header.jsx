import Logo from "../../user/othercomponent/Logo";


const Header = () => {
    return (
      <header className="flex justify-between items-center px-14 py-0 border-b border-solid border-b-zinc-800 h-[104px] max-md:px-5 max-md:py-0 fixed top-0 left-0 right-0 bg-black z-50">
        <Logo/>     
      </header>
    );
  };
  
  export default Header;
  