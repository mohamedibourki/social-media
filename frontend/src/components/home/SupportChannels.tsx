import { MessageCircle, Phone, Mail, Video, Calendar, HelpCircle } from 'lucide-react';

const channels = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7",
    buttonText: "Start Chat",
    accent: "blue"
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with a student advisor",
    availability: "Mon-Fri, 9AM-5PM",
    buttonText: "Call Now",
    accent: "green"
  },
  {
    icon: Video,
    title: "Video Consultation",
    description: "Schedule a virtual meeting",
    availability: "By Appointment",
    buttonText: "Book Session",
    accent: "purple"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us your questions anytime",
    availability: "24-48hr response",
    buttonText: "Send Email",
    accent: "indigo"
  },
  {
    icon: Calendar,
    title: "In-Person Meeting",
    description: "Visit our office for face-to-face support",
    availability: "Mon-Fri, 9AM-4PM",
    buttonText: "Schedule Visit",
    accent: "pink"
  },
  {
    icon: HelpCircle,
    title: "FAQ & Resources",
    description: "Find answers to common questions",
    availability: "Self-Service",
    buttonText: "Browse FAQs",
    accent: "orange"
  }
];

const accentColors = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  indigo: "from-indigo-500 to-indigo-600",
  pink: "from-pink-500 to-pink-600",
  orange: "from-orange-500 to-orange-600"
};

export default function SupportChannels() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get Support</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Multiple ways to reach us - choose the option that works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {channels.map((channel) => (
            <div
              key={channel.title}
              className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${accentColors[channel.accent as keyof typeof accentColors]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative p-8 bg-white group-hover:bg-opacity-90 transition-colors duration-300">
                <channel.icon className={`h-10 w-10 mb-6 text-${channel.accent}-500`} />
                <h3 className="text-xl font-semibold mb-2">{channel.title}</h3>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                <div className="text-sm text-gray-500 mb-6">
                  Available: {channel.availability}
                </div>
                <button className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r ${accentColors[channel.accent as keyof typeof accentColors]} text-white hover:opacity-90 transition-opacity`}>
                  {channel.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}