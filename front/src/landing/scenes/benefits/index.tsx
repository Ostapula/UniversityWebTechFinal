import HText from '@/shared/HText';
import { BenefitType, SelectedPage } from '@/shared/types';
import { ComputerDesktopIcon, Cog6ToothIcon, UserGroupIcon  } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Benefit from './Benefit';
import BenefitGraph from '@/assets/BenefitGraph.png';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const benefits: Array<BenefitType> = [
    {
      icon: <ComputerDesktopIcon className="h-6 w-6" />,
      title: "Advanced Tech Support",
      description:
        "Our Advanced Tech Support is at the forefront of technological expertise, offering innovative solutions to complex technical challenges in computer systems. Utilizing the latest tools and methodologies, we ensure swift and efficient resolution of your tech issues, keeping you ahead in a rapidly evolving digital world.",
    },
    {
      icon: <Cog6ToothIcon className="h-6 w-6" />,
      title: "Wide Range of Services",
      description:
        "Catering to all your computing needs, our workshop provides a comprehensive range of services, from routine maintenance and software updates to hardware repairs and network troubleshooting. We pride ourselves on being a one-stop solution for all computer-related services, ensuring that whether it's a minor tweak or a major overhaul, your systems are in capable hands.",
    },
    {
      icon: <UserGroupIcon className="h-6 w-6" />,
      title: "Certified Technical Professionals",
      description:
        "Our team of Certified Technical Professionals brings a wealth of knowledge and experience, each member trained to diagnose and repair a variety of computer issues with precision and care. Upholding the highest standards of service, our professionals are not only technically proficient but also committed to providing customer-oriented support and advice, ensuring your complete satisfaction.",
    },
];

const container = {
    hidden: {},
    visible: {
        transition: {staggerChildren: 0.2}
    }
}

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Benefits = ({ setSelectedPage }: Props) => {
    const clientData = useSelector((state: RootState) => state.clientData);
  return (
    <section id="benefits" className="mx-auto min-h-full w-5/6 py-20">
        <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.Benefits)}>
            {/* Header */}
            <motion.div 
                className="md:my-5 md:w-3/5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                    hidden: {opacity: 0, x:-50},
                    visible: {opacity: 1, x:0}
                }}
            >
                <HText>MORE THAN JUST COMPUTER WORKSHOP AND SHOP</HText>
                <p className="my-5 text-sm">We offer top-tier tech equipment, expert technicians, and comprehensive services to effortlessly guide you to your ultimate tech goals. We dedicate genuine care and attention to each and every client.</p>
            </motion.div>

            {/* Benefits */}
            <motion.div 
                className="items-center justify-between gap-8 mt-5 md:flex"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.5}}
                variants={container}
            >
                {benefits.map((benefit: BenefitType) => (
                    <Benefit 
                        key={benefit.title}
                        icon={benefit.icon}
                        title={benefit.title}
                        description={benefit.description}
                        setSelectedPage={setSelectedPage}
                    />
                ))}
            </motion.div>

            {/* Graphics and description */}
            <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
                {/* Graphic */}
                <img 
                    className="mx-auto"
                    alt="benefits-page-graphic"
                    src={BenefitGraph}
                />

                {/* description */}
                <div>
                    {/* Title */}
                    <div className="relative">
                        <div className="before:absolute before:-top-20 before:-left-20 before:z-[-1] before:content-processors">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                                variants={{
                                    hidden: {opacity: 0, x:50},
                                    visible: {opacity: 1, x:0}
                                }}
                            >
                                <HText>
                                    MILLIONS OF <span className="text-primary-500">FIXED</span> COMTUTERS
                                </HText>
                            </motion.div>
                        </div>
                    </div>

                    {/* Description */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        variants={{
                            hidden: {opacity: 0, x:50},
                            visible: {opacity: 1, x:0}
                        }}
                    >
                        <p className="my-5">
                        In the realm of computer repairs, our track record speaks volumes. Having successfully fixed millions of computers, our workshop stands as a beacon of reliability and expertise in the tech support industry. This milestone is not just a number; it's a testament to our unwavering commitment to excellence and customer satisfaction. Each repair, from the simplest software glitch to the most complex hardware malfunction, has been handled with meticulous care and precision.
                        </p>
                        <p className="mb-5">
                        Our journey through millions of repairs has equipped us with an unparalleled depth of knowledge and experience, enabling us to tackle any challenge that comes our way. This achievement reflects our dedication to restoring and enhancing the performance of your computers, ensuring they serve you efficiently in this digital age. Trust us to be the guardians of your digital well-being, as we continue to set the standard for computer repair and maintenance.
                        </p>
                    </motion.div>

                    {/* Button */}
                    <div className="relative mt-16">
                        <div className="before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-gpu">
                            <div className="flex items-center gap-8">
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
                                    <p>Contact Us</p>
                                </AnchorLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    </section>
  )
}

export default Benefits