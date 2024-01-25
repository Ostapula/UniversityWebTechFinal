import OrderDetail from "@/admin/OrderDetail"
import HText from "@/shared/HText";
import { Order } from "@/shared/types";
import { RootState } from "@/state/store";
import { setClientData } from "@/state/userschanger/clientDataSlice";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

interface UpdateData {
    username: string;
    name: string;
    email: string;
    address: string;
    postalcode: string;
    city: string;
    phone: string;
}

const Profile = () => {
    const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;
    const clientData = useSelector((state: RootState) => state.clientData);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () => {
        localStorage.clear();
        const ClientData = {
            id: 0,
            username: '',
            name: '',
            email: '',
            address: '',
            postalCode: '',
            city: '',
            phone: '',
        };
        dispatch(setClientData(ClientData));
        navigate('/signin');
    };

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setIsLoading(false);
            return;
        }
        fetch('http://localhost:8080/auth/validate-token', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                logOut();
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);


    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            fetchOrders(token);
        } else {
            navigate('/signin');
        }
    }, [navigate]);
    
    const fetchOrders = async (token: string) => {
        try {
            const response = await fetch(`http://localhost:8080/user/get-user-orders/${clientData.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<UpdateData>();
    
    const onSubmit = (data: UpdateData) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            fetchOrders(token);
        } else {
            navigate('/signin');
        }
        if (data.username === '') {
            data.username = clientData.username;
        }
        if (data.name === '') {
            data.name = clientData.name;
        }
        if (data.email === '') {
            data.email = clientData.email;
        }
        if (data.address === '') {
            data.address = clientData.address;
        }
        if (data.postalcode === '') {
            data.postalcode = clientData.postalCode;
        }
        if (data.city === '') {
            data.city = clientData.city;
        }
        if (data.phone === '') {
            data.phone = clientData.phone;
        }
        fetch(`http://localhost:8080/user/change-user-data/${clientData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data),
        })
        .then(response => {
          if (!response.ok) {
            console.log(data);
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
          navigate('/profile');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }


  return (
    <div className="p-4">
        <div className="flex sm:gap-40 xs:gap-10 justify-center pb-10">
            <Link to={"/shop"}><h1 className="text-sm font-bold text-primary-500 underline hover:text-secondary-500 pt-3">Back to Shop</h1></Link>
            <h1 className="text-2xl font-bold">Profile page: {clientData.username} </h1>
            <button onClick={logOut} className="rounded-lg bg-secondary-500 xs:px-10 px-3 py-2 hover:text-white hover:bg-primary-500">Log out</button>
        </div>
        <motion.div
            className="mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
                hidden: {opacity: 0, x:-50},
                visible: {opacity: 1, x:0}
        }}
        >
        <div className="flex justify-center">
            <HText>
                <span className="text-primary-500">CHANGE</span> YOU INFORMATION
            </HText>
        </div>
        </motion.div>
            <div className="flex justify-center">
                <motion.div
                    className="mt-10 basis-3/5 md:mt-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    variants={{
                      hidden: {opacity: 0, y:50},
                      visible: {opacity: 1, y:0}
                    }}
                >
                <form
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input 
                    className={inputStyles}
                    type="text"
                    placeholder={clientData.username}
                    {...register("username", {
                      required: false,
                      maxLength: 100
                    })}
                  />
                  {errors.username && (
                    <p className="mt-1 text-primary-500">
                      {errors.username.type === "required" && "This field is required."}
                      {errors.username.type === "maxLength" && "Max length is 100 characters."}
                    </p>
                  )}
                  <input 
                    className={inputStyles}
                    type="text"
                    placeholder={clientData.name}
                    {...register("name", {
                      required: false,
                      maxLength: 100
                    })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-primary-500">
                      {errors.name.type === "required" && "This field is required."}
                      {errors.name.type === "maxLength" && "Max length is 100 characters."}
                    </p>
                  )}

                  <input 
                    className={inputStyles}
                    type="text"
                    placeholder={clientData.email}
                    {...register("email", {
                      required: false,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-primary-500">
                      {errors.email.type === "required" && "This field is required."}
                      {errors.email.type === "pattern" && "Invalid email address."}
                    </p>
                  )}
                  <input 
                      className={inputStyles}
                      type="text"
                      placeholder={clientData.address}
                      {...register("address", {
                        required: false,
                        maxLength: 50
                      })}
                  />
                  {errors.address && (
                    <p className="mt-1 text-primary-500">
                      {errors.address.type === "required" && "This field is required."}
                      {errors.address.type === "maxLength" && "Max length is 50 characters."}
                    </p>
                  )}

                  <input 
                      className={inputStyles}
                      type="text"
                      placeholder={clientData.postalCode}
                      {...register("postalcode", {
                        required: false,
                        maxLength: 50
                      })}
                  />
                  {errors.postalcode && (
                    <p className="mt-1 text-primary-500">
                      {errors.postalcode.type === "required" && "This field is required."}
                      {errors.postalcode.type === "maxLength" && "Max length is 50 characters."}
                    </p>
                  )}

                  <input 
                    className={inputStyles}
                    type="text"
                    placeholder={clientData.city}
                    {...register("city", {
                      required: false,
                      maxLength: 50
                    })}
                  />
                  {errors.city && (
                    <p className="mt-1 text-primary-500">
                      {errors.city.type === "required" && "This field is required."}
                      {errors.city.type === "maxLength" && "Max length is 50 characters."}
                    </p>
                  )}

                  <input 
                      className={inputStyles}
                      type="text"
                      placeholder={clientData.phone}
                      {...register("phone", {
                        required: false,
                        maxLength: 15
                      })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-primary-500">
                      {errors.phone.type === "required" && "This field is required."}
                      {errors.phone.type === "maxLength" && "Max length is 15 characters."}
                    </p>
                  )}

                  <button 
                      type="submit"
                      className="mt-5 rounded-lg bg-secondary-500 xs:px-20 py-3 transition duration-500 hover:text-white hover:bg-primary-500 px-10"
                  >
                      CONFIRM
                  </button>
                
                </form>            
            </motion.div>
        </div>
        <div>You order history:</div>
        {orders.map(order => (
            <div key={order.id} className="mb-6 p-4 border rounded-md shadow-sm">
                <h2 className="text-lg font-bold mb-2">{`Order ID: ${order.id}`}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <OrderDetail title="Case" item={order.computerCase} />
                    <OrderDetail title="Motherboard" item={order.motherboard} />
                    <OrderDetail title="GPU" item={order.gpu} />
                    <OrderDetail title="CPU" item={order.cpu} />
                    <OrderDetail title="RAM" item={order.ram} />
                    <OrderDetail title="Storage" item={order.hardMemory} />
                    <OrderDetail title="Power Supply" item={order.powerSupply} />
                    <OrderDetail title="Cooler" item={order.cooler} />
                </div>
                <p className="text-sm text-gray-600 mt-2">{`Order Date: ${order.date.slice(0, 10)}`}</p>
                <p className="font-semibold">{`Total: $${order.sum.toFixed(2)}`}</p>
            </div>
        ))}
    </div>
  )
}

export default Profile