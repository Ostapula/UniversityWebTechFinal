import { Order } from '@/shared/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderDetail from './OrderDetail';

const Admin = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/signin');
        } else {
            validateToken(token);
        }
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            fetchOrders(token);
        }
    }, []);

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
            } else {
                setIsLoading(false); 
            }
        })
        .catch(() => {
            navigate('/signin'); 
        });
    };

    const fetchOrders = async (token: string) => {
        try {
            const response = await fetch('http://localhost:8080/admin/get-all-orders', {
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
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
    );
};


export default Admin;
