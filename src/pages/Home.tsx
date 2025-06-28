import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Star, Users, Shield, Smartphone, ArrowRight, CheckCircle, Car, Heart } from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimation';

const Home = () => {
  const features = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Easy Booking",
      description: "Book your darshan slots instantly with real-time availability"
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: "Vehicle Pooja",
      description: "Sacred vehicle blessings for safe and prosperous journeys"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Payments",
      description: "Safe and secure UPI payments with instant confirmation"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Digital Tickets",
      description: "QR code based entry system for hassle-free temple visits"
    }
  ];

  const services = [
    {
      name: "Darshan Booking",
      description: "Traditional temple visits with divine blessings",
      image: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=400",
      link: "/booking",
      color: "from-red-600 to-orange-600"
    },
    {
      name: "Vehicle Pooja",
      description: "Sacred blessings for your vehicles and safe travels",
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400",
      link: "/vehicle-booking",
      color: "from-green-600 to-blue-600"
    }
  ];

  const darshanTypes = [
    {
      name: "General Darshan",
      price: "₹50",
      duration: "30 mins",
      description: "Regular temple visit with basic facilities",
      features: ["Temple entry", "Basic darshan", "Prasadam"]
    },
    {
      name: "VIP Darshan",
      price: "₹200",
      duration: "45 mins",
      description: "Priority access with special facilities",
      features: ["Skip the queue", "Closer darshan", "Special prasadam", "Photo allowed"],
      popular: true
    },
    {
      name: "Special Pooja",
      price: "₹500",
      duration: "60 mins",
      description: "Personalized pooja with priest",
      features: ["Private session", "Customized rituals", "Blessed items", "Photo & video allowed"]
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      comment: "Booking was so easy! The QR code system made entry completely hassle-free. Highly recommended!"
    },
    {
      name: "Rajesh Kumar",
      location: "Mumbai",
      rating: 5,
      comment: "The vehicle pooja was beautifully conducted. My car feels blessed and protected now."
    },
    {
      name: "Anita Patel",
      location: "Ahmedabad",
      rating: 5,
      comment: "Perfect for busy schedules. Could book in advance and avoid long queues."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-orange-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-yellow-400 opacity-10"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <ScrollAnimation animation="fadeInLeft" className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Divine <span className="text-yellow-300 animate-pulse-custom">Blessings</span> Await You
                </h1>
                <p className="text-xl text-red-100 leading-relaxed">
                  Experience the sacred journey with our seamless online booking system. 
                  Reserve your darshan slot or book vehicle pooja for divine protection.
                </p>
              </ScrollAnimation>
              
              <ScrollAnimation animation="fadeInLeft" delay={200} className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/booking"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 font-semibold rounded-xl hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg btn-animate hover-glow"
                >
                  Book Darshan Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/vehicle-booking"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-red-800 transition-all duration-300 btn-animate"
                >
                  <Car className="mr-2 h-5 w-5" />
                  Vehicle Pooja
                </Link>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInLeft" delay={400} className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center hover-scale">
                  <div className="text-3xl font-bold text-yellow-300">5000+</div>
                  <div className="text-red-200">Happy Devotees</div>
                </div>
                <div className="text-center hover-scale">
                  <div className="text-3xl font-bold text-yellow-300">15+</div>
                  <div className="text-red-200">Years of Service</div>
                </div>
                <div className="text-center hover-scale">
                  <div className="text-3xl font-bold text-yellow-300">99%</div>
                  <div className="text-red-200">Satisfaction Rate</div>
                </div>
              </ScrollAnimation>
            </div>

            <ScrollAnimation animation="fadeInRight" className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl overflow-hidden hover-lift animate-float">
                <img 
                  src="https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Temple Interior" 
                  className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white text-red-800 p-6 rounded-xl shadow-lg hover-lift animate-scale-in">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-pulse-custom">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Instant Confirmation</div>
                    <div className="text-sm text-gray-600">Get your tickets immediately</div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Sacred Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our range of spiritual services designed to bring divine blessings into your life
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <ScrollAnimation key={index} animation="scaleIn" delay={index * 200}>
                <Link
                  to={service.link}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover-lift hover-shine"
                >
                  <div className="relative h-64">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                    <p className="text-gray-200 mb-4">{service.description}</p>
                    <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${service.color} rounded-lg font-semibold btn-animate`}>
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Online Booking?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the convenience of digital temple services with modern technology and traditional values
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 150} className="group">
                <div className="bg-white p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover-lift">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 animate-pulse-custom">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Darshan Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Darshan Packages</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect darshan experience that suits your spiritual needs and preferences
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {darshanTypes.map((type, index) => (
              <ScrollAnimation key={index} animation="scaleIn" delay={index * 200}>
                <div className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover-lift ${type.popular ? 'ring-4 ring-yellow-400 animate-glow' : ''}`}>
                  {type.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 px-4 py-2 rounded-bl-xl font-semibold text-sm animate-pulse-custom">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{type.name}</h3>
                      <div className="text-4xl font-bold text-red-600 mb-2 hover-scale">{type.price}</div>
                      <div className="text-gray-600">{type.duration}</div>
                    </div>
                    
                    <p className="text-gray-600 text-center mb-6">{type.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {type.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3 hover-scale">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      to="/booking"
                      className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 btn-animate hover-shine ${
                        type.popular
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 hover:from-yellow-300 hover:to-orange-400'
                          : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600'
                      }`}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Devotees Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied devotees about their spiritual journey and booking experience
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 200}>
                <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover-lift">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current hover-scale" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.location}</div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-800 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready for Your Spiritual Journey?</h2>
            <p className="text-xl text-red-100 mb-8">
              Don't wait in long queues. Book your darshan or vehicle pooja online and experience divine blessings with comfort and convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="inline-flex items-center px-8 py-4 bg-white text-red-800 font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg btn-animate hover-glow"
              >
                Book Darshan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/vehicle-booking"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-red-800 transform hover:scale-105 transition-all duration-300 btn-animate"
              >
                <Car className="mr-2 h-5 w-5" />
                Vehicle Pooja
              </Link>
              <Link
                to="/donation"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 font-semibold rounded-xl hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg btn-animate hover-glow"
              >
                <Heart className="mr-2 h-5 w-5" />
                Make Donation
              </Link>
            </div>
            <div className="mt-8 text-red-200 text-sm animate-pulse-custom">
              Secure payments • Instant confirmation • 24/7 support
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};

export default Home;