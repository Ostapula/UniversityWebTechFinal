import { RootState } from "@/state/store";
import { setWorkshopData } from "@/state/workshopchanger/workshopDataSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type DropdownItem = {
    id: number;
    value: string;
};

const ServiceSelection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("Dropdown");
    const workshopData = useSelector((state: RootState) => state.workshopData);
    const dispatch = useDispatch();
    const items: DropdownItem[] = [
        { id: 1, value: 'Computer Repair $100' },
        { id: 2, value: 'Computer Assembly $200' },
        { id: 3, value: 'Configuration Services $75' },
        { id: 4, value: 'Consultancy $50' },
        { id: 5, value: 'Other $100-$200' },
    ];

    const itemClick = (itemText: string) => {
        setText(itemText);
        const newWorkshopData = {
            ...workshopData,
            service: itemText,
        };
        dispatch(setWorkshopData(newWorkshopData));
        setIsOpen(false)
    };

    return (
        <div className="relative">
            Choose service
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center px-4 py-2 bg-secondary-500 text-white rounded focus:outline-none"
            >
                {text}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                    <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
            </button>
            {isOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => itemClick(item.value)}
                        >
                            {item.value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ServiceSelection