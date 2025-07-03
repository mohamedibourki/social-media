import { Bell, Pin, Calendar, ArrowRight } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Important: Final Exam Schedule Released",
    date: "March 20, 2024",
    type: "Academic",
    isPinned: true,
    priority: "high",
  },
  {
    id: 2,
    title: "Campus Health Advisory: COVID-19 Updates",
    date: "March 19, 2024",
    type: "Health",
    isPinned: true,
    priority: "high",
  },
  {
    id: 3,
    title: "Library Extended Hours During Finals Week",
    date: "March 18, 2024",
    type: "Facility",
    isPinned: false,
    priority: "medium",
  },
];

const priorityColors = {
  high: "bg-red-50 border-red-200 text-red-700",
  medium: "bg-yellow-50 border-yellow-200 text-yellow-700",
  low: "bg-green-50 border-green-200 text-green-700",
};

export default function Announcements() {
  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex flex-col items-center w-full gap-5">
            <h2 className="text-3xl font-bold mb-0 leading-tight text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Announcements
            </h2>
            <p className="text-gray-600">
              Stay updated with important notifications
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`relative overflow-hidden rounded-xl border p-6 transition-all hover:shadow-lg ${
                announcement.isPinned ? "bg-white" : "bg-gray-50"
              }`}
            >
              {announcement.isPinned && (
                <Pin className="absolute top-4 right-4 h-5 w-5 text-blue-600" />
              )}
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        priorityColors[
                          announcement.priority as keyof typeof priorityColors
                        ]
                      }`}
                    >
                      {announcement.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      <Calendar className="inline-block h-4 w-4 mr-1" />
                      {announcement.date}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">
                    {announcement.title}
                  </h3>
                  <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
            View All Announcements
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
