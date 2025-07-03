import { Calendar, Book, Users, HeartPulse, Award, HelpCircle } from 'lucide-react';

const quickLinks = [
  { icon: Calendar, title: 'Academic Calendar', description: 'Important dates and deadlines' },
  { icon: Book, title: 'Course Registration', description: 'Register for classes and view schedules' },
  { icon: Users, title: 'Student Organizations', description: 'Get involved on campus' },
  { icon: HeartPulse, title: 'Health Services', description: 'Medical and mental health support' },
  { icon: Award, title: 'Career Services', description: 'Career guidance and opportunities' },
  { icon: HelpCircle, title: 'Student Support', description: 'Academic and personal assistance' },
];

export default function QuickLinks() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickLinks.map((link) => (
            <div
              key={link.title}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <link.icon className="h-8 w-8 text-blue-600" />
                <h3 className="ml-3 text-xl font-semibold">{link.title}</h3>
              </div>
              <p className="text-gray-600">{link.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}