import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Star } from 'lucide-react';
import Navbar from './navbar';
import Footer from './footer';
import axios from 'axios';

import pizza1 from '../assets/pizza1.jpg';
import pizza2 from '../assets/pizza2.avif';
import pizza3 from '../assets/pizza3.avif';
import pizza4 from '../assets/pizza4.avif';
import burger1 from '../assets/burger1.avif';
import burger2 from '../assets/burger2.avif';
import burger3 from '../assets/burger3.avif';
import burger4 from '../assets/burger4.avif';
import biryani1 from '../assets/biryani1.avif';
import biryani2 from '../assets/briyani2.avif';
import biryani3 from '../assets/biryani3.avif';
import biryani4 from '../assets/biryani4.avif';

const allProducts = [
  { name: 'Margherita Pizza', category: 'pizza', price: 249, rating: 4.5, image: pizza1, description: 'Classic cheese pizza with fresh basil', stock: 15 },
  { name: 'Farmhouse Pizza', category: 'pizza', price: 349, rating: 4.7, image: pizza2, description: 'Loaded with veggies, cheese and herbs.', stock: 10 },
  { name: 'Cheese Burst Pizza', category: 'pizza', price: 299, rating: 4.6, image: pizza3, description: 'Extra cheese and crispy base.', stock: 12 },
  { name: 'Pepperoni Pizza', category: 'pizza', price: 399, rating: 4.8, image: pizza4, description: 'Pepperoni loaded pizza.', stock: 8 },
  { name: 'Veg Burger', category: 'burger', price: 149, rating: 4.3, image: burger1, description: 'Crispy veg patty with mayo and lettuce.', stock: 20 },
  { name: 'Chicken Burger', category: 'burger', price: 179, rating: 4.6, image: burger2, description: 'Grilled chicken burger with cheese.', stock: 18 },
  { name: 'Cheese Burger', category: 'burger', price: 159, rating: 4.4, image: burger3, description: 'Double cheese with veggie patty.', stock: 15 },
  { name: 'Spicy Chicken Burger', category: 'burger', price: 189, rating: 4.7, image: burger4, description: 'Hot and spicy grilled chicken.', stock: 10 },
  { name: 'Hyderabadi Biryani', category: 'biryani', price: 299, rating: 4.8, image: biryani1, description: 'Authentic Hyderabadi Dum Biryani.', stock: 12 },
  { name: 'Veg Biryani', category: 'biryani', price: 249, rating: 4.4, image: biryani2, description: 'Veg biryani with basmati rice.', stock: 14 },
  { name: 'Chicken Biryani', category: 'biryani', price: 299, rating: 4.7, image: biryani3, description: 'Spicy chicken dum biryani.', stock: 13 },
  { name: 'Paneer Biryani', category: 'biryani', price: 269, rating: 4.5, image: biryani4, description: 'Paneer biryani with mint flavor.', stock: 11 }
];

const MenuPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const addToCart = async (item) => {
    try {
       axios.post('https://foodzilla-backend.onrender.com/api/cart', item);
      toast.success(`${item.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  const filteredItems = allProducts.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-green-600 mb-6">Menu</h2>

        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div key={index} className="border rounded-xl p-4 shadow-lg bg-white">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded" />
              <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-green-700">₹{item.price}</span>
                <span className="flex items-center text-yellow-500">
                  <Star size={18} fill="currentColor" className="mr-1" />{item.rating}
                </span>
              </div>
              <button
                onClick={() => addToCart(item)}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuPage;

