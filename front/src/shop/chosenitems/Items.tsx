import { SelectedPageShop } from '@/shared/types';
import { motion } from 'framer-motion';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const childVariant = {
    hidden: {opacity: 0, scale: 0.9},
    visible: {opacity: 1, scale: 1}
}

type Props = {
    image: string;
    itemPage: SelectedPageShop;
    setSelectedPage: (value: SelectedPageShop) => void;
}

const Items = ({ image, itemPage, setSelectedPage }: Props) => {
  return (
    <AnchorLink 
        onClick={() => setSelectedPage(itemPage)}
        href={`#${itemPage}`}
    >
        <motion.div 
            className="p-6 mt-2 rounded-md border-2 border-gray-100 bg-white h-[100px] w-[100px] xs:h-[200px] xs:w-[200px] md:h-[250px] md:w-[250px]"
            variants={childVariant}
        >   
        
            <div >
                <div className="mb-4 flex justify-center"> 
                    <img alt={`${image}`} src={image} className="w-[60px] xs:w-[150px] md:w-[200px]" />
                </div>
            </div>
        </motion.div>
    </AnchorLink>
        
  )
}

export default Items