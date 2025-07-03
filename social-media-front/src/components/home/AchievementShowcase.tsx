import { Trophy, Star, Award, Target } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Top 10 Student Services",
    description: "Ranked among the best student affairs departments nationwide",
    stat: "#8 Nationally",
  },
  {
    icon: Star,
    title: "Student Satisfaction",
    description: "Outstanding satisfaction rate from student surveys",
    stat: "96% Satisfied",
  },
  {
    icon: Award,
    title: "Excellence Award",
    description: "Recognized for innovative student support programs",
    stat: "2024 Winner",
  },
  {
    icon: Target,
    title: "Success Rate",
    description: "Students achieving their academic goals",
    stat: "92% Success",
  },
  {
    icon: Award,
    title: "Innovation Prize",
    description: "Leading edge technology integration in education",
    stat: "2023 Winner",
  },
  {
    icon: Star,
    title: "Faculty Rating",
    description: "Exceptional faculty performance and engagement",
    stat: "4.8/5.0",
  },
];

export default function AchievementShowcase() {
  const firstRow = achievements.slice(0, 3);
  const secondRow = achievements.slice(3, 6);

  return (
    <>
      <section className="pb-12 pt-10 bg-white sm:pb-16 lg:pb-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-0 leading-tight text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Our Achievements
            </h2>
            <p className="text-base leading-7 text-gray-600 sm:mt-5 font-pj">
              Recognized excellence in student services and support
            </p>
          </div>

          {/* First Row */}
          <div className="grid grid-cols-1 mt-4 text-center sm:mt-10 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-10">
            {firstRow.map((achievement, index) => (
              <div key={index} className="md:p-8 lg:p-14 md:border-l md:border-gray-200 first:border-l-0">
                <achievement.icon className="w-20 h-20 mx-auto text-blue-600" />
                <h3 className="mt-7 text-2xl font-bold text-gray-900 font-pj">
                  {achievement.title}
                </h3>
                <p className="mt-3 text-base text-gray-600 font-pj">
                  {achievement.description}
                </p>
                <p className="mt-4 text-lg font-semibold text-blue-600">
                  {achievement.stat}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Second Row */}
          <div className="grid grid-cols-1 text-center sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0">
            {secondRow.map((achievement, index) => (
              <div key={index} className="md:p-8 lg:p-14 md:border-l md:border-gray-200 first:border-l-0">
                <achievement.icon className="w-20 h-20 mx-auto text-blue-600" />
                <h3 className="mt-7 text-2xl font-bold text-gray-900 font-pj">
                  {achievement.title}
                </h3>
                <p className="mt-3 text-base text-gray-600 font-pj">
                  {achievement.description}
                </p>
                <p className="mt-4 text-lg font-semibold text-blue-600">
                  {achievement.stat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
