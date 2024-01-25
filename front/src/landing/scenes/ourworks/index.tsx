import { SelectedPage } from '@/shared/types';
import image1 from '@/assets/image1.png';
import image2 from '@/assets/image2.png';
import image3 from '@/assets/image3.png';
import image4 from '@/assets/image4.png';
import image5 from '@/assets/image5.png';
import image6 from '@/assets/image6.png';
import { motion } from 'framer-motion';
import HText from '@/shared/HText';
import { WorkType } from '@/shared/types';
import Works from './Works';

const works: Array<WorkType> = [
    {
      name: "Hardware Repair Workshops",
      description:
        "Explore the fundamentals of hardware repair. Learn how to diagnose and fix common issues with hands-on experience. Ideal for both beginners and experienced users seeking practical skills.",
      image: image1,
    },
    {
      name: "Software Troubleshooting Seminars",
      image: image2,
    },
    {
      name: "Cybersecurity Basics",
      description:
        "Understand the essentials of cybersecurity. Gain knowledge about protecting your systems against digital threats. Perfect for individuals and businesses looking to enhance their digital security.",
      image: image3,
    },
    {
      name: "Networking and Connectivity Classes",
      description:
        "Delve into the world of networking. Learn about setting up and maintaining reliable connections, troubleshooting network issues, and ensuring optimal performance.",
      image: image4,
    },
    {
      name: "Custom PC Building Courses",
      image: image5,
    },
    {
      name: "Software Development Bootcamps",
      description:
        "Immerse yourself in the exciting field of software development. From coding basics to advanced programming, these classes are designed to elevate your software skills.",
      image: image6,
    },
];
  

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const OurWorks = ({setSelectedPage}: Props) => {
  return (
    <section id="ourworks" className="w-full bg-primary-100 py-40">
        <motion.div
            onViewportEnter={() => setSelectedPage(SelectedPage.OurWorks)}
        >
            <motion.div
                className="mx-auto w-5/6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                    hidden: {opacity: 0, x:-50},
                    visible: {opacity: 1, x:0}
                }}
            >
                <div className="md:w-3/5">
                    <HText>
                        OUR WORKS
                    </HText>
                    <p className="py-5">
                    Our website's image gallery showcases the breadth and depth of our computer repair expertise. Each picture highlights the skill and precision we bring to every project, from complex repairs to routine maintenance. These images are a testament to the quality and care we invest in each task, underlining our commitment to excellence in tech support.
                    </p>
                </div>
                {/* 353 */}
            </motion.div>
            <div className="mt-10 h-[450px] w-full overflow-x-auto overflow-y-hidden">
                <ul className="w-[2800px] whitespace-nowrap">
                    {works.map((item: WorkType, index) => (
                        <Works 
                            key={`${item.name}-${index}`}
                            name={item.name}
                            description={item.description}
                            image={item.image}
                        />
                    ))}
                </ul>
            </div>
        </motion.div>
    </section>
  )
}

export default OurWorks