import { RootState } from '@/state/store';
import { setWorkshopData } from '@/state/workshopchanger/workshopDataSlice';
import { useState } from 'react'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';

const Time = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const workshopData = useSelector((state: RootState) => state.workshopData);
    const dispatch = useDispatch();

    const onTimeChange = (date: Date | null) => {
        if (date) {
            const timeString = date.toLocaleTimeString('en-US', {
                timeZone: 'CET',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            const newWorkshopData = {
                ...workshopData,
                time: timeString,
            };
            console.log(timeString);
            dispatch(setWorkshopData(newWorkshopData));
            setStartDate(date);
        } else {
            console.log("No date selected");
        }
    }

    return (
        <section>
            Choose time
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => onTimeChange(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                />
            </div>
        </section>
    );
}

export default Time