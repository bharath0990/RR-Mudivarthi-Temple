import React from 'react';
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Temple Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xl">🕉</span>
              </div>
              <h3 className="text-xl font-bold">Sri Maha Temple</h3>
            </div>
            <p className="text-gray-300 mb-4">
              A sacred place of worship dedicated to divine blessings and spiritual enlightenment. 
              Experience the divine presence and find peace in our holy premises.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                <span className="text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <span className="text-sm">t</span>
              </div>
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                <span className="text-sm">i</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Temple</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Daily Rituals</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Festival Calendar</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Donation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Volunteer</a></li>
            </ul>
          </div>

          {/* Darshan Timings */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Darshan Timings</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-orange-400" />
                <div>
                  <p className="text-sm font-medium">Morning Darshan</p>
                  <p className="text-gray-300 text-sm">5:00 AM - 12:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-orange-400" />
                <div>
                  <p className="text-sm font-medium">Evening Darshan</p>
                  <p className="text-gray-300 text-sm">4:00 PM - 10:00 PM</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-red-600 bg-opacity-20 rounded-lg">
                <p className="text-sm text-red-200">
                  <strong>Note:</strong> Please arrive 15 minutes before your slot time
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-400 mt-1" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-gray-300 text-sm">
                    123 Temple Street<br />
                    Sacred City, State 12345
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-400" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-gray-300 text-sm">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-400" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-gray-300 text-sm">info@srimahatemple.org</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 Sri Maha Temple. All rights reserved. Built with devotion and technology.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Heart className="h-4 w-4 text-red-400" />
              <p className="text-gray-300 text-sm">Made with love for divine service</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;