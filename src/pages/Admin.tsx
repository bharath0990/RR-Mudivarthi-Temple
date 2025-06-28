import React, { useState, useEffect } from 'react';
import { Calendar, Users, IndianRupee, TrendingUp, Clock, Download, Search, Filter, RefreshCw } from 'lucide-react';
import { getAllBookings, getTodaysBookings, getStats, searchBookings, updateBookingStatus, deleteBooking, BookingRecord } from '../utils/bookingStorage';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('today');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingRecord[]>([]);
  const [stats, setStats] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Load data on component mount and when tab changes
  useEffect(() => {
    loadData();
  }, [activeTab, dateRange]);

  // Filter bookings when search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchBookings(searchQuery);
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings);
    }
  }, [searchQuery, bookings]);

  const loadData = () => {
    setLoading(true);
    try {
      const allBookings = getAllBookings();
      const currentStats = getStats();
      
      setBookings(allBookings);
      setFilteredBookings(allBookings);
      setStats(currentStats);
      
      console.log('📊 Loaded bookings:', allBookings.length);
      console.log('📈 Current stats:', currentStats);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  const handleStatusUpdate = (bookingId: string, newStatus: BookingRecord['status']) => {
    if (updateBookingStatus(bookingId, newStatus)) {
      loadData(); // Refresh data
      alert(`Booking status updated to ${newStatus}`);
    } else {
      alert('Failed to update booking status');
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      if (deleteBooking(bookingId)) {
        loadData(); // Refresh data
        alert('Booking deleted successfully');
      } else {
        alert('Failed to delete booking');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getServiceTypeIcon = (serviceType: string) => {
    return serviceType === 'vehicle' ? '🚗' : '🙏';
  };

  const timeSlotData = [
    { time: '5:00 AM', booked: Math.min(100, Math.floor(Math.random() * 30) + 70), capacity: 100, revenue: Math.floor(Math.random() * 2000) + 3000 },
    { time: '7:00 AM', booked: Math.min(100, Math.floor(Math.random() * 30) + 80), capacity: 100, revenue: Math.floor(Math.random() * 2000) + 4000 },
    { time: '9:00 AM', booked: Math.min(100, Math.floor(Math.random() * 30) + 60), capacity: 100, revenue: Math.floor(Math.random() * 2000) + 3500 },
    { time: '11:00 AM', booked: Math.min(100, Math.floor(Math.random() * 30) + 50), capacity: 100, revenue: Math.floor(Math.random() * 2000) + 2500 },
    { time: '4:00 PM', booked: Math.min(100, Math.floor(Math.random() * 30) + 75), capacity: 100, revenue: Math.floor(Math.random() * 2000) + 4200 },
    { time: '6:00 PM', booked: Math.min(100, Math.floor(Math.random() * 30) + 85), capacity: 100, revenue: Math.floor(Math.random() * 2000) + 4800 },
    { time: '8:00 PM', booked: Math.min(100, Math.floor(Math.random() * 30) + 65), capacity: 100, revenue: Math.floor(Math.random() * 2000) + 3200 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage temple bookings and monitor performance</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'bookings', label: 'Bookings' },
                { id: 'slots', label: 'Time Slots' },
                { id: 'reports', label: 'Reports' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalBookings || 0}</p>
                    <p className="text-green-600 text-sm mt-1">
                      {bookings.length > 0 ? '+12% from last month' : 'No bookings yet'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Today's Bookings</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.todayBookings || 0}</p>
                    <p className="text-green-600 text-sm mt-1">
                      {getTodaysBookings().length > 0 ? '+8% from yesterday' : 'No bookings today'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-800">₹{(stats.totalRevenue || 0).toLocaleString()}</p>
                    <p className="text-green-600 text-sm mt-1">
                      {stats.totalRevenue > 0 ? '+15% from last month' : 'No revenue yet'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <IndianRupee className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Today's Revenue</p>
                    <p className="text-3xl font-bold text-gray-800">₹{(stats.todayRevenue || 0).toLocaleString()}</p>
                    <p className="text-green-600 text-sm mt-1">
                      {stats.todayRevenue > 0 ? '+5% from yesterday' : 'No revenue today'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Recent Bookings</h2>
                <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                  <span>View All</span>
                  <Download className="h-4 w-4" />
                </button>
              </div>
              
              {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Booking ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Service</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 10).map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono text-sm">{booking.bookingNumber}</td>
                          <td className="py-3 px-4">{booking.customerName}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span>{getServiceTypeIcon(booking.serviceType)}</span>
                              <span>{booking.serviceName}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{new Date(booking.date).toLocaleDateString()}</td>
                          <td className="py-3 px-4 font-semibold">₹{booking.amount}</td>
                          <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Bookings Yet</h3>
                  <p className="text-gray-500">Bookings will appear here once customers start making reservations.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                <h2 className="text-2xl font-bold text-gray-800">All Bookings ({filteredBookings.length})</h2>
                
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              
              {filteredBookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Booking ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Phone</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Service</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Count</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono text-sm">{booking.bookingNumber}</td>
                          <td className="py-3 px-4">{booking.customerName}</td>
                          <td className="py-3 px-4">{booking.phone}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span>{getServiceTypeIcon(booking.serviceType)}</span>
                              <span>{booking.serviceName}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{new Date(booking.date).toLocaleDateString()}</td>
                          <td className="py-3 px-4">{booking.count}</td>
                          <td className="py-3 px-4 font-semibold">₹{booking.amount}</td>
                          <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <select
                                value={booking.status}
                                onChange={(e) => handleStatusUpdate(booking.id, e.target.value as BookingRecord['status'])}
                                className="text-xs border border-gray-300 rounded px-2 py-1"
                              >
                                <option value="confirmed">Confirmed</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              <button
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="text-red-600 hover:text-red-700 text-xs px-2 py-1 border border-red-300 rounded hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    {searchQuery ? 'No matching bookings found' : 'No bookings available'}
                  </h3>
                  <p className="text-gray-500">
                    {searchQuery ? 'Try adjusting your search criteria' : 'Bookings will appear here once customers start making reservations'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Time Slots Tab */}
        {activeTab === 'slots' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Time Slot Management</h2>
                <div className="flex space-x-4">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="week">This Week</option>
                  </select>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                    Add Slot
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {timeSlotData.map((slot, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-600" />
                        <span className="font-semibold text-gray-800">{slot.time}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        slot.booked >= slot.capacity * 0.9 ? 'bg-red-100 text-red-800' :
                        slot.booked >= slot.capacity * 0.7 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {Math.round((slot.booked / slot.capacity) * 100)}% Full
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Booked:</span>
                        <span className="font-medium">{slot.booked}/{slot.capacity}</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                          style={{ width: `${(slot.booked / slot.capacity) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Revenue:</span>
                        <span className="font-medium text-green-600">₹{slot.revenue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Revenue Analytics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Revenue</span>
                    <span className="text-2xl font-bold text-green-600">₹{(stats.totalRevenue || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Vehicle Pooja Revenue</span>
                    <span className="text-xl font-semibold text-gray-800">
                      ₹{bookings.filter(b => b.serviceType === 'vehicle').reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Darshan Revenue</span>
                    <span className="text-xl font-semibold text-gray-800">
                      ₹{bookings.filter(b => b.serviceType === 'darshan').reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Service Distribution</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Vehicle Pooja</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${stats.vehicleBookings ? (stats.vehicleBookings / stats.totalBookings) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{stats.vehicleBookings || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Darshan Bookings</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${stats.darshanBookings ? (stats.darshanBookings / stats.totalBookings) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{stats.darshanBookings || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;