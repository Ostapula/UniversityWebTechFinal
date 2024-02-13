import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "@/assets/Logo.png";
import LinkNavWork from "./LinkNavWork";
import { Link } from "react-router-dom";
import { SelectedPageWorkshop } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";


type Props = {
    isTopOfPage: boolean;
    selectedPage: SelectedPageWorkshop;
    setSelectedPage: (value: SelectedPageWorkshop) => void;
    
}

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage } : Props) => {
    const flexBetween = "flex items-center justify-between";
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";
    const clientData = useSelector((state: RootState) => state.clientData);
    return (
    <nav>
        <div className={`${navbarBackground} ${flexBetween} fixed top-0 z-40 w-full py-6`}>
            <div className={`${flexBetween} mx-auto w-5/6`}>
                <div className={`${flexBetween} w-full gap-16`}>
                    {/* Left side */}
                    <img alt="logo" src={Logo} width={`50px`}/>

                    {/* Right side */}
                    {isAboveMediumScreens ? ( <div className={`${flexBetween} w-full`}>
                        <div className={`${flexBetween} gap-8 text-sm`}>
                            <LinkNavWork 
                                page="Home"
                                selectedPage={selectedPage}
                                setSelectedPage={setSelectedPage}
                            />
                            <LinkNavWork
                                page="History"
                                selectedPage={selectedPage}
                                setSelectedPage={setSelectedPage}
                            />
                            <Link to="/" className="transition duration-500 hover:text-primary-300">
                                Landing
                            </Link>
                            <Link to="/shop" className="transition duration-500 hover:text-primary-300">
                                Shop
                            </Link>
                        </div>
                        <div>
                            {clientData.username === '' ? ( 
                                <div className={`${flexBetween} gap-8`}><Link to={`/signin`}  className="transition duration-500 hover:text-primary-300"><p>Sign In</p></Link>
                                    <Link to={`/signup`} className="rounded-lg bg-secondary-500 px-10 py-2 hover:text-white hover:bg-primary-500">Sign Up</Link>
                                </div>
                            ) : (
                                <Link to={`/profile`} className="transition duration-500 hover:text-primary-300"><p>{clientData.username}</p></Link>
                            )}
                        </div>
                    </div>) : (
                        <button
                            className="rounded-full bg-secondary-500 p-2"
                            onClick={() => setIsMenuToggled(!isMenuToggled)}
                        >
                            <Bars3Icon className="h-6 w-6 text-white" />
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* Mobile menu modal */}
        {!isAboveMediumScreens && isMenuToggled && (
            <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
                {/* Close icon */}
                <div className="flex justify-end p-12">
                    <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                        <XMarkIcon className="h-6 w-6 text-gray-400" />
                    </button>
                </div>
                {/* Menu items */}
                <div className="ml-[33%] flex flex-col gap-10 text-2xl">
                    <LinkNavWork 
                        page="Home"
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage}
                    />
                    <LinkNavWork 
                        page="History"
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage}
                    />
                    <Link to="/" className="transition duration-500 hover:text-primary-300">
                        Landing
                    </Link>
                    <Link to="/workshop" className="transition duration-500 hover:text-primary-300">
                        Workshop
                    </Link>
                    {clientData.username === '' ? (<Link to={`/signin`} className="transition duration-500 hover:text-primary-300 mt-10">Sign In</Link>) : (
                        <Link to={`/profile`} className="transition duration-500 hover:text-primary-300 mt-10">{clientData.username}</Link>
                    )}
                </div>
            </div>
        )}
    </nav>
)
}

export default Navbar