import { MapPin, Calendar, ExternalLink } from 'lucide-react';

const conferences = [
  {
    title: "International Student Research Symposium",
    date: "April 15-17, 2024",
    location: "University Conference Center",
    attendees: 500,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    tags: ["Research", "Global", "Innovation"]
  },
  {
    title: "Future of Education Summit",
    date: "April 20-21, 2024",
    location: "Grand Hall",
    attendees: 300,
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
    tags: ["Education", "Technology", "Future"]
  },
  {
    title: "Student Leadership Conference",
    date: "April 25-26, 2024",
    location: "Student Center",
    attendees: 250,
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
    tags: ["Leadership", "Development", "Network"]
  }
];

export default function Conferences() {
  return (
    <div className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Upcoming Conferences</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expand your horizons at our academic conferences and symposiums
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {conferences.map((conference) => (
            <div
              key={conference.title}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={conference.image}
                  alt={conference.title}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-blue-600">
                    {conference.attendees}+ Attendees
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600 transition-colors">
                  {conference.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                    {conference.date}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3 text-blue-500" />
                    {conference.location}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {conference.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Register Now
                  </button>
                  <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <ExternalLink className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}