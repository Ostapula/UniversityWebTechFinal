import Calendar from './calendar'
import { motion } from 'framer-motion'
import Time from './time/time'
import ServiceSelection from './serviceselection'
import { useSelector } from 'react-redux'
import { RootState } from "@/state/store";
import { useState } from 'react'

const Main = () => {
    const workshopData = useSelector((state: RootState) => state.workshopData);
    const clientData = useSelector((state: RootState) => state.clientData);
    const [text, setText] = useState<String>("");

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const makeReservation = async () => {
        if (workshopData.date === '') {
            console.error("Pick date");
            return;
        }
        if (workshopData.time === '') {
            console.error("Pick time");
            return;
        }
        if (workshopData.service === '') {
            console.error("Pick service");
            return;
        }
        const newWorkshopData = {
            date: workshopData.date,
            time: workshopData.time,
            service: workshopData.service,
            description: text,
        };

        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(`http://localhost:8080/user/workshop/${clientData.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newWorkshopData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <section 
            id="home"
            className="bg-gray-20 p-20 md:h-full pt-36 flex flex-col"
        >
            <motion.div
                className="sm:flex mx-auto w-5/6 items-center justify-center md:h-5/6 gap-10 mb-10"
            >
                <Calendar />
                <Time />
                <ServiceSelection />
            </motion.div>
            <motion.div
                className="sm:flex mx-auto w-5/6 items-center justify-center md:h-5/6 gap-10 mb-10"
            >
                <div>{workshopData.date}</div>
                <div>{workshopData.time}</div>
                <div>{workshopData.service}</div>
            </motion.div>
            {/* Text input for issue description */}
            <div className="mt-4">
                <textarea
                    className="w-full p-2 text-sm text-gray-700 border rounded-lg focus:outline-none"
                    rows={4}
                    placeholder="Describe your issue or add additional details here..."
                    onChange={handleTextChange}
                />
            </div>
            {/* Submit button */}
            <div className="mt-2">
                <button
                    type="button"
                    onClick={makeReservation}
                    className="w-full px-4 py-2 bg-secondary-500 text-white text-sm font-medium rounded hover:bg-primary-500 focus:outline-none focus:bg-blue-700"
                >
                    Make a Reservation
                </button>
            </div>
        </section>
    )
}

export default Main