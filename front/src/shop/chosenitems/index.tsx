import { ComputerParts, SelectedPageShop } from '@/shared/types';
import { motion } from 'framer-motion';
import computerCase from "@/assets/computer-case.png";
import motherboard from "@/assets/motherboard.png";
import gpu from "@/assets/graphics-card.png";
import cpu from "@/assets/processor.png";
import ram from "@/assets/memoryram.png";
import memory from "@/assets/hard-disk.png";
import powerSupply from "@/assets/power-supply.png";
import cooler from "@/assets/cooler.png";
import Items from './Items';
import HText from '@/shared/HText';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/state/store";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { computercaseChange } from '@/state/imagechanger/computerCaseImageSlice';
import { motherboardChange } from '@/state/imagechanger/motherboardImageSlice';
import { gpuChange } from '@/state/imagechanger/gpuImageSlice';
import { cpuChange } from '@/state/imagechanger/cpuImageSlice';
import { ramChange } from '@/state/imagechanger/ramImageSlice';
import { memoryChange } from '@/state/imagechanger/memoryImageSlice';
import { powersupplyChange } from '@/state/imagechanger/powersupplyImageSlice';
import { coolerChange } from '@/state/imagechanger/coolerImageSlice';
import { sumComCaseChange } from '@/state/sumchanger/compSumSlice';
import { motherboardCaseChange } from '@/state/sumchanger/motherboardSumSlice';
import { gpuCaseChange } from '@/state/sumchanger/gpuSumSlice';
import { cpuCaseChange } from '@/state/sumchanger/cpuSumSlice';
import { ramCaseChange } from '@/state/sumchanger/ramSumSlice';
import { memoryCaseChange } from '@/state/sumchanger/memorySumSlice';
import { powersupplyCaseChange } from '@/state/sumchanger/powersupplySumSlice';
import { coolerCaseChange } from '@/state/sumchanger/coolerSumSlice';
import { setorderData } from '@/state/order/orderIdSlice';

const computerItems: Array<ComputerParts> = [
    {
        image: computerCase,
        itemPage: SelectedPageShop.ComputerCase,
    },
    {
        image: motherboard,
        itemPage: SelectedPageShop.Motherboard,
    },
    {
        image: gpu,
        itemPage: SelectedPageShop.GPU,
    },
    {
        image: cpu,
        itemPage: SelectedPageShop.CPU,
    },
    {
        image: ram,
        itemPage: SelectedPageShop.RAM,
    },
    {
        image: memory,
        itemPage: SelectedPageShop.Memory,
    },
    {
        image: powerSupply,
        itemPage: SelectedPageShop.PowerSupply,
    },
    {
        image: cooler,
        itemPage: SelectedPageShop.Cooling,
    }
]

const container = {
    hidden: {},
    visible: {
        transition: {staggerChildren: 0.2}
    }
}

type Props = {
    setSelectedPage: (value: SelectedPageShop) => void;
}

