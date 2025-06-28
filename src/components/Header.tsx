import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, MapPin, Phone, Car, Heart } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-red-800 via-red-700 to-orange-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm text-orange-100 border-b border-red-600">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 hover-scale">
              <MapPin className="h-4 w-4" />
              <span>123 Temple Street, Sacred City</span>
            </div>
            <div className="flex items-center space-x-2 hover-scale">
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 hover-scale">
            <Calendar className="h-4 w-4" />
            <span>Open: 5:00 AM - 10:00 PM</span>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3 hover-scale">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-custom">
              <span className="text-2xl">🕉</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Sri Maha Temple</h1>
              <p className="text-orange-200 text-sm">Divine Blessings Await</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all duration-300 hover-lift ${
                isActive('/') 
                  ? 'bg-white text-red-800 shadow-lg animate-glow' 
                  : 'text-white hover:bg-red-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/booking"
              className={`px-4 py-2 rounded-lg transition-all duration-300 hover-lift ${
                isActive('/booking') 
                  ? 'bg-white text-red-800 shadow-lg animate-glow' 
                  : 'text-white hover:bg-red-600'
              }`}
            >
              Book Darshan
            </Link>
            <Link
              to="/vehicle-booking"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover-lift ${
                isActive('/vehicle-booking') 
                  ? 'bg-white text-red-800 shadow-lg animate-glow' 
                  : 'text-white hover:bg-red-600'
              }`}
            >
              <Car className="h-4 w-4" />
              <span>Vehicle Pooja</span>
            </Link>
            <Link
              to="/donation"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover-lift ${
                isActive('/donation') 
                  ? 'bg-white text-red-800 shadow-lg animate-glow' 
                  : 'text-white hover:bg-red-600'
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>Donate</span>
            </Link>
            <Link
              to="/admin"
              className={`px-4 py-2 rounded-lg transition-all duration-300 hover-lift ${
                isActive('/admin') 
                  ? 'bg-white text-red-800 shadow-lg animate-glow' 
                  : 'text-white hover:bg-red-600'
              }`}
            >
              Admin
            </Link>
            <Link
              to="/admin-dashboard"
              className={`px-4 py-2 rounded-lg transition-all duration-300 hover-lift ${
                isActive('/admin-dashboard') 
                  ? 'bg-white text-red-800 shadow-lg animate-glow' 
                  : 'text-white hover:bg-red-600'
              }`}
            >
              Dashboard
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2 hover-scale ripple"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-in-down">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-4 py-3 rounded-lg transition-all hover-lift ${
                  isActive('/') ? 'bg-white text-red-800' : 'text-white hover:bg-red-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/booking"
                className={`px-4 py-3 rounded-lg transition-all hover-lift ${
                  isActive('/booking') ? 'bg-white text-red-800' : 'text-white hover:bg-red-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Book Darshan
              </Link>
              <Link
                to="/vehicle-booking"
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all hover-lift ${
                  isActive('/vehicle-booking') ? 'bg-white text-red-800' : 'text-white hover:bg-red-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Car className="h-4 w-4" />
                <span>Vehicle Pooja</span>
              </Link>
              <Link
                to="/donation"
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all hover-lift ${
                  isActive('/donation') ? 'bg-white text-red-800' : 'text-white hover:bg-red-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-4 w-4" />
                <span>Donate</span>
              </Link>
              <Link
                to="/admin"
                className={`px-4 py-3 rounded-lg transition-all hover-lift ${
                  isActive('/admin') ? 'bg-white text-red-800' : 'text-white hover:bg-red-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <Link
                to="/admin-dashboard"
                className={`px-4 py-3 rounded-lg transition-all hover-lift ${
                  isActive('/admin-dashboard') ? 'bg-white text-red-800' : 'text-white hover:bg-red-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;