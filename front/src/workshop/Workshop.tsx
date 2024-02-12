import { useEffect, useState } from "react";
import Navbar from "./navbarworkshop"
import { SelectedPageWorkshop } from "@/shared/types";
import Main from "./main";
import History from "./history";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setClientData } from "@/state/userschanger/clientDataSlice";

const Workshop = () => {
  const [selectedPage, setSelectedPage] = useState<SelectedPageWorkshop>(SelectedPageWorkshop.Home);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPageWorkshop.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logOut = () => {
    localStorage.clear();
    const ClientData = {
        id: 0,
        username: '',
        name: '',
        email: '',
        address: '',
        postalCode: '',
        city: '',
        phone: '',
    };
    dispatch(setClientData(ClientData));
    navigate('/signin');
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        setIsLoading(false);
        return;
    }
    fetch('http://localhost:8080/auth/validate-token', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            logOut();
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar 
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <Main />
      <History
        setSelectedPage={setSelectedPage}
      />
    </div>
  )
}

export default Workshop