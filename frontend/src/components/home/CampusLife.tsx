import { Play } from "lucide-react";

const features = [
  {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    title: "Student Organizations",
    description: "Join over 200+ student clubs and organizations"
  },
  {
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
    title: "Campus Activities",
    description: "Participate in exciting events throughout the year"
  },
  {
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
    title: "Global Community",
    description: "Connect with students from around the world"
  }
];

export default function CampusLife() {
  return (
    <div className="py-20 bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#0284c7)] opacity-75" />
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Experience Campus Life</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Discover the vibrant community and endless opportunities waiting for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-16 h-16 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors">
                    <Play className="h-8 w-8 text-blue-600 ml-1" />
                  </button>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
            Explore Campus Life
          </button>
        </div>
      </div>
    </div>
  );
}