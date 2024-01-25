import { useState, useEffect } from "react";
import NavBarShop from "./navbar"
import { SelectedPageShop } from "@/shared/types";
import ChosenItems from "./chosenitems";
import ComputerCases from "./computercase";
import Motherboard from "./motherboard";
import GPU from "./gpu";
import CPU from "./cpu";
import RAM from "./ram";
import Memory from "./memory/memory";
import PowerSupply from "./powersupply";
import Cooler from "./cooler";
import Footer from "@/landing/scenes/footer";

function Shop() {
  const [selectedPage, setSelectedPage] = useState<SelectedPageShop>(SelectedPageShop.Home);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPageShop.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
  }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    
  return (
    <div className="app bg-gray-20">
        <NavBarShop 
          isTopOfPage={isTopOfPage}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
        <ChosenItems 
          setSelectedPage={setSelectedPage}
        />
        <ComputerCases 
          setSelectedPage={setSelectedPage}
        />
        <Motherboard 
          setSelectedPage={setSelectedPage}
        />
        <GPU 
          setSelectedPage={setSelectedPage}
        />
        <CPU
          setSelectedPage={setSelectedPage}
        />
        <RAM
          setSelectedPage={setSelectedPage}
        />
        <Memory
          setSelectedPage={setSelectedPage}
        />
        <PowerSupply
          setSelectedPage={setSelectedPage}
        />
        <Cooler
          setSelectedPage={setSelectedPage}
        />

        <Footer />
    </div>
  )
}

export default Shop