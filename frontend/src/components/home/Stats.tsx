import { Users, GraduationCap, Building, Globe } from "lucide-react";

const stats = [
  { value: "25,000+", label: "Students Served" },
  { value: "95%", label: "Success Rate" },
  { value: "50+", label: "Campus Programs" },
  { value: "100+", label: "Partner Organizations" },
];

export default function Stats() {
  return (
    <>
      <section className="py-5 bg-gray-100 sm:py-16 lg:py-24">
        <div className="mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Numbers tell our story
            </h2>
            <p className="mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis.
            </p>
          </div>

          <div className="grid grid-cols-1 mt-12 sm:grid-cols-2 md:grid-cols-4 mx-[100px]">
            {stats.map((stat, index) => {
              return (
                <div className="flex flex-col justify-center items-center" key={index}>
                  <h3 className="font-bold text-7xl">
                    <span className={index % 2 === 0 ? "text-black" : "text-blue-600"}>
                      {stat.value}
                    </span>
                  </h3>
                  <p className="mt-4 text-xl font-medium text-gray-900">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
