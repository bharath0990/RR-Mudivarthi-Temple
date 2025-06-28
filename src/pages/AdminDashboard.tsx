import React, { useState, useEffect } from 'react';
import { Calendar, Users, IndianRupee, TrendingUp, Clock, Download, Search, Filter, Car, Eye, Edit, Trash2, Plus, BarChart3, PieChart, Activity, RefreshCw } from 'lucide-react';
import { getAllBookings, getTodaysBookings, getStats, searchBookings, updateBookingStatus, deleteBooking, getBookingsByServiceType, BookingRecord } from '../utils/bookingStorage';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
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
      if (activeTab === 'vehicle') {
        setFilteredBookings(getBookingsByServiceType('vehicle'));
      } else if (activeTab === 'darshan') {
        setFilteredBookings(getBookingsByServiceType('darshan'));
      } else {
        setFilteredBookings(bookings);
      }
    }
  }, [searchQuery, bookings, activeTab]);

  const loadData = () => {
    setLoading(true);
    try {
      const allBookings = getAllBookings();
      const currentStats = getStats();
      
      setBookings(allBookings);
      setStats(currentStats);
      
      // Set filtered bookings based on active tab
      if (activeTab === 'vehicle') {
        setFilteredBookings(getBookingsByServiceType('vehicle'));
      } else if (activeTab === 'darshan') {
        setFilteredBookings(getBookingsByServiceType('darshan'));
      } else {
        setFilteredBookings(allBookings);
      }
      
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

  const getBookingTypeIcon = (type: string) => {
    return type === 'vehicle' ? <Car className="h-4 w-4" /> : <Calendar className="h-4 w-4" />;
  };

  const vehicleBookings = getBookingsByServiceType('vehicle');
  const darshanBookings = getBookingsByServiceType('darshan');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Comprehensive temple management system</p>
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
                { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
                { id: 'darshan', label: 'Darshan Bookings', icon: <Calendar className="h-4 w-4" /> },
                { id: 'vehicle', label: 'Vehicle Pooja', icon: <Car className="h-4 w-4" /> },
                { id: 'analytics', label: 'Analytics', icon: <PieChart className="h-4 w-4" /> },
                { id: 'settings', label: 'Settings', icon: <Activity className="h-4 w-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
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
                    <p className="text-gray-600 text-sm">Vehicle Bookings</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.vehicleBookings || 0}</p>
                    <p className="text-green-600 text-sm mt-1">
                      {vehicleBookings.length > 0 ? '+18% from last month' : 'No vehicle bookings'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Car className="h-6 w-6 text-green-600" />
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
                      {stats.todayRevenue > 0 ? '+8% from yesterday' : 'No revenue today'}
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
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
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
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
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
                              {getBookingTypeIcon(booking.serviceType)}
                              <span className="capitalize">{booking.serviceType}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{booking.serviceName}</td>
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

        {/* Vehicle Pooja Tab */}
        {activeTab === 'vehicle' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                <h2 className="text-2xl font-bold text-gray-800">Vehicle Pooja Bookings ({vehicleBookings.length})</h2>
                
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <Plus className="h-4 w-4" />
                    <span>Add Booking</span>
                  </button>
                </div>
              </div>
              
              {vehicleBookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Booking ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Vehicle Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Phone</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date & Time</th>
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
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Car className="h-4 w-4 text-gray-600" />
                              <span>{booking.serviceName}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{booking.phone}</td>
                          <td className="py-3 px-4">
                            <div className="text-sm">
                              <div>{new Date(booking.date).toLocaleDateString()}</div>
                              <div className="text-gray-500">{booking.time || '10:00 AM'}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-semibold">₹{booking.amount}</td>
                          <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-700 p-1">
                                <Eye className="h-4 w-4" />
                              </button>
                              <select
                                value={booking.status}
                                onChange={(e) => handleStatusUpdate(booking.id, e.target.value as BookingRecord['status'])}
                                className="text-xs border border-gray-300 rounded px-1 py-1"
                              >
                                <option value="confirmed">Confirmed</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              <button
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="text-red-600 hover:text-red-700 p-1"
                              >
                                <Trash2 className="h-4 w-4" />
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
                  <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Vehicle Bookings Yet</h3>
                  <p className="text-gray-500">Vehicle pooja bookings will appear here once customers start making reservations.</p>
                </div>
              )}
            </div>

            {/* Vehicle Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Vehicle Types</h3>
                <div className="space-y-3">
                  {vehicleBookings.length > 0 ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Car/Sedan</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Motorcycle</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Truck</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 text-sm">No data available</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Schedule</h3>
                <div className="space-y-3">
                  {getTodaysBookings().filter(b => b.serviceType === 'vehicle').length > 0 ? (
                    getTodaysBookings().filter(b => b.serviceType === 'vehicle').slice(0, 3).map((booking, index) => (
                      <div key={booking.id} className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                        <Clock className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">{booking.time || '10:00 AM'}</p>
                          <p className="text-xs text-gray-600">{booking.serviceName} - {booking.customerName}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No vehicle bookings today</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Vehicle Pooja</span>
                    <span className="text-green-600 font-semibold">
                      ₹{vehicleBookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Darshan Bookings</span>
                    <span className="text-blue-600 font-semibold">
                      ₹{darshanBookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-gray-800">Total</span>
                      <span className="text-gray-800">₹{(stats.totalRevenue || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Darshan Bookings Tab */}
        {activeTab === 'darshan' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
              <h2 className="text-2xl font-bold text-gray-800">Darshan Bookings ({darshanBookings.length})</h2>
              
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {darshanBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Booking ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Darshan Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Phone</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Tickets</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(searchQuery ? filteredBookings : darshanBookings).map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-sm">{booking.bookingNumber}</td>
                        <td className="py-3 px-4">{booking.customerName}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-600" />
                            <span>{booking.serviceName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{booking.phone}</td>
                        <td className="py-3 px-4">{new Date(booking.date).toLocaleDateString()}</td>
                        <td className="py-3 px-4">{booking.count}</td>
                        <td className="py-3 px-4 font-semibold">₹{booking.amount}</td>
                        <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <select
                              value={booking.status}
                              onChange={(e) => handleStatusUpdate(booking.id, e.target.value as BookingRecord['status'])}
                              className="text-xs border border-gray-300 rounded px-1 py-1"
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="pending">Pending</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="text-red-600 hover:text-red-700 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
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
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No Darshan Bookings Yet</h3>
                <p className="text-gray-500">Darshan bookings will appear here once customers start making reservations.</p>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
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
                      ₹{vehicleBookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Darshan Revenue</span>
                    <span className="text-xl font-semibold text-gray-800">
                      ₹{darshanBookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Booking Distribution</h3>
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

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h2>
            <p className="text-gray-600">Configure temple settings, pricing, and system preferences.</p>
            {/* Add settings content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;