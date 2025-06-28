import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Car, Truck, Bike, ArrowRight, AlertCircle, CheckCircle, Users, User, Phone, Mail } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import ScrollAnimation from '../components/ScrollAnimation';

interface VehicleType {
  id: number;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ReactNode;
}

interface UserDetails {
  name: string;
  phone: string;
  email: string;
}

const VehicleBooking = () => {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [vehicleCount, setVehicleCount] = useState(1);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);

  const vehicleTypes: VehicleType[] = [
    {
      id: 1,
      name: "Car/Sedan",
      price: 500,
      duration: "45 mins",
      description: "Complete pooja for cars and sedans with holy water blessing",
      features: ["Vehicle blessing", "Holy water sprinkle", "Tilaka application", "Prasadam", "Protection thread"],
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400",
      icon: <Car className="h-8 w-8" />
    },
    {
      id: 2,
      name: "SUV/Hatchback",
      price: 600,
      duration: "50 mins",
      description: "Special pooja for SUVs and hatchbacks with comprehensive rituals",
      features: ["Vehicle blessing", "Holy water sprinkle", "Tilaka application", "Prasadam", "Protection thread", "Interior blessing"],
      image: "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=400",
      icon: <Car className="h-8 w-8" />
    },
    {
      id: 3,
      name: "Motorcycle/Scooter",
      price: 300,
      duration: "30 mins",
      description: "Traditional pooja for two-wheelers ensuring safe journeys",
      features: ["Vehicle blessing", "Holy water sprinkle", "Tilaka application", "Prasadam", "Protection thread"],
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400",
      icon: <Bike className="h-8 w-8" />
    },
    {
      id: 4,
      name: "Truck/Commercial",
      price: 800,
      duration: "60 mins",
      description: "Comprehensive pooja for trucks and commercial vehicles",
      features: ["Vehicle blessing", "Holy water sprinkle", "Tilaka application", "Prasadam", "Protection thread", "Business prosperity blessing"],
      image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=400",
      icon: <Truck className="h-8 w-8" />
    },
    {
      id: 5,
      name: "Bus/Large Vehicle",
      price: 1000,
      duration: "75 mins",
      description: "Special pooja for buses and large vehicles with extended rituals",
      features: ["Vehicle blessing", "Holy water sprinkle", "Tilaka application", "Prasadam", "Protection thread", "Passenger safety blessing", "Route blessing"],
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400",
      icon: <Truck className="h-8 w-8" />
    },
    {
      id: 6,
      name: "Auto Rickshaw",
      price: 400,
      duration: "40 mins",
      description: "Traditional pooja for auto rickshaws and three-wheelers",
      features: ["Vehicle blessing", "Holy water sprinkle", "Tilaka application", "Prasadam", "Protection thread", "Livelihood blessing"],
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400",
      icon: <Car className="h-8 w-8" />
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
    return selectedVehicle ? selectedVehicle.price * vehicleCount : 0;
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
    if (!selectedVehicle) {
      alert('Please select vehicle type');
      return;
    }

    if (!validateUserDetails()) {
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const bookingData = {
        vehicleType: selectedVehicle,
        date: selectedDate,
        vehicleCount,
        totalAmount: getTotalAmount(),
        bookingNumber: `VPJ${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'vehicle',
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Vehicle Pooja Booking</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book a sacred vehicle pooja for divine protection and safe journeys
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Select Vehicle Type */}
            <ScrollAnimation animation="fadeInLeft" className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold mr-3 animate-pulse-custom">1</div>
                <h2 className="text-2xl font-bold text-gray-800">Select Vehicle Type</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicleTypes.map((vehicle, index) => (
                  <ScrollAnimation key={vehicle.id} animation="scaleIn" delay={index * 100}>
                    <div
                      className={`cursor-pointer border-2 rounded-xl overflow-hidden transition-all duration-300 hover-lift hover-glow ${
                        selectedVehicle?.id === vehicle.id
                          ? 'border-green-500 bg-green-50 shadow-lg transform scale-105 animate-glow'
                          : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedVehicle(vehicle)}
                    >
                      <div className="relative">
                        <img 
                          src={vehicle.image} 
                          alt={vehicle.name}
                          className="w-full h-32 object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover-scale">
                          {vehicle.icon}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{vehicle.name}</h3>
                        <div className="text-2xl font-bold text-green-600 mb-2 hover-scale">₹{vehicle.price}</div>
                        <div className="text-sm text-gray-600 mb-3">{vehicle.duration}</div>
                        <p className="text-sm text-gray-600 mb-3">{vehicle.description}</p>
                        <div className="space-y-1">
                          {vehicle.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center text-xs text-gray-600 hover-scale">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                              {feature}
                            </div>
                          ))}
                          {vehicle.features.length > 3 && (
                            <div className="text-xs text-green-600 font-medium">
                              +{vehicle.features.length - 3} more benefits
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </ScrollAnimation>

            {/* Step 2: Select Date */}
            {selectedVehicle && (
              <ScrollAnimation animation="fadeInLeft" delay={200} className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold mr-3 animate-pulse-custom">2</div>
                  <h2 className="text-2xl font-bold text-gray-800">Select Date</h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {getNextSevenDays().map((date, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer p-4 rounded-xl border-2 text-center transition-all duration-300 hover-lift hover-glow ${
                        isSameDay(selectedDate, date)
                          ? 'border-green-500 bg-green-50 shadow-lg animate-glow'
                          : 'border-gray-200 hover:border-green-300 hover:shadow-md'
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

            {/* Step 3: Number of Vehicles */}
            {selectedVehicle && selectedDate && (
              <ScrollAnimation animation="fadeInLeft" delay={400} className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold mr-3 animate-pulse-custom">3</div>
                  <h2 className="text-2xl font-bold text-gray-800">Number of Vehicles</h2>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setVehicleCount(Math.max(1, vehicleCount - 1))}
                    className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors hover-scale ripple"
                  >
                    -
                  </button>
                  <div className="text-2xl font-semibold text-gray-800 w-12 text-center hover-scale">{vehicleCount}</div>
                  <button
                    onClick={() => setVehicleCount(Math.min(5, vehicleCount + 1))}
                    className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors hover-scale ripple"
                  >
                    +
                  </button>
                  <span className="text-gray-600 ml-4">Maximum 5 vehicles per booking</span>
                </div>
              </ScrollAnimation>
            )}

            {/* Step 4: User Details */}
            {selectedVehicle && selectedDate && (
              <ScrollAnimation animation="fadeInLeft" delay={600} className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold mr-3 animate-pulse-custom">4</div>
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-300"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-300"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-300"
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
              
              {selectedVehicle ? (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center space-x-3 mb-2">
                      {selectedVehicle.icon}
                      <h4 className="font-semibold text-gray-800">{selectedVehicle.name}</h4>
                    </div>
                    <p className="text-gray-600 text-sm">{selectedVehicle.description}</p>
                  </div>
                  
                  {selectedDate && (
                    <div className="flex items-center space-x-3 hover-scale">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-800">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3 hover-scale">
                    <Users className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-800">{vehicleCount} {vehicleCount === 1 ? 'Vehicle' : 'Vehicles'}</span>
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
                  
                  <div className="bg-green-50 p-4 rounded-lg hover-lift">
                    <h5 className="font-semibold text-green-800 mb-2">Pooja Includes:</h5>
                    <ul className="space-y-1">
                      {selectedVehicle.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-green-700 hover-scale">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Price per vehicle:</span>
                      <span className="text-gray-800">₹{selectedVehicle.price}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="text-gray-800">{vehicleCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span className="text-gray-800">Total Amount:</span>
                      <span className="text-green-600 hover-scale">₹{getTotalAmount()}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleBooking}
                    disabled={loading || !userDetails.name || !userDetails.phone}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center btn-animate hover-glow ripple"
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
                          <li>• Vehicle pooja timings: 6:00 AM to 6:00 PM</li>
                          <li>• Bring vehicle registration documents</li>
                          <li>• Arrive 15 minutes before your scheduled time</li>
                          <li>• Booking is non-refundable after confirmation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Car className="h-12 w-12 mx-auto mb-4 opacity-50 animate-float" />
                  <p>Select a vehicle type to see the booking summary</p>
                </div>
              )}
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleBooking;