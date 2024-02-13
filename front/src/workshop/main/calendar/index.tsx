import { RootState } from "@/state/store";
import { setWorkshopData } from "@/state/workshopchanger/workshopDataSlice";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";

const Calendar = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const workshopData = useSelector((state: RootState) => state.workshopData);
    const dispatch = useDispatch();
    
    const onDateChange = (date: Date | null) => {
        if (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const selectedDate = new Date(date);
            selectedDate.setHours(0, 0, 0, 0);

            if (selectedDate < tomorrow) {
                console.log("Can't pick a date earlier than tomorrow");
            } else {
                const dateString = date.toISOString().split('T')[0];
                const newWorkshopData = {
                    ...workshopData,
                    date: dateString,
                };
                console.log(dateString);
                dispatch(setWorkshopData(newWorkshopData));
                setStartDate(date);
            }
        } else {
            console.log("No date selected");
        }
    }

    return (
        <section>
            Choose date
            <div>
                <DatePicker
                    showIcon
                    selected={startDate}
                    onChange={(date) => onDateChange(date)}
                />
            </div>
        </section>
    );
}

export default Calendar