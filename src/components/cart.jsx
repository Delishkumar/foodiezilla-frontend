import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart');
      const itemsWithCount = res.data.map(item => ({ ...item, quantity: 1 }));
      setCartItems(itemsWithCount);
    } catch (error) {
      toast.error('Failed to fetch cart items');
    }
  };

  const updateQuantity = (index, amount) => {
    const newCart = [...cartItems];
    newCart[index].quantity += amount;
    if (newCart[index].quantity < 1) newCart[index].quantity = 1;
    setCartItems(newCart);
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      toast.success('Item removed');
      setCartItems(cartItems.filter(item => item._id !== id));
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleCashOnDelivery = async () => {
    const totalAmount = getTotal();
    const orderData = {
      items: cartItems,
      totalAmount,
      paymentMethod: 'Cash on Delivery',
      status: 'Placed',
      date: new Date().toISOString(),
    };

    try {
      await axios.post('https://foodzilla-backend.onrender.com/api/orders', orderData);
      toast.success('Order placed successfully');
      setCartItems([]); // clear cart
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 pt-24">
      <h2 className="text-2xl font-bold mb-4">Your Cart 🛒</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={item._id} className="flex items-center justify-between border p-4 rounded-lg shadow-md">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1 ml-4">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
                <div className="flex items-center mt-2">
                  <button onClick={() => updateQuantity(index, -1)} className="px-2 text-lg">-</button>
                  <span className="px-3">{item.quantity}</span>
                  <button onClick={() => updateQuantity(index, 1)} className="px-2 text-lg">+</button>
                </div>
              </div>
              <button onClick={() => removeItem(item._id)} className="text-red-600">
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-xl font-bold">Total: ₹{getTotal()}</h3>
            <button onClick={handleCashOnDelivery} className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg">
              Place Order (Cash on Delivery)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

