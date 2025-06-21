import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Home, Utensils, Phone, ClipboardList } from 'lucide-react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import app from './firebase';
import axios from 'axios';

const auth = getAuth(app);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await axios.get('https://foodzilla-backend.onrender.com/api/cart');
        setCartCount(res.data.length);
      } catch (err) {
        console.error('Failed to fetch cart count:', err);
      }
    };
    fetchCartCount();
  }, [cartCount]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="inline mr-1" size={18} /> },
    { name: 'Menu', path: '/menu', icon: <Utensils className="inline mr-1" size={18} /> },
    {
      name: 'Cart',
      path: '/cart',
      icon: (
        <div className="relative inline">
          <ShoppingCart className="inline mr-1" size={18} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
              {cartCount}
            </span>
          )}
        </div>
      )
    },
    { name: 'Orders', path: '/order', icon: <ClipboardList className="inline mr-1" size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Phone className="inline mr-1" size={18} /> },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-600 to-lime-500 tracking-wide">
          foodieZilla
        </h1>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <ul className={`md:flex gap-6 text-gray-700 font-medium ${menuOpen ? 'block' : 'hidden'} md:block`}>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'text-green-600 font-semibold' : 'hover:text-green-500'
                }
              >
                {item.icon} {item.name}
              </NavLink>
            </li>
          ))}

          {user ? (
            <>
              <li className="text-green-600">{user.email}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/login"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
