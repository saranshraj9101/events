import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
  Calendar,
  Users,
  Star,
  Clock,
  MapPin,
  ArrowRight,
  Plus,
  TrendingUp
} from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    featuredEvents: 0,
  });
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [eventsResponse, featuredResponse] = await Promise.all([
        axios.get('/api/events?limit=100'),
        axios.get('/api/events?featured=true&limit=3')
      ]);

      const allEvents = eventsResponse.data.events;
      const now = new Date();

      setStats({
        totalEvents: allEvents.length,
        upcomingEvents: allEvents.filter(event => new Date(event.date) > now).length,
        featuredEvents: featuredResponse.data.events.length,
      });

      setFeaturedEvents(featuredResponse.data.events);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Academic': 'bg-blue-100 text-blue-800',
      'Cultural': 'bg-purple-100 text-purple-800',
      'Sports': 'bg-green-100 text-green-800',
      'Technical': 'bg-orange-100 text-orange-800',
      'Workshop': 'bg-yellow-100 text-yellow-800',
      'Seminar': 'bg-indigo-100 text-indigo-800',
      'Other': 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors['Other'];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-primary-100">
          Stay updated with the latest events at Bennett University
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEvents}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Featured Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.featuredEvents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/events"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="h-8 w-8 text-primary-600 mr-4" />
            <div>
              <h3 className="font-medium text-gray-900">View All Events</h3>
              <p className="text-sm text-gray-600">Browse and register for events</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
          </Link>

          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus className="h-8 w-8 text-primary-600 mr-4" />
              <div>
                <h3 className="font-medium text-gray-900">Manage Events</h3>
                <p className="text-sm text-gray-600">Create and manage events</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
            </Link>
          )}
        </div>
      </div>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Featured Events</h2>
            <Link
              to="/events"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <div key={event._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {event.description}
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(new Date(event.date), 'MMM dd, yyyy')}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.startTime} - {event.endTime}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.venue}
                  </div>
                </div>
                <Link
                  to={`/events/${event._id}`}
                  className="mt-3 inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">New events added</p>
              <p className="text-xs text-gray-600">Check out the latest events in your department</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Users className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Event registrations</p>
              <p className="text-xs text-gray-600">Register for upcoming events to secure your spot</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;