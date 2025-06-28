import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Download, Share, Calendar, Users, ArrowRight, Car, Phone, MapPin, Clock, User, CreditCard, Hash, FileSpreadsheet, Heart, Gift } from 'lucide-react';
import CelebrationAnimation from '../components/CelebrationAnimation';
import TicketSaveStatus from '../components/TicketSaveStatus';
import { generateTicketImage, downloadTicketImage, createPrintableTicket } from '../utils/ticketGenerator';
import { saveTicketToGoogleSheets, prepareTicketData, uploadTicketImage } from '../utils/googleSheets';
import { saveBooking } from '../utils/bookingStorage';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSaveStatus, setShowSaveStatus] = useState(false);
  const [saveComplete, setSaveComplete] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const booking = location.state?.booking;

  useEffect(() => {
    if (!booking) {
      navigate('/booking');
      return;
    }

    // Save booking to local storage immediately (only for actual bookings, not donations)
    if (booking.type !== 'donation') {
      try {
        saveBooking(booking);
        console.log('✅ Booking saved to local storage for admin dashboard');
      } catch (error) {
        console.error('❌ Error saving booking to local storage:', error);
      }
    }

    // Show celebration animation after a short delay
    const timer = setTimeout(() => {
      setShowCelebration(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [booking, navigate]);

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
    // Start the save process after celebration (only for bookings, not donations)
    if (booking.type !== 'donation') {
      setTimeout(() => {
        setShowSaveStatus(true);
        saveTicketData();
      }, 500);
    } else {
      setSaveComplete(true);
    }
  };

  const saveTicketData = async () => {
    try {
      // Step 1: Generate ticket image
      if (ticketRef.current) {
        const ticketBlob = await generateTicketImage(ticketRef.current);
        
        // Step 2: Upload image to cloud storage
        const imageUrl = await uploadTicketImage(ticketBlob, booking.bookingNumber || booking.donationId);
        
        // Step 3: Prepare and save data to Google Sheets
        const ticketData = prepareTicketData(booking);
        ticketData.ticketImageUrl = imageUrl;
        
        const success = await saveTicketToGoogleSheets(ticketData);
        
        if (success) {
          console.log('✅ Ticket data saved successfully to Google Sheets');
        } else {
          console.error('❌ Failed to save ticket data');
        }
      }
    } catch (error) {
      console.error('❌ Error in save process:', error);
    }
  };

  const handleSaveComplete = () => {
    setShowSaveStatus(false);
    setSaveComplete(true);
  };

  if (!booking) {
    return null;
  }

  const handleDownload = async () => {
    try {
      if (ticketRef.current) {
        const ticketBlob = await generateTicketImage(ticketRef.current);
        downloadTicketImage(ticketBlob, booking.bookingNumber || booking.donationId);
      }
    } catch (error) {
      console.error('Error downloading ticket:', error);
      alert('Error generating ticket image. Please try again.');
    }
  };

  const handleShare = () => {
    const isDonation = booking.type === 'donation';
    const shareText = isDonation 
      ? `I made a sacred donation to Sri Maha Temple! Donation ID: ${booking.donationId}`
      : `My ${booking.type === 'vehicle' ? 'vehicle pooja' : 'darshan'} booking is confirmed! Booking ID: ${booking.bookingNumber}`;
    
    if (navigator.share) {
      navigator.share({
        title: isDonation ? 'Temple Donation Confirmed' : `Temple ${booking.type === 'vehicle' ? 'Vehicle Pooja' : 'Darshan'} Booking Confirmed`,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Details copied to clipboard!');
    }
  };

  const isDonation = booking.type === 'donation';
  const isVehicleBooking = booking.type === 'vehicle';

  // Handle different booking types
  let serviceData, count, userData;
  if (isDonation) {
    serviceData = { name: 'Temple Donation', description: 'Sacred contribution for temple maintenance and community service' };
    count = 1;
    userData = {
      name: booking.donorName || "Anonymous Donor",
      phone: booking.donorPhone || "",
      email: booking.donorEmail || ""
    };
  } else {
    serviceData = isVehicleBooking ? booking.vehicleType : booking.darshanType;
    count = isVehicleBooking ? booking.vehicleCount : booking.ticketCount;
    userData = booking.userDetails || {
      name: "Guest User",
      phone: "+91 98765 43210",
      email: ""
    };
  }

  const templeDetails = {
    name: "Sri Maha Temple",
    address: "123 Temple Street, Sacred City, State 12345",
    phone: "+91 98765 43210",
    timings: isDonation ? "Always Open for Donations" : isVehicleBooking ? "6:00 AM - 6:00 PM" : "5:00 AM - 10:00 PM"
  };

  const celebrationMessage = isDonation 
    ? "Thank you for your generous donation!" 
    : `Thanks for booking your ${isVehicleBooking ? 'Vehicle Pooja' : 'Darshan'}!`;

  return (
    <div className={`min-h-screen py-8 ${
      isDonation 
        ? 'bg-gradient-to-br from-yellow-50 to-orange-50' 
        : isVehicleBooking 
          ? 'bg-gradient-to-br from-green-50 to-blue-50' 
          : 'bg-gradient-to-br from-green-50 to-blue-50'
    }`}>
      {/* Celebration Animation */}
      <CelebrationAnimation 
        show={showCelebration} 
        onComplete={handleCelebrationComplete}
        message={celebrationMessage}
      />

      {/* Ticket Save Status - Only for bookings, not donations */}
      {!isDonation && (
        <TicketSaveStatus 
          show={showSaveStatus} 
          onComplete={handleSaveComplete}
        />
      )}

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 hover-scale animate-pulse-custom ${
              isDonation ? 'bg-orange-100' : 'bg-green-100'
            }`}>
              {isDonation ? (
                <Heart className="h-12 w-12 text-orange-600" />
              ) : (
                <CheckCircle className="h-12 w-12 text-green-600" />
              )}
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {isDonation ? 'Donation Confirmed!' : 'Booking Confirmed!'}
            </h1>
            <p className="text-xl text-gray-600">
              {isDonation 
                ? 'Your generous donation has been received. May you be blessed with prosperity and happiness!'
                : `Your ${isVehicleBooking ? 'vehicle pooja' : 'darshan'} booking has been successfully confirmed. May you receive divine blessings!`
              }
            </p>
            
            {/* Save Status Indicator */}
            {saveComplete && (
              <div className="mt-6 inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                <FileSpreadsheet className="h-5 w-5 text-green-600" />
                <span className="text-green-700 font-medium">
                  {isDonation ? 'Donation details saved to database' : 'Ticket details saved to database'}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking/Donation Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover-lift animate-fade-in-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {isDonation ? 'Donation Details' : 'Booking Details'}
              </h2>
              
              <div className="space-y-6">
                <div className={`rounded-xl p-6 hover-glow ${
                  isDonation 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50' 
                    : isVehicleBooking 
                      ? 'bg-gradient-to-r from-green-50 to-blue-50' 
                      : 'bg-gradient-to-r from-red-50 to-orange-50'
                }`}>
                  <div className="text-center mb-4">
                    <div className={`text-3xl font-bold hover-scale ${
                      isDonation ? 'text-orange-600' : isVehicleBooking ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {booking.donationId || booking.bookingNumber}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {isDonation ? 'Donation Reference Number' : 'Booking Reference Number'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {!isDonation && (
                    <div className="bg-gray-50 rounded-lg p-4 hover-lift">
                      <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="h-5 w-5 text-gray-600" />
                        <span className="font-semibold text-gray-800">Date</span>
                      </div>
                      <div className="text-gray-700">
                        {new Date(booking.date).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-4 hover-lift">
                    <div className="flex items-center space-x-3 mb-2">
                      {isDonation ? (
                        <Heart className="h-5 w-5 text-gray-600" />
                      ) : isVehicleBooking ? (
                        <Car className="h-5 w-5 text-gray-600" />
                      ) : (
                        <Users className="h-5 w-5 text-gray-600" />
                      )}
                      <span className="font-semibold text-gray-800">
                        {isDonation ? 'Donation' : isVehicleBooking ? 'Vehicles' : 'Tickets'}
                      </span>
                    </div>
                    <div className="text-gray-700">
                      {isDonation 
                        ? `₹${booking.amount.toLocaleString()}` 
                        : `${count} ${isVehicleBooking ? (count === 1 ? 'Vehicle' : 'Vehicles') : (count === 1 ? 'Person' : 'People')}`
                      }
                    </div>
                  </div>

                  <div className={`bg-gray-50 rounded-lg p-4 hover-lift ${isDonation ? 'md:col-span-2' : 'md:col-span-2'}`}>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold text-gray-800">Amount {isDonation ? 'Donated' : 'Paid'}</span>
                    </div>
                    <div className={`text-2xl font-bold hover-scale ${
                      isDonation ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      ₹{(booking.totalAmount || booking.amount).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center space-x-3 mb-3">
                    {isDonation ? (
                      <Heart className="h-5 w-5 text-orange-600" />
                    ) : isVehicleBooking ? (
                      <Car className="h-5 w-5 text-green-600" />
                    ) : (
                      <Calendar className="h-5 w-5 text-red-600" />
                    )}
                    <h3 className="font-semibold text-gray-800">{serviceData.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{serviceData.description}</p>
                  
                  {!isDonation && serviceData.features && (
                    <div className="grid grid-cols-2 gap-4">
                      {serviceData.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 hover-scale">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {isDonation && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 hover-scale">
                        <Gift className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-gray-700">Special prayers in your name</span>
                      </div>
                      <div className="flex items-center space-x-2 hover-scale">
                        <Gift className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-gray-700">Digital donation certificate</span>
                      </div>
                      <div className="flex items-center space-x-2 hover-scale">
                        <Gift className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-gray-700">Blessed prasadam available</span>
                      </div>
                      <div className="flex items-center space-x-2 hover-scale">
                        <Gift className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-gray-700">Divine blessings for prosperity</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Digital Ticket/Certificate */}
            <div className="space-y-8 animate-fade-in-right">
              {/* Ticket/Certificate - This will be captured for Google Sheets */}
              <div 
                ref={ticketRef}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift"
                style={{ width: '400px', margin: '0 auto' }}
              >
                <div className={`text-center py-6 text-white ${
                  isDonation 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600' 
                    : isVehicleBooking 
                      ? 'bg-gradient-to-r from-green-600 to-blue-600' 
                      : 'bg-gradient-to-r from-red-600 to-orange-600'
                }`}>
                  <h3 className="text-2xl font-bold mb-2 animate-pulse-custom">
                    🕉 {isDonation ? 'DONATION CERTIFICATE' : 'TEMPLE TICKET'} 🕉
                  </h3>
                  <p className="text-lg">
                    {isDonation ? 'Sacred Contribution' : isVehicleBooking ? 'Vehicle Pooja Entry Pass' : 'Darshan Entry Pass'}
                  </p>
                </div>
                
                <div className="p-8 space-y-6">
                  {/* Temple Details */}
                  <div className="text-center border-b border-gray-200 pb-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{templeDetails.name}</h4>
                    <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2 hover-scale">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{templeDetails.address}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-600 hover-scale">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{templeDetails.phone}</span>
                    </div>
                  </div>

                  {/* Booking/Donation Information */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <div className="hover-lift">
                        <div className="flex items-center space-x-2 text-gray-600 mb-1">
                          <Hash className="h-4 w-4" />
                          <span className="font-medium">{isDonation ? 'Donation ID' : 'Booking ID'}</span>
                        </div>
                        <div className="font-mono text-gray-800">{booking.donationId || booking.bookingNumber}</div>
                      </div>
                      
                      <div className="hover-lift">
                        <div className="flex items-center space-x-2 text-gray-600 mb-1">
                          <User className="h-4 w-4" />
                          <span className="font-medium">Name</span>
                        </div>
                        <div className="text-gray-800">{userData.name}</div>
                      </div>

                      <div className="hover-lift">
                        <div className="flex items-center space-x-2 text-gray-600 mb-1">
                          <Phone className="h-4 w-4" />
                          <span className="font-medium">Phone</span>
                        </div>
                        <div className="text-gray-800">{userData.phone}</div>
                      </div>

                      {userData.email && (
                        <div className="hover-lift">
                          <div className="flex items-center space-x-2 text-gray-600 mb-1">
                            <span className="font-medium">Email</span>
                          </div>
                          <div className="text-gray-800 text-xs">{userData.email}</div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {!isDonation && (
                        <div className="hover-lift">
                          <div className="flex items-center space-x-2 text-gray-600 mb-1">
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium">Date</span>
                          </div>
                          <div className="text-gray-800">
                            {new Date(booking.date).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                      )}

                      <div className="hover-lift">
                        <div className="flex items-center space-x-2 text-gray-600 mb-1">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{isDonation ? 'Status' : 'Timings'}</span>
                        </div>
                        <div className="text-gray-800">
                          {isDonation ? 'Confirmed' : templeDetails.timings}
                        </div>
                      </div>

                      <div className="hover-lift">
                        <div className="flex items-center space-x-2 text-gray-600 mb-1">
                          <CreditCard className="h-4 w-4" />
                          <span className="font-medium">Amount</span>
                        </div>
                        <div className="text-gray-800 font-bold hover-scale">
                          ₹{(booking.totalAmount || booking.amount).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="border-t border-gray-200 pt-4 hover-lift">
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      {isDonation ? (
                        <Heart className="h-4 w-4" />
                      ) : isVehicleBooking ? (
                        <Car className="h-4 w-4" />
                      ) : (
                        <Users className="h-4 w-4" />
                      )}
                      <span className="font-medium">{isDonation ? 'Donation' : 'Service'}</span>
                    </div>
                    <div className="text-gray-800 font-semibold">{serviceData.name}</div>
                    {!isDonation && (
                      <div className="text-gray-600 text-sm">
                        {count} {isVehicleBooking ? (count === 1 ? 'Vehicle' : 'Vehicles') : (count === 1 ? 'Person' : 'People')}
                      </div>
                    )}
                  </div>

                  {/* Important Notes */}
                  <div className={`border border-gray-200 rounded-lg p-4 hover-lift ${
                    isDonation ? 'bg-yellow-50' : 'bg-yellow-50'
                  }`}>
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-2">📋 Important {isDonation ? 'Information' : 'Instructions'}:</p>
                      <ul className="space-y-1 text-xs">
                        {isDonation ? (
                          <>
                            <li>• Your donation supports temple maintenance</li>
                            <li>• Blessed prasadam can be collected from temple</li>
                            <li>• Special prayers will be offered in your name</li>
                            <li>• Tax exemption certificate available on request</li>
                          </>
                        ) : (
                          <>
                            <li>• Show this ticket at the temple entrance</li>
                            <li>• Carry a valid photo ID for verification</li>
                            <li>• {isVehicleBooking ? 'Bring vehicle registration documents' : 'Arrive 15 minutes before your visit'}</li>
                            <li>• Ticket is non-transferable and non-refundable</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Barcode-style decoration */}
                  <div className="text-center pt-4 border-t border-gray-200">
                    <div className="inline-block hover-scale">
                      <div className="flex space-x-1">
                        {Array.from({length: 20}, (_, i) => (
                          <div key={i} className={`w-1 bg-gray-800 ${Math.random() > 0.5 ? 'h-8' : 'h-4'}`}></div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 mt-2 font-mono">
                        {booking.donationId || booking.bookingNumber}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
                    Generated on {new Date().toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
                
                <div className="space-y-4">
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 btn-animate hover-glow ripple"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download {isDonation ? 'Certificate' : 'Ticket'}</span>
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 btn-animate hover-glow ripple"
                  >
                    <Share className="h-5 w-5" />
                    <span>Share {isDonation ? 'Donation' : 'Booking'}</span>
                  </button>
                  
                  {isDonation ? (
                    <Link
                      to="/"
                      className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 btn-animate hover-glow ripple"
                    >
                      <Heart className="h-5 w-5" />
                      <span>Back to Home</span>
                    </Link>
                  ) : (
                    <Link
                      to={isVehicleBooking ? "/vehicle-booking" : "/booking"}
                      className={`w-full flex items-center justify-center space-x-3 text-white py-3 px-6 rounded-xl transition-all duration-300 btn-animate hover-glow ripple ${
                        isVehicleBooking 
                          ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700'
                          : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
                      }`}
                    >
                      {isVehicleBooking ? <Car className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
                      <span>Book Another {isVehicleBooking ? 'Vehicle Pooja' : 'Darshan'}</span>
                    </Link>
                  )}
                </div>

                {/* Google Sheets Integration Info */}
                {saveComplete && !isDonation && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-700 mb-2">
                      <FileSpreadsheet className="h-5 w-5" />
                      <span className="font-semibold">Data Backup Complete</span>
                    </div>
                    <p className="text-blue-600 text-sm">
                      Your ticket details and image have been automatically saved to our Google Sheets database for record keeping and easy access.
                    </p>
                  </div>
                )}
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8 hover-lift">
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <p className="text-gray-300 mb-4">
                  If you have any questions about your {isDonation ? 'donation' : 'booking'} or need assistance, our support team is here to help.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="hover-scale">📞 Phone: +91 98765 43210</div>
                  <div className="hover-scale">📧 Email: support@srimahatemple.org</div>
                  <div className="hover-scale">🕐 Support Hours: 8:00 AM - 8:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 hover-lift animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What's Next?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl hover-lift">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-custom">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Save Your {isDonation ? 'Certificate' : 'Ticket'}
                </h3>
                <p className="text-gray-600 text-sm">
                  Download or screenshot your {isDonation ? 'donation certificate' : 'ticket'} for easy access
                </p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-xl hover-lift">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-custom">
                  <span className="text-2xl">{isDonation ? '🙏' : isVehicleBooking ? '🚗' : '🚗'}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {isDonation ? 'Collect Prasadam' : 'Plan Your Visit'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isDonation 
                    ? 'Visit the temple to collect your blessed prasadam and receive special prayers'
                    : isVehicleBooking 
                      ? 'Arrive with your vehicle and registration documents for the pooja ceremony'
                      : 'Temple is open from 5:00 AM to 10:00 PM. Bring a valid photo ID for verification'
                  }
                </p>
              </div>
              
              <div className="text-center p-6 bg-orange-50 rounded-xl hover-lift">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-custom">
                  <span className="text-2xl">🙏</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {isDonation ? 'Receive Blessings' : `Enjoy Your ${isVehicleBooking ? 'Pooja' : 'Darshan'}`}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isDonation 
                    ? 'Your generous contribution will bring divine blessings and prosperity to your life'
                    : 'Have a peaceful and blessed experience at the temple'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;