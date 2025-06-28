import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingDonationWidget from './components/FloatingDonationWidget';
import Home from './pages/Home';
import Booking from './pages/Booking';
import VehicleBooking from './pages/VehicleBooking';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import Donation from './pages/Donation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/vehicle-booking" element={<VehicleBooking />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Floating Donation Widget - Available on all pages */}
        <FloatingDonationWidget />
      </div>
    </Router>
  );
}

export default App;