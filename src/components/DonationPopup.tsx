import React, { useState, useEffect } from 'react';
import { X, Heart, Star, Sparkles, Gift, ArrowRight, CreditCard, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DonationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationPopup: React.FC<DonationPopupProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [showSparkles, setShowSparkles] = useState(false);
  const [loading, setLoading] = useState(false);

  const donationAmounts = [
    { amount: 51, label: '₹51', blessing: 'Basic Blessing' },
    { amount: 101, label: '₹101', blessing: 'Divine Grace' },
    { amount: 501, label: '₹501', blessing: 'Prosperity Blessing' },
    { amount: 1001, label: '₹1001', blessing: 'Special Blessing' },
    { amount: 2501, label: '₹2501', blessing: 'Divine Protection' },
    { amount: 5001, label: '₹5001', blessing: 'Abundant Blessings' }
  ];

  useEffect(() => {
    if (isOpen) {
      setShowSparkles(true);
      // Play gentle chime sound
      playDonationChime();
    } else {
      setShowSparkles(false);
    }
  }, [isOpen]);

  const playDonationChime = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playNote = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };

      // Gentle temple bell sound
      const now = audioContext.currentTime;
      playNote(523.25, now, 0.3); // C5
      playNote(659.25, now + 0.15, 0.3); // E5
      playNote(783.99, now + 0.3, 0.4); // G5
      
    } catch (error) {
      // Silently fail if audio is not supported
    }
  };

  const getSelectedAmount = () => {
    return selectedAmount || (customAmount ? parseInt(customAmount) : 0);
  };

  const handleDonation = () => {
    const amount = getSelectedAmount();
    
    if (!amount || amount < 1) {
      alert('Please select or enter a donation amount');
      return;
    }

    if (!donorName.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!donorPhone.trim() || donorPhone.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    setLoading(true);

    // Simulate donation processing
    setTimeout(() => {
      const donationData = {
        donationId: `DON${Date.now()}`,
        donorName,
        donorPhone,
        donorEmail,
        amount,
        paymentMethod,
        timestamp: new Date().toISOString(),
        type: 'donation'
      };

      // Navigate to payment with donation data
      navigate('/payment', { state: { booking: donationData } });
      setLoading(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Sparkles Animation */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      {/* Popup Container */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-8 rounded-t-3xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-custom">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Make a Sacred Donation</h2>
              <p className="text-orange-100 text-lg">
                Support our temple and receive divine blessings
              </p>
              <div className="flex items-center justify-center space-x-2 mt-4 text-yellow-200">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm">Your contribution helps maintain our sacred space</span>
                <Star className="h-4 w-4 fill-current" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Donation Amounts */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Choose Your Donation Amount</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {donationAmounts.map((donation, index) => (
                  <div
                    key={donation.amount}
                    className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all duration-300 hover-lift hover-glow ${
                      selectedAmount === donation.amount
                        ? 'border-orange-500 bg-orange-50 shadow-lg transform scale-105 animate-glow'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                    }`}
                    onClick={() => {
                      setSelectedAmount(donation.amount);
                      setCustomAmount('');
                    }}
                  >
                    <div className="text-2xl font-bold text-orange-600 mb-2">{donation.label}</div>
                    <div className="text-sm text-gray-600 mb-1">{donation.blessing}</div>
                    <div className="flex justify-center">
                      {Array.from({ length: Math.min(5, Math.floor(donation.amount / 500) + 1) }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or enter custom amount:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Donor Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Your Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-300 ${
                    paymentMethod === 'upi'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-6 w-6 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-800">UPI Payment</div>
                      <div className="text-sm text-gray-600">Quick & Secure</div>
                    </div>
                  </div>
                </div>
                
                <div
                  className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-300 ${
                    paymentMethod === 'card'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-6 w-6 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-800">Card Payment</div>
                      <div className="text-sm text-gray-600">Debit/Credit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Benefits */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Gift className="h-6 w-6 text-orange-600" />
                <h4 className="font-bold text-orange-800">Your Donation Includes:</h4>
              </div>
              <ul className="space-y-2 text-sm text-orange-700">
                <li className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>Special prayers in your name</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>Digital donation certificate</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>Blessed prasadam (can be collected)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>Divine blessings for prosperity</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                Maybe Later
              </button>
              
              <button
                onClick={handleDonation}
                disabled={loading || !getSelectedAmount() || !donorName || !donorPhone}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center btn-animate hover-glow"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    Donate ₹{getSelectedAmount().toLocaleString()}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>

            {/* Trust Message */}
            <div className="text-center text-sm text-gray-500">
              <p>🔒 Your donation is secure and will be used for temple maintenance and community service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPopup;