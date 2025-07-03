"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Download,
  Calendar,
  Check,
  Printer,
  ChevronLeft,
  ChevronRight,
  Info,
  AlertCircle,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Material = {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadDate?: string;
  size?: string;
};

type Assignment = {
  title: string;
  dueDate: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  requirements?: string[];
  presentationTime?: string;
  evaluationCriteria?: string[];
};

type Class = {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  color: string;
  courseType?: string;
  duration?: string;
  description?: string;
  materials?: Material[];
  nextAssignment?: Assignment;
  attendance?: Attendance[];
  notes?: string[];
  customColor?: string;
};

type ScheduleItem = {
  time: string;
  monday?: Class;
  tuesday?: Class;
  wednesday?: Class;
  thursday?: Class;
  friday?: Class;
  saturday?: Class;
};

type Attendance = {
  date: string;
  status: "present" | "absent" | "late";
  notes?: string;
};

const schedule: ScheduleItem[] = [
  {
    time: "8:30 AM",
    tuesday: {
      id: "1",
      subject: "Francais",
      teacher: "Elazouzi Chama",
      room: "salle de cours 2",
      courseType: "Exam",
      color: "bg-blue-200",
      nextAssignment: {
        title: "French Literature Essay",
        dueDate: "2024-03-25",
        description: "Write a 500-word essay on Victor Hugo's Les Misérables",
        status: "pending",
      },
    },
    thursday: {
      id: "2",
      subject: "CSS",
      teacher: "Remmach Chaimae",
      room: "salle multimeia 3",
      color: "bg-red-200",
      nextAssignment: {
        title: "Responsive Design Project",
        dueDate: "2024-03-22",
        description: "Create a responsive landing page using Flexbox and Grid",
        status: "in-progress",
      },
    },
    friday: {
      id: "3",
      subject: "English",
      teacher: "Monia Khair",
      room: "salle de cours 2",
      color: "bg-yellow-200",
      courseType: "Exam",
    },
  },
  {
    time: "11:10 AM",
    tuesday: {
      id: "1",
      subject: "PIE",
      teacher: "Ech-Chouyakhi Driss",
      room: "salle de cours 2",
      courseType: "Exam",
      color: "bg-orange-200",
      nextAssignment: {
        title: "Project Presentation",
        dueDate: "2024-11-19",
        description:
          "Develop an innovative solution for a school-related challenge through: \n\n(1) Problem identification and analysis. \n(2) Research-based solution design. \n(3) Prototype development. \n(4) Implementation proposal. \n\nThe solution should demonstrate feasibility, sustainability, and measurable impact.",
        status: "in-progress",
        requirements: [
          "Problem analysis documentation",
          "Research findings report",
          "Prototype documentation",
          "Implementation plan",
          "Project presentation slides",
        ],
        presentationTime: "5 minutes",
        evaluationCriteria: [
          "Problem identification clarity",
          "Research-based solution design",
          "Prototype feasibility",
          "Implementation strategy",
          "Solution sustainability",
          "Measurable impact potential",
        ],
      },
    },
    wednesday: {
      id: "2",
      subject: "POO",
      teacher: "El Kouari Omaima",
      room: "salle multimeia 2",
      color: "bg-green-200",
    },
    thursday: {
      id: "3",
      subject: "POO",
      teacher: "El Kouari Omaima",
      room: "salle multimeia 2",
      color: "bg-green-200",
    },
    friday: {
      id: "4",
      subject: "POO",
      teacher: "El Kouari Omaima",
      room: "salle multimeia 2",
      color: "bg-green-200",
    },
  },
  {
    time: "1:30 PM",
    monday: {
      id: "1",
      subject: "Algorithms",
      teacher: "Khezane Abdelmoutaleb",
      room: "salle multimeia 3",
      color: "bg-purple-200",
    },
    tuesday: {
      id: "2",
      subject: "POO",
      teacher: "El Kouari Omaima",
      room: "salle multimeia 2",
      color: "bg-green-200",
    },
    wednesday: {
      id: "3",
      subject: "CSS",
      teacher: "Remmach Chaimae",
      room: "salle multimeia 3",
      color: "bg-red-200",
    },
    thursday: {
      id: "4",
      subject: "Algorithms",
      teacher: "Khezane Abdelmoutaleb",
      room: "salle multimeia 3",
      color: "bg-purple-200",
      courseType: "Exam",
    },
  },
  {
    time: "4:10 PM",
    monday: {
      id: "1",
      subject: "Algorithms",
      teacher: "Khezane Abdelmoutaleb",
      room: "salle multimeia 3",
      color: "bg-purple-200",
    },
    wednesday: {
      id: "2",
      subject: "CSS",
      teacher: "Remmach Chaimae",
      room: "salle multimeia 3",
      color: "bg-red-200",
    },
  },
];

