import Calendar from "./calendar";
import { motion } from "framer-motion";
import Time from "./time/time";
import ServiceSelection from "./serviceselection";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useState } from "react";
import HText from "@/shared/HText";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const workshopData = useSelector((state: RootState) => state.workshopData);
  const clientData = useSelector((state: RootState) => state.clientData);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isBought, setIsBought] = useState(false);
  const [text, setText] = useState<String>("");
  const navigate = useNavigate();

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const makeReservation = async () => {
    if (workshopData.date === "") {
      console.error("Pick date");
      return;
    }
    if (workshopData.time === "") {
      console.error("Pick time");
      return;
    }
    if (workshopData.service === "") {
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
      const response = await fetch(
        `http://localhost:8080/user/workshop/${clientData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newWorkshopData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
    window.location.reload(); // TODO crutch
    setIsBought(true);
  };

  return (
    <section
      id="home"
      className="bg-gray-20 p-20 md:h-full pt-36 flex flex-col"
    >
      <motion.div
        className="sm:flex mx-auto w-5/6 items-center justify-center md:h-5/6 gap-10 mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <Calendar />
        <Time />
        <ServiceSelection />
      </motion.div>
      <motion.div className="sm:flex mx-auto w-5/6 items-center justify-center md:h-5/6 gap-10 mb-10">
        <div>{workshopData.date}</div>
        <div>{workshopData.time}</div>
        <div>{workshopData.service}</div>
      </motion.div>
      {/* Text input for issue description */}
      <motion.div
        className="mt-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <textarea
          className="w-full p-2 text-sm text-gray-700 border rounded-lg focus:outline-none"
          rows={4}
          placeholder="Describe your issue or add additional details here..."
          onChange={handleTextChange}
        />
      </motion.div>
      {/* Submit button */}
      <motion.div
        className="mt-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <button
          type="button"
          onClick={() => setIsPopupVisible(true)}
          className="w-full px-4 py-2 bg-secondary-500 text-white text-sm font-medium rounded hover:bg-primary-500 focus:outline-none focus:bg-blue-700"
        >
          Make a Reservation
        </button>
      </motion.div>
      {isPopupVisible && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="relative p-5 bg-white rounded shadow-lg">
              <span
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setIsPopupVisible(false)}
              >
                &times;
              </span>
              <HText>
                Your <span className="text-primary-500">Order</span> Details
              </HText>
              <div className="pt-2">
                <h6 className="font-bold">Your contact details:</h6>
                <p>
                  {clientData.name}, {clientData.email}, {clientData.phone}
                </p>
                <h6 className="font-bold">Your shipment details:</h6>
                <p>
                  {clientData.address}, {clientData.postalCode},{" "}
                  {clientData.city}
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={makeReservation}
                  className="rounded-lg bg-secondary-500 px-10 py-2 hover:text-white hover:bg-primary-500"
                >
                  Confirm
                </button>
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
                <HText>
                  Thak <span className="text-primary-500">You</span> For
                  Purchase
                </HText>
                <div>
                  <div className="pt-10 flex justify-center gap-10">
                    <button
                      onClick={() => setIsBought(false)}
                      className="rounded-lg bg-secondary-500 px-10 py-2 hover:text-white hover:bg-primary-500"
                    >
                      Workshop
                    </button>
                    <button
                      onClick={() => navigate("/profile")}
                      className="rounded-lg bg-secondary-500 px-10 py-2 hover:text-white hover:bg-primary-500"
                    >
                      Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </section>
  );
};

export default Main;
