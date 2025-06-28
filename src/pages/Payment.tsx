import { ArrowLeft, Calendar, Car, CheckCircle, Heart, Smartphone } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type BookingType = {
  type: string;
  vehicleType?: { name: string; description: string };
  darshanType?: { name: string; description: string };
  vehicleCount?: number;
  ticketCount?: number;
  date?: string;
  donorName?: string;
  donorPhone?: string;
  bookingNumber?: string;
  donationId?: string;
  totalAmount?: number;
  amount?: number;
  email?: string;
  name?: string;
  phone?: string;
};

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking: BookingType = location.state?.booking;

  useEffect(() => {
    if (!booking) {
      navigate('/booking');
    }
  }, [booking, navigate]);

  if (!booking) return null;

  const isDonation = booking.type === 'donation';
  const isVehicleBooking = booking.type === 'vehicle';

  let serviceData, count, backLink;
  if (isDonation) {
    serviceData = {
      name: 'Temple Donation',
      description: 'Sacred contribution for temple maintenance and community service',
    };
    count = 1;
    backLink = '/';
  } else if (isVehicleBooking) {
    serviceData = booking.vehicleType!;
    count = booking.vehicleCount!;
    backLink = '/vehicle-booking';
  } else {
    serviceData = booking.darshanType!;
    count = booking.ticketCount!;
    backLink = '/booking';
  }

  const handleRazorpayPayment = () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Replace this
      amount: (booking.totalAmount || booking.amount || 0) * 100,
      currency: 'INR',
      name: isDonation ? 'Temple Donation' : 'Service Booking',
      description: 'Secure Payment',
      image: '/logo.png',
      handler: function (response: RazorpayResponse) {
        const paymentData = {
          ...booking,
          paymentMethod: 'razorpay',
          transactionId: response.razorpay_payment_id,
          paymentStatus: 'success',
          paymentTimestamp: new Date().toISOString(),
        };
        navigate('/confirmation', { state: { booking: paymentData } });
      },
      prefill: {
        name: booking.donorName || booking.name || 'User',
        email: booking.email || 'user@example.com',
        contact: booking.donorPhone || booking.phone || '9999999999',
      },
      notes: {
        address: 'Temple Services, India',
      },
      theme: {
        color: isDonation ? '#fb923c' : isVehicleBooking ? '#16a34a' : '#dc2626',
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(backLink)}
            className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to {isDonation ? 'Home' : isVehicleBooking ? 'Vehicle Booking' : 'Booking'}
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            Complete {isDonation ? 'Donation' : 'Payment'}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pay via Razorpay</h2>
          <div
            className="flex items-center justify-between border-2 border-orange-500 bg-orange-50 rounded-xl p-6 cursor-pointer"
            onClick={handleRazorpayPayment}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Razorpay Payment</h3>
                <p className="text-gray-600 text-sm">UPI / Card / NetBanking</p>
              </div>
            </div>
            <CheckCircle className="h-5 w-5 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            {isDonation ? 'Donation' : 'Order'} Summary
          </h3>
          <div className="space-y-2 mb-6">
            <div className="flex items-center mb-2">
              {isDonation ? (
                <Heart className="h-5 w-5 text-orange-600 mr-2" />
              ) : isVehicleBooking ? (
                <Car className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <Calendar className="h-5 w-5 text-red-600 mr-2" />
              )}
              <span className="font-semibold">{serviceData.name}</span>
            </div>
            <p className="text-gray-600 text-sm">{serviceData.description}</p>
            {!isDonation && (
              <>
                <p className="text-sm">Date: {new Date(booking.date!).toLocaleDateString()}</p>
                <p className="text-sm">
                  {isVehicleBooking ? 'Vehicles' : 'Tickets'}: {count}
                </p>
              </>
            )}
            {isDonation && (
              <>
                <p className="text-sm">Donor: {booking.donorName}</p>
                <p className="text-sm">Phone: {booking.donorPhone}</p>
              </>
            )}
            <p className="text-sm">
              ID: <span className="font-mono">{booking.donationId || booking.bookingNumber}</span>
            </p>
            <p className="text-xl font-bold mt-4">
              Total: ₹{(booking.totalAmount || booking.amount).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
