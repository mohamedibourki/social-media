import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import { useState } from "react";

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const events = [
    {
      title: "Annual Tech Conference",
      description:
        "Join industry leaders for insights into emerging technologies and future trends.",
      date: "2024-03-15",
      time: "9:00 AM",
      location: "Innovation Center",
      attendees: 250,
      type: "Conference",
      featured: true,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      maxAttendees: 300,
    },
    {
      title: "Startup Networking Mixer",
      description:
        "Connect with fellow entrepreneurs and investors in a casual networking environment.",
      date: "2024-03-28",
      time: "6:30 PM",
      location: "Downtown Hub",
      attendees: 75,
      type: "Networking",
      featured: false,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
      maxAttendees: 100,
    },
    {
      title: "Web Development Workshop",
      description:
        "Learn from experienced developers and enhance your web development skills.",
      date: "2024-04-05",
      time: "2:00 PM",
      location: "Tech Campus",
      attendees: 40,
      type: "Workshop",
      featured: true,
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
      maxAttendees: 50,
    },
    {
      title: "Design Systems Symposium",
      description:
        "Explore the latest trends and best practices in design systems and user experience.",
      date: "2024-04-12",
      time: "10:30 AM",
      location: "Creative Studio",
      attendees: 120,
      type: "Symposium",
      featured: false,
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2",
      maxAttendees: 150,
    },
    {
      title: "AI & Machine Learning Summit",
      description:
        "Discover the latest advancements in AI and machine learning and their impact on the industry.",
      date: "2024-04-20",
      time: "8:30 AM",
      location: "Science Center",
      attendees: 180,
      type: "Summit",
      featured: true,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      maxAttendees: 200,
    },
    {
      title: "Tech Innovation Showcase",
      description:
        "Experience groundbreaking technology demonstrations and connect with innovators.",
      date: "2024-04-25",
      time: "11:00 AM",
      location: "Innovation Hub",
      attendees: 200,
      type: "Event",
      featured: false,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
      maxAttendees: 250,
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
          Upcoming Events
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          Join our community events and connect with industry professionals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <Card
            key={event.title}
            className="group hover:shadow-2xl transition-all duration-300 rounded-3xl border-muted/50 backdrop-blur-sm hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-3 line-clamp-1 group-hover:text-primary-foreground transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-white/90 line-clamp-2 group-hover:text-white transition-colors">
                  {event.description}
                </p>
              </div>
              <div className="absolute top-6 right-6 flex gap-2">
                {event.featured && (
                  <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-5 py-2 rounded-full text-xs font-semibold shadow-lg ring-1 ring-primary/20">
                    Featured
                  </span>
                )}
                <span className="bg-secondary/90 backdrop-blur-sm text-secondary-foreground px-5 py-2 rounded-full text-xs font-semibold shadow-lg ring-1 ring-secondary/20">
                  {event.type}
                </span>
              </div>
            </div>
            <CardContent className="pt-8">
              <div className="space-y-4 text-sm">
                <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <time dateTime={event.date}>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">
                    {event.attendees}+ Attending
                    <span className="text-xs ml-1 text-muted-foreground">
                      (
                      {Math.round((event.attendees / event.maxAttendees) * 100)}
                      % Full)
                    </span>
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${(event.attendees / event.maxAttendees) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="pb-8">
              <Button
                className="w-full transition-all rounded-full font-medium text-sm py-6 hover:shadow-lg hover:scale-[1.02]"
                variant={
                  event.attendees >= event.maxAttendees
                    ? "secondary"
                    : "default"
                }
                disabled={event.attendees >= event.maxAttendees}
                onClick={() => {
                  setSelectedEvent(event);
                  setDialogOpen(true);
                }}
              >
                {event.attendees >= event.maxAttendees ? (
                  <>
                    <Users className="w-4 h-4 mr-2" />
                    Event Full
                  </>
                ) : (
                  <>
                    Register Now
                    <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">
                      <ArrowRight size={64} />
                    </span>
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              Fill out the form below to register for this event.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission here
              setDialogOpen(false);
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  {selectedEvent?.date &&
                    new Date(selectedEvent.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  {selectedEvent?.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  {selectedEvent?.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">
                    {selectedEvent?.attendees}+ Attending
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full rounded-full">
                Register for Event
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
