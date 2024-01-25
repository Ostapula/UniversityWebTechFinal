import Navbar from "@/landing/scenes/navbar";
import Home from "@/landing/scenes/home";
import Benefits from "@/landing/scenes/benefits";
import OurWorks from "@/landing/scenes/ourworks";
import ContactUs from "@/landing/scenes/contactus";
import Footer from "@/landing/scenes/footer";
import { useEffect, useState } from "react"
import { SelectedPage } from "@/shared/types";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app bg-gray-20">
      <Navbar 
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <Home 
        setSelectedPage={setSelectedPage}
      />
      <Benefits 
        setSelectedPage={setSelectedPage}
      />
      <OurWorks
        setSelectedPage={setSelectedPage}
      />
      <ContactUs 
        setSelectedPage={setSelectedPage}
      />
      <Footer />
    </div>
  )
}

export default App