const ChosenItems = ({setSelectedPage }: Props) => {
    const computerCaseChange = useSelector((state: RootState) => state.computercasechanger.value);
    const motherboardChanger = useSelector((state: RootState) => state.motherboardchanger.value);
    const gpuChanger = useSelector((state: RootState) => state.gpuchanger.value);
    const cpuChanger = useSelector((state: RootState) => state.cpuchanger.value);
    const ramChanger = useSelector((state: RootState) => state.ramchanger.value);
    const memoryChanger = useSelector((state: RootState) => state.memorychanger.value);
    const powersupplyChanger = useSelector((state: RootState) => state.powersupplychanger.value);
    const coolerChanger = useSelector((state: RootState) => state.coolerchanger.value);
    const compSumChange = useSelector((state: RootState) => state.sumchanger.value);
    const motherSumChange = useSelector((state: RootState) => state.mothersumchanger.value);
    const gpuSumChange = useSelector((state: RootState) => state.gpusumchanger.value);
    const cpuSumChange = useSelector((state: RootState) => state.cpusumchanger.value);
    const ramSumChange = useSelector((state: RootState) => state.ramsumchanger.value);
    const memorySumChange = useSelector((state: RootState) => state.memorysumchanger.value);
    const psSumChange = useSelector((state: RootState) => state.powersupplysumchanger.value);
    const coolerSumChange = useSelector((state: RootState) => state.coolersumchanger.value);
    const clientData = useSelector((state: RootState) => state.clientData);
    const orderData = useSelector((state: RootState) => state.orderData);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isBought, setIsBought] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const determineImage = (index: number):string => {
        switch (index) {
            case 0:
                return computerCaseChange;
            case 1:
                return motherboardChanger;
            case 2:
                return gpuChanger;
            case 3:
                return cpuChanger;            
            case 4:
                return ramChanger;
            case 5:
                return memoryChanger;
            case 6:
                return powersupplyChanger;
            case 7:
                return coolerChanger;
            default:
                return ''; 
        }
    };

    const clearChosenItems = () => {
        dispatch(computercaseChange(computerCase));
        dispatch(motherboardChange(motherboard));
        dispatch(gpuChange(gpu));
        dispatch(cpuChange(cpu));
        dispatch(ramChange(ram));
        dispatch(memoryChange(memory));
        dispatch(powersupplyChange(powerSupply));
        dispatch(coolerChange(cooler));
        dispatch(sumComCaseChange(0));
        dispatch(motherboardCaseChange(0))
        dispatch(gpuCaseChange(0));
        dispatch(cpuCaseChange(0));
        dispatch(ramCaseChange(0));
        dispatch(memoryCaseChange(0));
        dispatch(powersupplyCaseChange(0));
        dispatch(coolerCaseChange(0));
    }

    const validateToken = (token: string) => {
        fetch('http://localhost:8080/auth/validate-token', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Token validation failed');
            }
            return response.json();
        })
        .then(data => {
            if (!data.isValid || !data.isAdmin) {
                navigate('/signin');
            }
        })
        .catch(() => {
            navigate('/signin'); 
        });
    };

    const handleOnClick = () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/signin');
        }else {
            validateToken(token);
        }
        console.log(orderData.computercase);
        console.log(orderData.motherboard);
        console.log(orderData.gpu);
        console.log(orderData.cpu);
        console.log(orderData.ram);
        console.log(orderData.memory);
        console.log(orderData.powersupply);
        console.log(orderData.cooler);
        setIsPopupVisible(true);
    };

    const buyConfirm = async () => {
        
        const newOrderData = {
            computerCase: orderData.computercase,
            motherboard: orderData.motherboard,
            gpu: orderData.gpu,
            cpu: orderData.cpu,
            ram: orderData.ram,
            hardMemory: orderData.memory,
            powerSupply: orderData.powersupply,
            cooler: orderData.cooler,
            sum: compSumChange + motherSumChange + gpuSumChange + cpuSumChange + ramSumChange + memorySumChange + psSumChange + coolerSumChange
        };
        if (newOrderData.sum === 0) {
            return;
        }
        setIsPopupVisible(false);
        setIsBought(true);
        const token = localStorage.getItem("jwtToken");
        console.log(newOrderData);
        try {
            const response = await fetch(`http://localhost:8080/user/order/${clientData.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newOrderData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
        const newOrderData11 = {
            computercase: 11, 
            motherboard: 11,  
            gpu: 11,   
            cpu: 11,            
            ram: 11,
            memory: 11,
            powersupply: 11,
            cooler: 11,
        };
        dispatch(setorderData(newOrderData11));
        clearChosenItems();
    };

    return (
    <section 
        id="home"
        className="gap-16 py-20"
    >
        <motion.div
            className="text-center pt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
                hidden: {opacity: 0, x:-50},
                visible: {opacity: 1, x:0}
            }}
        >
            <HText>
                COMPUTER <span className="text-primary-500">SHOP</span> CART
            </HText>
        </motion.div>
        <motion.div
            onViewportEnter={() => setSelectedPage(SelectedPageShop.Home)}
            className="flex justify-center"
        >
            <motion.div
                className="grid grid-cols-2 gap-4 md:grid-cols-4"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.5}}
                variants={container}
            >
                {computerItems.map((items: ComputerParts, index) => 
                (
                    <Items 
                        key={index}
                        image={determineImage(index)}
                        itemPage={items.itemPage}
                        setSelectedPage={setSelectedPage}
                    />
                ))}
            </motion.div>
        </motion.div>
        <motion.div
            className="pt-10 flex justify-center gap-10 px-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
                hidden: {opacity: 0, x:-50},
                visible: {opacity: 1, x:0}
            }}
        >
            <HText>
                SUM: <span className="text-primary-500">{compSumChange + motherSumChange + gpuSumChange + cpuSumChange + ramSumChange + memorySumChange + psSumChange + coolerSumChange}$</span> 
            </HText>
            <button onClick={clearChosenItems} className="rounded-lg bg-secondary-500 xs:px-8 px-3 py-2 hover:text-white hover:bg-primary-500">Clear All</button>
            <button onClick={handleOnClick} className="rounded-lg bg-secondary-500 xs:px-10 px-3 py-2 hover:text-white hover:bg-primary-500">BUY</button>
            {isPopupVisible && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                        <div className="relative p-5 bg-white rounded shadow-lg">
                            <span 
                                className="absolute top-2 right-2 cursor-pointer"
                                onClick={() => setIsPopupVisible(false)}
                            >
                                &times; 
                            </span>
                            <HText>Your <span className="text-primary-500">Order</span> Details</HText>
                            <div className="pt-2">
                                <h6 className="font-bold">Your contact details:</h6>
                                <p>{clientData.name}, {clientData.email}, {clientData.phone}</p>
                                <h6 className="font-bold">Your shipment details:</h6>
                                <p>{clientData.address}, {clientData.postalCode}, {clientData.city}</p>
                            </div>
                            <div className="pt-2">
                                <button onClick={buyConfirm} className="rounded-lg bg-secondary-500 px-10 py-2 hover:text-white hover:bg-primary-500">Confirm</button>
                            </div>
                        </div>
                    </div>
                )}
                {isBought && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                        <div className="relative p-5 bg-white rounded shadow-lg">
                            <span 
                                className="absolute top-2 right-2 cursor-pointer"
                                onClick={() => setIsBought(false)}
                            >
                                &times; 
                            </span>
                            <div>
                                <HText>Thak <span className="text-primary-500">You</span> For Purchase</HText>
                                <div>
                                    <div className="pt-10 flex justify-center gap-10">
                                        <button onClick={() => setIsBought(false)} className="rounded-lg bg-secondary-500 px-10 py-2 hover:text-white hover:bg-primary-500">Shop</button>
                                        <button onClick={() => navigate("/profile")} className="rounded-lg bg-secondary-500 px-10 py-2 hover:text-white hover:bg-primary-500">Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isBought && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                        <div className="relative p-5 bg-white rounded shadow-lg">
                            <span 
                                className="absolute top-2 right-2 cursor-pointer"
                                onClick={() => setIsBought(false)}
                            >
                                &times; 
                            </span>
                            <div>
                                <HText>Thak <span className="text-primary-500">You</span> For Purchase</HText>
                                <div>
                                    <div className="pt-10 flex justify-center gap-10">
                                        <button onClick={() => setIsBought(false)} className="rounded-lg bg-secondary-500 px-10 py-2 hover:text-white hover:bg-primary-500">Shop</button>
                                        <button onClick={() => navigate("/profile")} className="rounded-lg bg-secondary-500 px-10 py-2 hover:text-white hover:bg-primary-500">Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </motion.div>
    </section>
  )
}

export default ChosenItems