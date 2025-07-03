import { Users, Star, Award, Calendar } from "lucide-react";

const clubs = [
  {
    name: "Robotics Club",
    category: "Technology",
    members: 120,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    nextEvent: "Robot Building Workshop",
    eventDate: "March 25, 2024"
  },
  {
    name: "Photography Society",
    category: "Arts",
    members: 85,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848",
    nextEvent: "Campus Photo Walk",
    eventDate: "March 27, 2024"
  },
  {
    name: "Debate Club",
    category: "Academic",
    members: 65,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
    nextEvent: "Inter-University Debate",
    eventDate: "March 30, 2024"
  }
];

export default function Clubs() {
  return (
    <div className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Student Clubs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our vibrant community of student-led organizations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clubs.map((club) => (
            <div
              key={club.name}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="absolute top-4 right-4">
                <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{club.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {club.category}
                  </span>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">{club.members} members</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4">{club.name}</h3>

                <div className="border-t pt-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">{club.nextEvent}</p>
                      <p>{club.eventDate}</p>
                    </div>
                  </div>
                </div>

                <button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity">
                  Join Club
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors">
            Explore All Clubs
            <Award className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}