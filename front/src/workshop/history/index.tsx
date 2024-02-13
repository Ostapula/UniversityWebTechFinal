import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SelectedPageWorkshop, WorkshopOrder } from "@/shared/types";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { motion } from "framer-motion";
import HistoryDetail from "./HistoryDetail";

type Props = {
  setSelectedPage: (value: SelectedPageWorkshop) => void;
};

const History = ({ setSelectedPage }: Props) => {
  const clientData = useSelector((state: RootState) => state.clientData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [workshopOrders, setWorkshopOrders] = useState<WorkshopOrder[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      fetchOrders(token);
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const fetchOrders = async (token: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/user/get-user-workshop/${clientData.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setWorkshopOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleOnClick = async (id: number) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/signin");
    }
    try {
      const response = await fetch(
        `http://localhost:8080/user/cancel-workshop/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="history" className="p-4">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPageWorkshop.History)}
      >
        History:
      </motion.div>
      {workshopOrders.map((workshop) => (
        <div key={workshop.id}>
          <HistoryDetail
            historyItem={workshop}
            onClick={() => handleOnClick(workshop.id)}
            btnName={"Cancel"}
          />
        </div>
      ))}
    </section>
  );
};

export default History;
