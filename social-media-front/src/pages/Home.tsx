import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Services from "../components/home/Services";
import Announcements from "../components/home/Announcements";
import QuickLinks from "../components/home/QuickLinks";
import Timetable from "../components/home/Timetable";
import NewsEvents from "../components/home/NewsEvents";
import Testimonials from "../components/home/Testimonials";
import UpcomingEvents from "../components/home/UpcomingEvents";
import AchievementShowcase from "../components/home/AchievementShowcase";
import ResourceHub from "../components/home/ResourceHub";
import SupportChannels from "../components/home/SupportChannels";
import CampusLife from "../components/home/CampusLife";
import Clubs from "../components/home/Clubs";
import Conferences from "../components/home/Conferences";
import Team from "../components/home/Team";
import Partners from "../components/home/Partners";

export const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Partners />
      <Stats />
      <Announcements />
      <AchievementShowcase />
      <Services />
      {/* <Timetable /> */}
      {/* <QuickLinks /> */}
      <UpcomingEvents />
      {/* <CampusLife /> */}
      <Clubs />
      {/* <ResourceHub /> */}
      {/* <Conferences /> */}
      {/* <NewsEvents /> */}
      <Team />
      <SupportChannels />
      <Testimonials />

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
              <div className="space-y-2 text-gray-300">
                <p>Student Affairs Office</p>
                <p>123 University Ave</p>
                <p>Email: student.affairs@university.edu</p>
                <p>Phone: (555) 123-4567</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Academic Calendar
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Student Portal
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Campus Map
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Directory
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-6">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Student Handbook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Forms & Documents
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Support Services
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-6">Connect With Us</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 University Student Affairs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
