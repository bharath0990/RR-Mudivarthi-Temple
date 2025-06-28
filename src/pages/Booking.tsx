import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, IndianRupee, ArrowRight, AlertCircle, CheckCircle, User, Phone, Mail } from 'lucide-react';
import { format, addDays, isSameDay, isAfter, startOfDay } from 'date-fns';
import ScrollAnimation from '../components/ScrollAnimation';

interface DarshanType {
  id: number;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  maxCapacity: number;
}

interface UserDetails {
  name: string;
  phone: string;
  email: string;
}

const Booking = () => {
  const navigate = useNavigate();
  const [selectedDarshan, setSelectedDarshan] = useState<DarshanType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [ticketCount, setTicketCount] = useState(1);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);

  const darshanTypes: DarshanType[] = [
    {
      id: 1,
      name: "General Darshan",
      price: 50,
      duration: "30 mins",
      description: "Regular temple visit with basic facilities",
      features: ["Temple entry", "Basic darshan", "Prasadam"],
      maxCapacity: 100
    },
    {
      id: 2,
      name: "VIP Darshan",
      price: 200,
      duration: "45 mins",
      description: "Priority access with special facilities",
      features: ["Skip the queue", "Closer darshan", "Special prasadam", "Photo allowed"],
      maxCapacity: 50
    },
    {
      id: 3,
      name: "Special Pooja",
      price: 500,
      duration: "60 mins",
      description: "Personalized pooja with priest",
      features: ["Private session", "Customized rituals", "Blessed items", "Photo & video allowed"],
      maxCapacity: 20
    }
  ];

  const getNextSevenDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(new Date(), i));
    }
    return days;
  };

  const getTotalAmount = () => {
    return selectedDarshan ? selectedDarshan.price * ticketCount : 0;
  };

  const validateUserDetails = () => {
    if (!userDetails.name.trim()) {
      alert('Please enter your name');
      return false;
    }
    if (!userDetails.phone.trim() || userDetails.phone.length < 10) {
      alert('Please enter a valid phone number');
      return false;
    }
    // Email validation only if provided
    if (userDetails.email.trim() && !userDetails.email.includes('@')) {
      alert('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleBooking = () => {
    if (!selectedDarshan) {
      alert('Please select darshan type');
      return;
    }

    if (!validateUserDetails()) {
      return;
    }

    setLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      const bookingData = {
        darshanType: selectedDarshan,
        date: selectedDate,
        ticketCount,
        totalAmount: getTotalAmount(),
        bookingNumber: `TKT${Date.now()}`,
        timestamp: new Date().toISOString(),
        userDetails: userDetails
      };
      
      navigate('/payment', { state: { booking: bookingData } });
      setLoading(false);
    }, 1000);
  };

  const handleUserDetailsChange = (field: keyof UserDetails, value: string) => {
    setUserDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Your Darshan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your preferred darshan type and date for a blessed temple visit
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Select Darshan Type */}
            <ScrollAnimation animation="fadeInLeft" className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold mr-3 animate-pulse-custom">1</div>
                <h2 className="text-2xl font-bold text-gray-800">Select Darshan Type</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {darshanTypes.map((type, index) => (
                  <ScrollAnimation key={type.id} animation="scaleIn" delay={index * 150}>
                    <div
                      className={`cursor-pointer border-2 rounded-xl p-6 transition-all duration-300 hover-lift hover-glow ${
                        selectedDarshan?.id === type.id
                          ? 'border-red-500 bg-red-50 shadow-lg animate-glow'
                          : 'border-gray-200 hover:border-red-300 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedDarshan(type)}
                    >
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{type.name}</h3>
                        <div className="text-2xl font-bold text-red-600 mb-2 hover-scale">₹{type.price}</div>
                        <div className="text-sm text-gray-600 mb-4">{type.duration}</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {type.features.map((feature, index) => (
                            <li key={index} className="flex items-center justify-center hover-scale">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </ScrollAnimation>

            {/* Step 2: Select Date */}
            {selectedDarshan && (
              <ScrollAnimation animation="fadeInLeft" delay={200} className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold mr-3 animate-pulse-custom">2</div>
                  <h2 className="text-2xl font-bold text-gray-800">Select Date</h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {getNextSevenDays().map((date, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer p-4 rounded-xl border-2 text-center transition-all duration-300 hover-lift hover-glow ${
                        isSameDay(selectedDate, date)
                          ? 'border-red-500 bg-red-50 shadow-lg animate-glow'
                          : 'border-gray-200 hover:border-red-300 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      <div className="text-lg font-semibold text-gray-800">
                        {format(date, 'EEE')}
                      </div>
                      <div className="text-2xl font-bold text-gray-800 hover-scale">
                        {format(date, 'd')}
                      </div>
                      <div className="text-sm text-gray-600">
                        {format(date, 'MMM')}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>
            )}

            {/* Step 3: Number of Tickets */}
            {selectedDarshan && selectedDate && (
              <ScrollAnimation animation="fadeInLeft" delay={400} className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold mr-3 animate-pulse-custom">3</div>
                  <h2 className="text-2xl font-bold text-gray-800">Number of Tickets</h2>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors hover-scale ripple"
                  >
                    -
                  </button>
                  <div className="text-2xl font-semibold text-gray-800 w-12 text-center hover-scale">{ticketCount}</div>
                  <button
                    onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                    className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors hover-scale ripple"
                  >
                    +
                  </button>
                  <span className="text-gray-600 ml-4">Maximum 10 tickets per booking</span>
                </div>
              </ScrollAnimation>
            )}

            {/* Step 4: User Details */}
            {selectedDarshan && selectedDate && (
              <ScrollAnimation animation="fadeInLeft" delay={600} className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold mr-3 animate-pulse-custom">4</div>
                  <h2 className="text-2xl font-bold text-gray-800">Your Details</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={userDetails.name}
                      onChange={(e) => handleUserDetailsChange('name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={userDetails.phone}
                      onChange={(e) => handleUserDetailsChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-300"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com (optional)"
                      value={userDetails.email}
                      onChange={(e) => handleUserDetailsChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-300"
                    />
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Privacy Notice:</p>
                      <p className="text-xs">Your details will be used only for booking confirmation and temple entry verification. We respect your privacy and will not share your information with third parties.</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <ScrollAnimation animation="fadeInRight" className="bg-white rounded-2xl shadow-lg p-8 sticky top-8 hover-lift">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Booking Summary</h3>
              
              {selectedDarshan ? (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-gray-800">{selectedDarshan.name}</h4>
                    <p className="text-gray-600 text-sm">{selectedDarshan.description}</p>
                  </div>
                  
                  {selectedDate && (
                    <div className="flex items-center space-x-3 hover-scale">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-800">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3 hover-scale">
                    <Users className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-800">{ticketCount} {ticketCount === 1 ? 'Ticket' : 'Tickets'}</span>
                  </div>
                  
                  {userDetails.name && (
                    <div className="bg-gray-50 p-4 rounded-lg hover-lift">
                      <h5 className="font-semibold text-gray-800 mb-2">Booking For:</h5>
                      <div className="text-sm text-gray-700 space-y-1">
                        <div className="flex items-center space-x-2 hover-scale">
                          <User className="h-4 w-4" />
                          <span>{userDetails.name}</span>
                        </div>
                        <div className="flex items-center space-x-2 hover-scale">
                          <Phone className="h-4 w-4" />
                          <span>{userDetails.phone}</span>
                        </div>
                        {userDetails.email && (
                          <div className="flex items-center space-x-2 hover-scale">
                            <Mail className="h-4 w-4" />
                            <span>{userDetails.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Price per ticket:</span>
                      <span className="text-gray-800">₹{selectedDarshan.price}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="text-gray-800">{ticketCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span className="text-gray-800">Total Amount:</span>
                      <span className="text-red-600 hover-scale">₹{getTotalAmount()}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleBooking}
                    disabled={loading || !userDetails.name || !userDetails.phone}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center btn-animate hover-glow ripple"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        Proceed to Payment
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                  
                  <div className="bg-blue-50 p-4 rounded-lg hover-lift">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-semibold mb-1">Important Notes:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Temple is open from 5:00 AM to 10:00 PM</li>
                          <li>• Carry a valid ID proof for verification</li>
                          <li>• Booking is non-refundable after confirmation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50 animate-float" />
                  <p>Select a darshan type to see the booking summary</p>
                </div>
              )}
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;