import { WorkshopOrder } from "@/shared/types";

type Props = {
    historyItem: WorkshopOrder;
    onClick: () => void;
    btnName: string;
}

const HistoryDetail = ({historyItem, onClick, btnName}: Props) => {
    return (
        <div className="mb-6 p-4 border rounded-md shadow-s text-center">
            <h3 className="text-lg font-bold mb-2">Reservation ID and Creation Time: {historyItem.id} {historyItem.localDateTime.slice(0, 10)} {historyItem.localDateTime.slice(11, 19)}</h3>
            <p>Reservation date and time: {historyItem.date} {historyItem.time}</p>
            <p>Service and price: {historyItem.service} </p>
            <p>Description: {historyItem.description} </p>
            <p>Status: {historyItem.done ? (<span className="text-green-600">Completed</span>) : ("Wait for the date...")}</p>
            {historyItem.done ? ("") : (    
                <button 
                    onClick={onClick} 
                    className="text-white bg-secondary-500 hover:bg-primary-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm xs:px-5 xs:py-2.5 px-2 py-1.5 m-1 text-center"
                >
                    {btnName}
                </button>
            )}
        </div>
    )
}

export default HistoryDetail