import useMediaQuery from '@/hooks/useMediaQuery';
import { SelectedPage } from '@/shared/types';
import HomePageText from '@/assets/HomePageText.png';
import HomePageGraphic from '@/assets/HomePageGraphic.png';
import SponsorNvidia from '@/assets/SponsorNvidia.png'
import SponsorIntel from '@/assets/SponsorIntel.png'
import SponsorGoogle from '@/assets/SponsorGoogle.png'
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Home = ({ setSelectedPage }: Props) => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const clientData = useSelector((state: RootState) => state.clientData);
    return (
        <section
            id="home"
            className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0"
        >
            {/* Image and main header */}
            <motion.div 
                className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6"
                onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
            >
                {/* Main header */}
                <div className="z-10 mt-32 md:basis-3/5">
                    {/* Headings */}
                    <motion.div 
                        className="md:-mt-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            hidden: {opacity: 0, x:-50},
                            visible: {opacity: 1, x:0}
                        }}
                    >
                        <div className="relative">
                            <div className="before:absolute before:-top-20 before:-left-20 before:z-[-1] md:before:content-computerstext">
                                <img alt="home-page-text" src={HomePageText} />
                            </div>
                        </div>
                        <p className="mt-8 text-sm">
                            Exceptional Tech Solutions. Unmatched Computer Repair Services And Shop. Premier Workstations for Optimal Device Performance. Achieve Your Ideal Technology Experience. Get Your Dream System Now.
                        </p>
                    </motion.div>
                    {/* Actions */}
                    <motion.div 
                        className="mt-8 flex items-center gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        variants={{
                            hidden: {opacity: 0, x:-50},
                            visible: {opacity: 1, x:0}
                        }}
                    >
                        {clientData.username === '' ? (
                            <Link to="/signup" className="rounded-lg bg-secondary-500 px-10 py-2 hover:text-white hover:bg-primary-500">Sign Up</Link>
                        ): (
                            <Link to="/shop" className="rounded-lg bg-secondary-500 px-10 py-2 hover:text-white hover:bg-primary-500">Shop</Link>
                        )}
                        <AnchorLink 
                            className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
                            onClick={() => setSelectedPage(SelectedPage.ContactUs)}
                            href={`#${SelectedPage.ContactUs}`}
                        >
                            <p>Learn More</p>
                        </AnchorLink>
                    </motion.div>
                </div>

                {/* Image */}
                <div className="flex basis-3/5 justify-center md:z-10
                    md:ml-40 md:mt-16 md:justify-items-end">
                    <img alt="home-pageGraphic" src={HomePageGraphic} />
                </div>
            </motion.div>

            {/* Sponsors */}
            {isAboveMediumScreens && (
                <div className="h-[150px] w-full bg-primary-100 py-10">
                    <div className="mx-auto flex justify-center">
                        <div className="flex w-3/5 items-center justify-between gap-8">
                            <img alt="nvidia-sponsor" src={SponsorNvidia} width="100px"/>
                            <img alt="intel-sponsor" src={SponsorIntel} width="120px"/>
                            <img alt="google-sponsor" src={SponsorGoogle} width="140px" />
                        </div>
                    </div>
                </div>
            )}
        </section>
  )
}

export default Home