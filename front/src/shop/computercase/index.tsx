import HText from '@/shared/HText';
import { SelectedPageShop } from '@/shared/types';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '@/shared/types';
import { useEffect, useState } from 'react';
import { computercaseChange } from '@/state/imagechanger/computerCaseImageSlice';
import ProductCart from './ProductCart';
import { sumComCaseChange } from '@/state/sumchanger/compSumSlice';
import { RootState } from '@/state/store';
import { setorderData } from '@/state/order/orderIdSlice';

type Props = {
    setSelectedPage: (value: SelectedPageShop) => void;
}

const container = {
    hidden: {},
    visible: {
        transition: {staggerChildren: 0.2}
    }
}

const ComputerCases = ({ setSelectedPage }: Props) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const orderData = useSelector((state: RootState) => state.orderData);
    const handleOnClick = (image: string, price: number, prodId: number) => {
        const newOrderData = {
            computercase: prodId, 
            motherboard: orderData.motherboard,  
            gpu: orderData.gpu,   
            cpu: orderData.cpu,            
            ram: orderData.ram,
            memory: orderData.memory,
            powersupply: orderData.powersupply,
            cooler: orderData.cooler,
        }
        dispatch(setorderData(newOrderData));
        dispatch(computercaseChange(image));
        dispatch(sumComCaseChange(price));
    };
    const fetchProducts = async (): Promise<Product[]> => {
        try {
            const response = await fetch('http://localhost:8080/items/get-computer-cases');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const products: Product[] = await response.json();
            return products;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchProducts()
          .then(setProducts)
          .catch((error) => setError(error.message));
      }, []);
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (
    <section id="computercase">
        <motion.div
            className="text-center pt-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            variants={{
                hidden: {opacity: 0, x:-50},
                visible: {opacity: 1, x:0}
            }}
        >
            <HText>
                COMPUTER <span className="text-primary-500">CASES</span>
            </HText>
        </motion.div>
        <motion.div
            
            className="flex justify-center pt-10 px-2"
        >
            <motion.div
                className="grid grid-cols-2 gap-4 md:grid-cols-4"
                onViewportEnter={() => setSelectedPage(SelectedPageShop.ComputerCase)}
            >
                {products.map(products => (
                    <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.5}}
                    variants={container}
                        key={products.name + products.id}
                    >
                        {products.id === 11 ? ('') : (
                            <ProductCart 
                            name={products.name}
                            description={products.description}
                            price={products.price}
                            image={products.image}
                            onClick={() => handleOnClick(products.image, products.price, products.id)}
                            />
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    </section>
  )
}

export default ComputerCases