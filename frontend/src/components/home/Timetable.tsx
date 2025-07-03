import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

const schedule = [
  {
    time: "9:00 AM",
    course: "Advanced Mathematics",
    location: "Hall A-101",
    professor: "Dr. Smith",
    type: "Lecture"
  },
  {
    time: "11:00 AM",
    course: "Computer Science",
    location: "Lab B-202",
    professor: "Prof. Johnson",
    type: "Laboratory"
  },
  {
    time: "2:00 PM",
    course: "Physics",
    location: "Hall C-303",
    professor: "Dr. Brown",
    type: "Tutorial"
  }
];

export default function Timetable() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold">Class Schedule</h2>
            <p className="text-gray-600">Your personalized weekly timetable</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="font-medium">March 20, 2024</span>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-[100px_1fr] divide-x divide-gray-200">
            <div className="bg-gray-50">
              {timeSlots.map((time) => (
                <div key={time} className="h-24 flex items-center justify-center border-b border-gray-200">
                  <span className="text-sm text-gray-500">{time}</span>
                </div>
              ))}
            </div>
            
            <div className="relative min-h-[768px]">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className="absolute left-2 right-2 p-4 rounded-lg bg-blue-50 border border-blue-100 hover:shadow-md transition-shadow"
                  style={{
                    top: `${timeSlots.indexOf(item.time) * 96}px`,
                    height: '88px'
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-blue-900">{item.course}</h4>
                      <div className="flex items-center mt-1 space-x-3 text-sm text-blue-700">
                        <span>{item.location}</span>
                        <span>•</span>
                        <span>{item.professor}</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded">
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}