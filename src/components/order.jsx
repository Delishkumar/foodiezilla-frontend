import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('https://foodzilla-backend.onrender.com/api/orders');
      setOrders(res.data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 pt-24">
      <h2 className="text-2xl font-bold mb-4">My Orders 📦</h2>
      {orders.length === 0 ? (
        <p className="text-center text-lg">No orders placed yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">Order #{index + 1}</h3>
                <span className="text-sm text-green-600 font-medium">{order.status}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Date: {new Date(order.date).toLocaleString()}</p>
              <ul className="list-disc pl-5">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} - ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p className="text-right font-semibold mt-2">Total: ₹{order.totalAmount}</p>
              <p className="text-sm text-gray-500 mt-1">Payment: {order.paymentMethod}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
