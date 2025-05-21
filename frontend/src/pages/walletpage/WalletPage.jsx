"use client";

import { Navigation } from "../../components/user/othercomponent/Navigation";
import WalletMain from "../../components/user/wallet/WalletMain";

const WalletPage = () => {

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <Navigation />
      <main className=" h-full bg-black ">
        
        <WalletMain/>
      </main>
    </>
  );
};

export default WalletPage;