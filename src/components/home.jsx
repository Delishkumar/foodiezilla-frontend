import { Link } from 'react-router-dom';
import pizza from '../assets/pizza.webp'
import biriyani from '../assets/briyanihome.webp'
import burger from '../assets/burgerhome.avif'
import Footer from './footer';


export default function HomePage() {
  return (
    <section>
    <div className="pt-20 min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-600 mb-6">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-600 to-lime-500">foodieZilla</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Discover delicious meals, fast delivery, and unbeatable deals right at your fingertips.
        </p>
        <Link to="/menu">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300">
            Order Now
          </button>
        </Link>
      </div>

      {/* Featured Images or Categories */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition duration-300">
          <img src={burger} alt="Burger" className="w-full h-60 object-cover" />
          <h3 className="text-center text-xl font-semibold py-4">Burgers</h3>
        </div>
        <div className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition duration-300">
          <img src={pizza} alt="Pizza" className="w-full h-60 object-cover" />
          <h3 className="text-center text-xl font-semibold py-4">Pizza</h3>
        </div>
        <div className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition duration-300">
          <img src={biriyani} alt="Biryani" className="w-full h-60 object-cover" />
          <h3 className="text-center text-xl font-semibold py-4">Biryani</h3>
        </div>
      </div>
    </div>

    <Footer/>
    </section>
  );
}
