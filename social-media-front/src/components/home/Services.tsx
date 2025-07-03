import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Academic Support',
    description: 'Get help with your studies through tutoring, writing centers, and academic coaching.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
  },
  {
    title: 'Career Development',
    description: 'Access career counseling, job search resources, and internship opportunities.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
  },
  {
    title: 'Wellness Programs',
    description: 'Take care of your physical and mental health with our comprehensive wellness services.',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f',
  },
];

export default function Services() {
  return (
    <div className="py-24 bg-gray-50 relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-gray-900/[0.2] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Our Services
        </h2>
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto text-lg">
          Comprehensive support services designed to enhance your academic journey and personal growth
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.title}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <button className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 transition-colors group/button">
                  Learn more 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}