// Helper function to pad numbers with leading zeros
const padNumber = (num: number): string => {
  return num.toString().padStart(2, "0");
};

// Helper function to format date to iCal format
const formatToICSDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());
  const hours = padNumber(date.getHours());
  const minutes = padNumber(date.getMinutes());
  return `${year}${month}${day}T${hours}${minutes}00`;
};

// Helper function to get the next occurrence of a weekday
const getNextDayOccurrence = (
  dayName: string,
  referenceDate: Date = new Date()
): Date => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const referenceDay = referenceDate.getDay();
  const targetDay = days.indexOf(dayName.toLowerCase());

  const daysUntilTarget = (targetDay + 7 - referenceDay) % 7;
  const nextOccurrence = new Date(referenceDate);
  nextOccurrence.setDate(referenceDate.getDate() + daysUntilTarget);
  return nextOccurrence;
};

// Function to parse time string to Date object
const parseTimeString = (timeStr: string, date: Date): Date => {
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
};

// Function to generate ICS file content for a single class
const generateICSFile = (
  classItem: Class,
  dayName: string,
  timeSlot: string
): string => {
  // Get the next occurrence of this class's day
  const nextOccurrence = getNextDayOccurrence(dayName);

  // Parse the start time
  const startTime = parseTimeString(timeSlot, nextOccurrence);

  // Set end time to 2 hours after start time (adjust as needed)
  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + 2);

  // Generate a unique identifier
  const uid = `${classItem.id}-${dayName}-${timeSlot}`.replace(/\s+/g, "");

  // Create the ICS content
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Your School//Class Schedule//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatToICSDate(new Date())}`,
    `DTSTART:${formatToICSDate(startTime)}`,
    `DTEND:${formatToICSDate(endTime)}`,
    "RRULE:FREQ=WEEKLY",
    `SUMMARY:${classItem.subject}`,
    `DESCRIPTION:Teacher: ${classItem.teacher}\\nRoom: ${classItem.room}${
      classItem.description ? `\\n\\n${classItem.description}` : ""
    }`,
    `LOCATION:${classItem.room}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return icsContent;
};

export default function ClassSchedule() {
  const [, setSelectedClass] = useState<Class | null>(null);
  const [, setAttendance] = useState<Record<string, Attendance>>({});
  const [filterSubject, setFilterSubject] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [selectedWeek, setSelectedWeek] = useState(new Date());

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "in-progress":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const handleAttendance = (classId: string, status: Attendance["status"]) => {
    setAttendance((prev) => ({
      ...prev,
      [classId]: {
        date: new Date().toISOString(),
        status,
        notes: "",
      },
    }));
  };

  const exportScheduleToCalendar = () => {
    let allEvents: string[] = [];

    // Generate ICS content for each class
    filteredSchedule.forEach((scheduleItem) => {
      days.forEach((day) => {
        const lowercaseDay = day.toLowerCase() as keyof ScheduleItem;
        const classItem = scheduleItem[lowercaseDay] as Class | undefined;

        if (classItem) {
          const icsContent = generateICSFile(classItem, day, scheduleItem.time);
          // Remove the VCALENDAR wrapper for all but the first event
          const eventContent = icsContent
            .replace(
              "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Your School//Class Schedule//EN\r\n",
              ""
            )
            .replace("\r\nEND:VCALENDAR", "");
          allEvents.push(eventContent);
        }
      });
    });

    // Combine all events into a single calendar
    const completeICS = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Your School//Class Schedule//EN",
      ...allEvents,
      "END:VCALENDAR",
    ].join("\r\n");

    // Create and trigger download
    const blob = new Blob([completeICS], {
      type: "text/calendar;charset=utf-8",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "class_schedule.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const uniqueSubjects = Array.from(
    new Set(
      schedule.flatMap((item) =>
        Object.values(item)
          .filter(
            (value): value is Class =>
              typeof value === "object" && value !== null && "subject" in value
          )
          .map((classItem) => classItem.subject)
      )
    )
  );

  const filteredSchedule = schedule.map((item) => ({
    ...item,
    ...Object.fromEntries(
      Object.entries(item).map(([key, value]) => {
        if (typeof value === "object" && value && "subject" in value) {
          if (filterSubject && value.subject !== filterSubject)
            return [key, undefined];
          if (
            searchTerm &&
            !value.subject.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return [key, undefined];
          }
        }
        return [key, value];
      })
    ),
  }));

  const isToday = (day: string) => {
    const today = new Date().getDay();
    const dayMap: Record<string, number> = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };
    return today === dayMap[day.toLowerCase()];
  };

  const isUpcoming = (date: string) => {
    const dueDate = new Date(date);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const navigateWeek = (direction: "prev" | "next") => {
    setSelectedWeek((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
      return newDate;
    });
  };

  const printSchedule = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mt-6">
          Weekly Class Schedule
        </h1>

        <div className="mt-6 flex flex-wrap gap-4 justify-center items-center">
          <div className="flex items-center gap-4">
            {/* Search Input with Shadcn UI styling */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search classes..."
                className="h-10 w-[280px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background 
                  file:border-0 file:bg-transparent file:text-sm file:font-medium 
                  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
                  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                  pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Subject Filter with Shadcn UI styling */}
            <select
              className="h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background 
                file:border-0 file:bg-transparent file:text-sm file:font-medium 
                placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={filterSubject || ""}
              onChange={(e) => setFilterSubject(e.target.value || null)}
            >
              <option value="">All Subjects</option>
              {uniqueSubjects.map((subject) => (
                <option key={subject} value={subject} className="py-1.5">
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateWeek("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="font-medium">
              {selectedWeek.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(
                selectedWeek.getTime() + 6 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateWeek("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
            }
          >
            {viewMode === "grid" ? "List View" : "Grid View"}
          </Button>

          <Button variant="outline" size="sm" onClick={printSchedule}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={exportScheduleToCalendar}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Color Legend */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        {[
          { subject: "Francais", color: "bg-blue-200" },
          { subject: "CSS", color: "bg-red-200" },
          { subject: "English", color: "bg-yellow-200" },
          { subject: "PIE", color: "bg-orange-200" },
          { subject: "POO", color: "bg-green-200" },
          { subject: "Algorithms", color: "bg-purple-200" },
        ].map((item) => (
          <div key={item.subject} className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded ${item.color}`} />
            <span className="text-sm text-gray-600">{item.subject}</span>
          </div>
        ))}
      </div>

      {/* Upcoming Assignments Preview */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Upcoming Assignments</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {schedule
            .flatMap((item) =>
              Object.values(item)
                .filter(
                  (value): value is Class =>
                    typeof value === "object" &&
                    value !== null &&
                    "nextAssignment" in value
                )
                .map((classItem) => ({
                  subject: classItem.subject,
                  ...classItem.nextAssignment!,
                }))
            )
            .filter((assignment) => new Date(assignment.dueDate) > new Date())
            .sort(
              (a, b) =>
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            )
            .slice(0, 3)
            .map((assignment, index) => (
              <div
                key={index}
                className="min-w-[250px] p-3 border rounded-lg bg-white shadow-sm"
              >
                <div className="font-medium">{assignment.subject}</div>
                <div className="text-sm text-gray-600">{assignment.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </div>
              </div>
            ))}
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-7 gap-3 bg-white p-6 rounded-xl shadow-lg">
          <div className="font-semibold text-gray-700 text-center py-2">
            Time
          </div>
          {days.map((day) => (
            <div
              key={day}
              className="font-semibold text-gray-700 text-center py-2 bg-gray-50 rounded-md"
            >
              {day}
            </div>
          ))}

          {filteredSchedule.map((item, index) => (
            <React.Fragment key={index}>
              <div className="font-medium text-gray-600 text-center py-2">
                {item.time}
              </div>
              {days.map((day) => {
                const lowercaseDay = day.toLowerCase() as keyof ScheduleItem;
                const classItem = item[lowercaseDay] as Class | undefined;
                return (
                  <div
                    key={`${index}-${day}`}
                    className={`h-28 border rounded-lg p-1 bg-gray-50 hover:bg-gray-100 transition-colors
                      ${isToday(day) ? "ring-2 ring-blue-500" : ""}`}
                  >
                    {classItem && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className={`w-full h-full ${classItem.color} rounded-md p-3 text-left hover:opacity-90 transition-all shadow-sm hover:shadow-md`}
                            onClick={() => setSelectedClass(classItem)}
                          >
                            <div className="font-semibold text-gray-800 mb-1">
                              {classItem.subject}
                            </div>
                            <div className="text-xs text-gray-600 mb-1">
                              {classItem.teacher}
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="w-3 h-3 inline ml-1" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="text-xs">
                                    <div>
                                      Email:{" "}
                                      {classItem.teacher
                                        .toLowerCase()
                                        .replace(" ", ".")}
                                      @school.com
                                    </div>
                                    <div>Office: Room {classItem.room}</div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <div className="text-xs text-gray-600">
                              {classItem.room}
                            </div>
                            {classItem.nextAssignment &&
                              isUpcoming(classItem.nextAssignment.dueDate) && (
                                <div className="absolute top-1 right-1">
                                  <AlertCircle className="w-4 h-4 text-amber-500" />
                                </div>
                              )}
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                          <Card className="border-0 shadow-none">
                            <CardHeader
                              className={`${classItem.color} rounded-t-lg space-y-1`}
                            >
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-bold">
                                  {classItem.subject}
                                </CardTitle>
                                <Badge
                                  variant="secondary"
                                  className="font-medium"
                                >
                                  {classItem.courseType || "Regular Course"}
                                </Badge>
                              </div>
                              <CardDescription className="text-gray-700 font-medium">
                                {day} • {item.time}
                              </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6 pt-6">
                              {/* Instructor Card */}
                              <div className="flex items-start space-x-4 rounded-lg border p-4">
                                <div className="p-2 bg-secondary rounded-full">
                                  <svg
                                    className="w-5 h-5 text-secondary-foreground"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                  </svg>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm font-medium leading-none">
                                    Instructor
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {classItem.teacher}
                                  </p>
                                </div>
                              </div>

                              {/* Location and Duration */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg border p-4">
                                  <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-secondary rounded-full">
                                      <svg
                                        className="w-4 h-4 text-secondary-foreground"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                      </svg>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium leading-none">
                                        Location
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {classItem.room}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="rounded-lg border p-4">
                                  <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-secondary rounded-full">
                                      <svg
                                        className="w-4 h-4 text-secondary-foreground"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium leading-none">
                                        Duration
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {classItem.duration || "140 minutes"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* Course Details */}
                              <div className="space-y-4">
                                <h3 className="font-semibold">
                                  Course Details
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {classItem.description ||
                                    "This course covers fundamental concepts and practical applications."}
                                </p>

                                {/* Next Assignment */}
                                {classItem.nextAssignment && (
                                  <Card className="border-primary/10">
                                    <CardHeader className="pb-3">
                                      <div className="flex items-center justify-between">
                                        <CardTitle className="text-base">
                                          Next Assignment
                                        </CardTitle>
                                        <Badge
                                          variant="outline"
                                          className={`capitalize ${getStatusColor(
                                            classItem.nextAssignment.status
                                          )}`}
                                        >
                                          {classItem.nextAssignment.status}
                                        </Badge>
                                      </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div className="space-y-2">
                                        <h4 className="font-semibold text-base">
                                          {classItem.nextAssignment.title}
                                        </h4>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <svg
                                            className="w-4 h-4 mr-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                          </svg>
                                          Due{" "}
                                          {formatDate(
                                            classItem.nextAssignment.dueDate
                                          )}
                                          {classItem.nextAssignment
                                            .presentationTime && (
                                            <span className="ml-3 flex items-center">
                                              <svg
                                                className="w-4 h-4 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                              </svg>
                                              {
                                                classItem.nextAssignment
                                                  .presentationTime
                                              }
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      <Separator className="my-2" />

                                      <div className="space-y-3">
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                          {classItem.nextAssignment.description}
                                        </p>

                                        {classItem.nextAssignment
                                          .requirements && (
                                          <div className="space-y-2">
                                            <h5 className="text-sm font-semibold">
                                              Required Materials:
                                            </h5>
                                            <ul className="text-sm text-muted-foreground space-y-1">
                                              {classItem.nextAssignment.requirements.map(
                                                (req, index) => (
                                                  <li
                                                    key={index}
                                                    className="flex items-center"
                                                  >
                                                    <svg
                                                      className="w-4 h-4 mr-2 text-primary"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      viewBox="0 0 24 24"
                                                    >
                                                      <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                      />
                                                    </svg>
                                                    {req}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </div>
                                        )}

                                        {classItem.nextAssignment
                                          .evaluationCriteria && (
                                          <div className="space-y-2">
                                            <h5 className="text-sm font-semibold">
                                              Evaluation Criteria:
                                            </h5>
                                            <ul className="text-sm text-muted-foreground space-y-1">
                                              {classItem.nextAssignment.evaluationCriteria.map(
                                                (criteria, index) => (
                                                  <li
                                                    key={index}
                                                    className="flex items-center"
                                                  >
                                                    <svg
                                                      className="w-4 h-4 mr-2 text-primary"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      viewBox="0 0 24 24"
                                                    >
                                                      <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                      />
                                                    </svg>
                                                    {criteria}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </div>
                                        )}

                                        {/* Progress indicator */}
                                        <div className="flex items-center justify-between text-sm pt-2">
                                          <div className="flex items-center space-x-1">
                                            <svg
                                              className={`w-4 h-4 ${
                                                classItem.nextAssignment
                                                  .status === "completed"
                                                  ? "text-green-500"
                                                  : "text-muted-foreground"
                                              }`}
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                              />
                                            </svg>
                                            <span className="text-muted-foreground">
                                              {classItem.nextAssignment
                                                .status === "completed"
                                                ? "Completed"
                                                : classItem.nextAssignment
                                                    .status === "in-progress"
                                                ? "In Progress"
                                                : "Not Started"}
                                            </span>
                                          </div>

                                          {/* Days remaining */}
                                          <span className="text-muted-foreground">
                                            {Math.ceil(
                                              (new Date(
                                                classItem.nextAssignment.dueDate
                                              ).getTime() -
                                                new Date().getTime()) /
                                                (1000 * 60 * 60 * 24)
                                            )}{" "}
                                            days left
                                          </span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}
                              </div>

                              <Separator />

                              {/* Materials Section */}
                              {classItem.materials &&
                                classItem.materials.length > 0 && (
                                  <div className="space-y-4">
                                    <h3 className="font-semibold">
                                      Course Materials
                                    </h3>
                                    <ul className="list-disc pl-6 text-sm text-muted-foreground">
                                      {classItem.materials.map(
                                        (material, index) => (
                                          <li key={index}>
                                            <a
                                              href={material.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-500 hover:underline"
                                            >
                                              {material.name}
                                            </a>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}

                              {/* Attendance Section */}
                              {classItem.attendance &&
                                classItem.attendance.length > 0 && (
                                  <div className="space-y-4">
                                    <h3 className="font-semibold">
                                      Attendance
                                    </h3>
                                    <ul className="list-disc pl-6 text-sm text-muted-foreground">
                                      {classItem.attendance.map(
                                        (attendanceItem, index) => (
                                          <li key={index}>
                                            <div className="flex items-center justify-between">
                                              <span className="text-sm">
                                                {attendanceItem.date}
                                              </span>
                                              <div className="flex items-center space-x-2">
                                                <button
                                                  onClick={() =>
                                                    handleAttendance(
                                                      classItem.id,
                                                      "present"
                                                    )
                                                  }
                                                  className="text-green-500 hover:text-green-700"
                                                >
                                                  <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                  onClick={() =>
                                                    handleAttendance(
                                                      classItem.id,
                                                      "absent"
                                                    )
                                                  }
                                                  className="text-red-500 hover:text-red-700"
                                                >
                                                  <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                  onClick={() =>
                                                    handleAttendance(
                                                      classItem.id,
                                                      "late"
                                                    )
                                                  }
                                                  className="text-yellow-500 hover:text-yellow-700"
                                                >
                                                  <Check className="w-4 h-4" />
                                                </button>
                                              </div>
                                            </div>
                                            {attendanceItem.notes && (
                                              <div className="mt-1 text-sm text-muted-foreground">
                                                Notes: {attendanceItem.notes}
                                              </div>
                                            )}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}

                              {/* Notes Section */}
                              {classItem.notes &&
                                classItem.notes.length > 0 && (
                                  <div className="space-y-4">
                                    <h3 className="font-semibold">Notes</h3>
                                    <ul className="list-disc pl-6 text-sm text-muted-foreground">
                                      {classItem.notes.map((note, index) => (
                                        <li key={index}>{note}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                            </CardContent>
                          </Card>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
          {days.map((day) => (
            <div key={day} className="space-y-2">
              <h3 className="font-semibold text-gray-700">
                {day} {isToday(day) && <Badge>Today</Badge>}
              </h3>
              <div className="space-y-2">
                {filteredSchedule.map((item, index) => {
                  const lowercaseDay = day.toLowerCase() as keyof ScheduleItem;
                  const classItem = item[lowercaseDay] as Class | undefined;

                  return classItem ? (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <button className="w-full text-left">
                          <div
                            className={`p-3 rounded-lg ${classItem.color} hover:opacity-90 transition-all`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-semibold">
                                  {classItem.subject}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {item.time}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {classItem.teacher}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {classItem.room}
                                </div>
                              </div>
                              {classItem.nextAssignment && (
                                <Badge
                                  variant="outline"
                                  className={getStatusColor(
                                    classItem.nextAssignment.status
                                  )}
                                >
                                  Assignment Due:{" "}
                                  {formatDate(classItem.nextAssignment.dueDate)}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <Card className="border-0 shadow-none">
                          <CardHeader
                            className={`${classItem.color} rounded-t-lg space-y-1`}
                          >
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-2xl font-bold">
                                {classItem.subject}
                              </CardTitle>
                              <Badge
                                variant="secondary"
                                className="font-medium"
                              >
                                {classItem.courseType || "Regular Course"}
                              </Badge>
                            </div>
                            <CardDescription className="text-gray-700 font-medium">
                              {day} • {item.time}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="space-y-6 pt-6">
                            {/* Instructor Card */}
                            <div className="flex items-start space-x-4 rounded-lg border p-4">
                              <div className="p-2 bg-secondary rounded-full">
                                <svg
                                  className="w-5 h-5 text-secondary-foreground"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                  Instructor
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {classItem.teacher}
                                </p>
                              </div>
                            </div>

                            {/* Location and Duration */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="rounded-lg border p-4">
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 bg-secondary rounded-full">
                                    <svg
                                      className="w-4 h-4 text-secondary-foreground"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                      />
                                    </svg>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                      Location
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {classItem.room}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="rounded-lg border p-4">
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 bg-secondary rounded-full">
                                    <svg
                                      className="w-4 h-4 text-secondary-foreground"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                      Duration
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {classItem.duration || "140 minutes"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Separator />

                            {/* Course Details */}
                            <div className="space-y-4">
                              <h3 className="font-semibold">Course Details</h3>
                              <p className="text-sm text-muted-foreground">
                                {classItem.description ||
                                  "This course covers fundamental concepts and practical applications."}
                              </p>

                              {/* Next Assignment */}
                              {classItem.nextAssignment && (
                                <Card className="border-primary/10">
                                  <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                      <CardTitle className="text-base">
                                        Next Assignment
                                      </CardTitle>
                                      <Badge
                                        variant="outline"
                                        className={`capitalize ${getStatusColor(
                                          classItem.nextAssignment.status
                                        )}`}
                                      >
                                        {classItem.nextAssignment.status}
                                      </Badge>
                                    </div>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                      <h4 className="font-semibold text-base">
                                        {classItem.nextAssignment.title}
                                      </h4>
                                      <div className="flex items-center text-sm text-muted-foreground">
                                        <svg
                                          className="w-4 h-4 mr-1"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                          />
                                        </svg>
                                        Due{" "}
                                        {formatDate(
                                          classItem.nextAssignment.dueDate
                                        )}
                                        {classItem.nextAssignment
                                          .presentationTime && (
                                          <span className="ml-3 flex items-center">
                                            <svg
                                              className="w-4 h-4 mr-1"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                              />
                                            </svg>
                                            {
                                              classItem.nextAssignment
                                                .presentationTime
                                            }
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    <Separator className="my-2" />

                                    <div className="space-y-3">
                                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                        {classItem.nextAssignment.description}
                                      </p>

                                      {classItem.nextAssignment
                                        .requirements && (
                                        <div className="space-y-2">
                                          <h5 className="text-sm font-semibold">
                                            Required Materials:
                                          </h5>
                                          <ul className="text-sm text-muted-foreground space-y-1">
                                            {classItem.nextAssignment.requirements.map(
                                              (req, index) => (
                                                <li
                                                  key={index}
                                                  className="flex items-center"
                                                >
                                                  <svg
                                                    className="w-4 h-4 mr-2 text-primary"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M9 5l7 7-7 7"
                                                    />
                                                  </svg>
                                                  {req}
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      )}

                                      {classItem.nextAssignment
                                        .evaluationCriteria && (
                                        <div className="space-y-2">
                                          <h5 className="text-sm font-semibold">
                                            Evaluation Criteria:
                                          </h5>
                                          <ul className="text-sm text-muted-foreground space-y-1">
                                            {classItem.nextAssignment.evaluationCriteria.map(
                                              (criteria, index) => (
                                                <li
                                                  key={index}
                                                  className="flex items-center"
                                                >
                                                  <svg
                                                    className="w-4 h-4 mr-2 text-primary"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M5 13l4 4L19 7"
                                                    />
                                                  </svg>
                                                  {criteria}
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      )}

                                      {/* Progress indicator */}
                                      <div className="flex items-center justify-between text-sm pt-2">
                                        <div className="flex items-center space-x-1">
                                          <svg
                                            className={`w-4 h-4 ${
                                              classItem.nextAssignment
                                                .status === "completed"
                                                ? "text-green-500"
                                                : "text-muted-foreground"
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                          </svg>
                                          <span className="text-muted-foreground">
                                            {classItem.nextAssignment.status ===
                                            "completed"
                                              ? "Completed"
                                              : classItem.nextAssignment
                                                  .status === "in-progress"
                                              ? "In Progress"
                                              : "Not Started"}
                                          </span>
                                        </div>

                                        {/* Days remaining */}
                                        <span className="text-muted-foreground">
                                          {Math.ceil(
                                            (new Date(
                                              classItem.nextAssignment.dueDate
                                            ).getTime() -
                                              new Date().getTime()) /
                                              (1000 * 60 * 60 * 24)
                                          )}{" "}
                                          days left
                                        </span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                            </div>

                            <Separator />

                            {/* Materials Section */}
                            {classItem.materials &&
                              classItem.materials.length > 0 && (
                                <div className="space-y-4">
                                  <h3 className="font-semibold">
                                    Course Materials
                                  </h3>
                                  <ul className="list-disc pl-6 text-sm text-muted-foreground">
                                    {classItem.materials.map(
                                      (material, index) => (
                                        <li key={index}>
                                          <a
                                            href={material.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                          >
                                            {material.name}
                                          </a>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}

                            {/* Attendance Section */}
                            {classItem.attendance &&
                              classItem.attendance.length > 0 && (
                                <div className="space-y-4">
                                  <h3 className="font-semibold">Attendance</h3>
                                  <ul className="list-disc pl-6 text-sm text-muted-foreground">
                                    {classItem.attendance.map(
                                      (attendanceItem, index) => (
                                        <li key={index}>
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm">
                                              {attendanceItem.date}
                                            </span>
                                            <div className="flex items-center space-x-2">
                                              <button
                                                onClick={() =>
                                                  handleAttendance(
                                                    classItem.id,
                                                    "present"
                                                  )
                                                }
                                                className="text-green-500 hover:text-green-700"
                                              >
                                                <Check className="w-4 h-4" />
                                              </button>
                                              <button
                                                onClick={() =>
                                                  handleAttendance(
                                                    classItem.id,
                                                    "absent"
                                                  )
                                                }
                                                className="text-red-500 hover:text-red-700"
                                              >
                                                <Check className="w-4 h-4" />
                                              </button>
                                              <button
                                                onClick={() =>
                                                  handleAttendance(
                                                    classItem.id,
                                                    "late"
                                                  )
                                                }
                                                className="text-yellow-500 hover:text-yellow-700"
                                              >
                                                <Check className="w-4 h-4" />
                                              </button>
                                            </div>
                                          </div>
                                          {attendanceItem.notes && (
                                            <div className="mt-1 text-sm text-muted-foreground">
                                              Notes: {attendanceItem.notes}
                                            </div>
                                          )}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}

                            {/* Notes Section */}
                            {classItem.notes && classItem.notes.length > 0 && (
                              <div className="space-y-4">
                                <h3 className="font-semibold">Notes</h3>
                                <ul className="list-disc pl-6 text-sm text-muted-foreground">
                                  {classItem.notes.map((note, index) => (
                                    <li key={index}>{note}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </DialogContent>
                    </Dialog>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
