import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const events = [
  {
    title: "Spring Career Fair 2024",
    date: "March 25, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "University Center",
    attendees: 500,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
  },
  {
    title: "Student Leadership Summit",
    date: "April 2, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Memorial Hall",
    attendees: 250,
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846"
  },
  {
    title: "International Student Mixer",
    date: "April 10, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Global Commons",
    attendees: 150,
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94"
  }
];

export default function UpcomingEvents() {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4">Upcoming Events</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Join us for these exciting upcoming events and opportunities
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.title} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-600" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    {event.attendees}+ Attending
                  </div>
                </div>
                <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}