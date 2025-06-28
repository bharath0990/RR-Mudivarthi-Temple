import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, Sparkles, Gift, ArrowRight, CreditCard, Smartphone, ArrowLeft } from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimation';

const Donation = () => {
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
    { amount: 51, label: '₹51', blessing: 'Basic Blessing', description: 'Daily temple maintenance' },
    { amount: 101, label: '₹101', blessing: 'Divine Grace', description: 'Lamp oil and incense' },
    { amount: 501, label: '₹501', blessing: 'Prosperity Blessing', description: 'Flower decorations' },
    { amount: 1001, label: '₹1001', blessing: 'Special Blessing', description: 'Prasadam preparation' },
    { amount: 2501, label: '₹2501', blessing: 'Divine Protection', description: 'Festival celebrations' },
    { amount: 5001, label: '₹5001', blessing: 'Abundant Blessings', description: 'Community service' }
  ];

  useEffect(() => {
    setShowSparkles(true);
    // Play gentle chime sound
    playDonationChime();
  }, []);

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
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-8">
      {/* Sparkles Animation */}
      {showSparkles && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4 hover-scale"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </button>
          </div>

          {/* Hero Section */}
          <ScrollAnimation className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-custom hover-scale">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Make a Sacred Donation</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Support our temple and receive divine blessings. Your contribution helps maintain our sacred space and serves the community.
            </p>
            <div className="flex items-center justify-center space-x-2 text-orange-600">
              <Star className="h-5 w-5 fill-current animate-pulse" />
              <span className="text-lg font-medium">Every donation brings divine grace</span>
              <Star className="h-5 w-5 fill-current animate-pulse" />
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Donation Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Select Amount */}
              <ScrollAnimation animation="fadeInLeft" className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-semibold mr-3 animate-pulse-custom">1</div>
                  <h2 className="text-2xl font-bold text-gray-800">Choose Donation Amount</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {donationAmounts.map((donation, index) => (
                    <ScrollAnimation key={donation.amount} animation="scaleIn" delay={index * 100}>
                      <div
                        className={`cursor-pointer border-2 rounded-xl p-6 text-center transition-all duration-300 hover-lift hover-glow ${
                          selectedAmount === donation.amount
                            ? 'border-orange-500 bg-orange-50 shadow-lg transform scale-105 animate-glow'
                            : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                        }`}
                        onClick={() => {
                          setSelectedAmount(donation.amount);
                          setCustomAmount('');
                        }}
                      >
                        <div className="text-3xl font-bold text-orange-600 mb-2 hover-scale">{donation.label}</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">{donation.blessing}</div>
                        <div className="text-xs text-gray-600 mb-3">{donation.description}</div>
                        <div className="flex justify-center">
                          {Array.from({ length: Math.min(5, Math.floor(donation.amount / 500) + 1) }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-yellow-400 fill-current hover-scale" />
                          ))}
                        </div>
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or enter custom amount:
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-lg hover:border-orange-300"
                      min="1"
                    />
                  </div>
                </div>
              </ScrollAnimation>

              {/* Step 2: Donor Details */}
              {getSelectedAmount() > 0 && (
                <ScrollAnimation animation="fadeInLeft" delay={200} className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-semibold mr-3 animate-pulse-custom">2</div>
                    <h2 className="text-2xl font-bold text-gray-800">Your Details</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
                      />
                    </div>
                  </div>
                </ScrollAnimation>
              )}

              {/* Step 3: Payment Method */}
              {donorName && donorPhone && (
                <ScrollAnimation animation="fadeInLeft" delay={400} className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-semibold mr-3 animate-pulse-custom">3</div>
                    <h2 className="text-2xl font-bold text-gray-800">Payment Method</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      className={`cursor-pointer border-2 rounded-xl p-6 transition-all duration-300 hover-lift hover-glow ${
                        paymentMethod === 'upi'
                          ? 'border-orange-500 bg-orange-50 shadow-lg'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <div className="flex items-center space-x-4">
                        <Smartphone className="h-8 w-8 text-blue-600" />
                        <div>
                          <div className="font-semibold text-gray-800 text-lg">UPI Payment</div>
                          <div className="text-sm text-gray-600">Quick & Secure</div>
                        </div>
                      </div>
                    </div>
                    
                    <div
                      className={`cursor-pointer border-2 rounded-xl p-6 transition-all duration-300 hover-lift hover-glow ${
                        paymentMethod === 'card'
                          ? 'border-orange-500 bg-orange-50 shadow-lg'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="flex items-center space-x-4">
                        <CreditCard className="h-8 w-8 text-green-600" />
                        <div>
                          <div className="font-semibold text-gray-800 text-lg">Card Payment</div>
                          <div className="text-sm text-gray-600">Debit/Credit</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              )}
            </div>

            {/* Donation Summary */}
            <div className="lg:col-span-1">
              <ScrollAnimation animation="fadeInRight" className="bg-white rounded-2xl shadow-lg p-8 sticky top-8 hover-lift">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Donation Summary</h3>
                
                {getSelectedAmount() > 0 ? (
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-orange-200">
                      <div className="text-4xl font-bold text-orange-600 mb-2 hover-scale">
                        ₹{getSelectedAmount().toLocaleString()}
                      </div>
                      <div className="text-gray-600">Your Sacred Contribution</div>
                    </div>

                    {donorName && (
                      <div className="bg-gray-50 p-4 rounded-lg hover-lift">
                        <h5 className="font-semibold text-gray-800 mb-2">Donor Details:</h5>
                        <div className="text-sm text-gray-700 space-y-1">
                          <div>Name: {donorName}</div>
                          <div>Phone: {donorPhone}</div>
                          {donorEmail && <div>Email: {donorEmail}</div>}
                        </div>
                      </div>
                    )}

                    {/* Donation Benefits */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 hover-lift">
                      <div className="flex items-center space-x-3 mb-4">
                        <Gift className="h-6 w-6 text-orange-600" />
                        <h4 className="font-bold text-orange-800">Your Donation Includes:</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-orange-700">
                        <li className="flex items-center space-x-2 hover-scale">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>Special prayers in your name</span>
                        </li>
                        <li className="flex items-center space-x-2 hover-scale">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>Digital donation certificate</span>
                        </li>
                        <li className="flex items-center space-x-2 hover-scale">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>Blessed prasadam (can be collected)</span>
                        </li>
                        <li className="flex items-center space-x-2 hover-scale">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>Divine blessings for prosperity</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={handleDonation}
                      disabled={loading || !getSelectedAmount() || !donorName || !donorPhone}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center btn-animate hover-glow ripple"
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

                    <div className="text-center text-sm text-gray-500">
                      🔒 Your donation is secure and will be used for temple maintenance and community service
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <Heart className="h-12 w-12 mx-auto mb-4 opacity-50 animate-float" />
                    <p>Select a donation amount to see the summary</p>
                  </div>
                )}
              </ScrollAnimation>
            </div>
          </div>

          {/* Impact Section */}
          <ScrollAnimation animation="fadeInUp" delay={600} className="mt-16 bg-white rounded-2xl shadow-lg p-8 hover-lift">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-blue-50 rounded-xl hover-lift">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-custom">
                  <span className="text-3xl">🏛️</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Temple Maintenance</h3>
                <p className="text-gray-600 text-sm">
                  Your donation helps maintain our sacred temple structure, ensuring it remains a beautiful place of worship for generations.
                </p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-xl hover-lift">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-custom">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Community Service</h3>
                <p className="text-gray-600 text-sm">
                  Support community programs, free meals for the needy, and educational initiatives that serve society.
                </p>
              </div>
              
              <div className="text-center p-6 bg-orange-50 rounded-xl hover-lift">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-custom">
                  <span className="text-3xl">🙏</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Spiritual Activities</h3>
                <p className="text-gray-600 text-sm">
                  Fund daily prayers, festivals, and spiritual programs that bring the community together in devotion.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default Donation;