const news = [
  {
    date: 'Mar 15, 2024',
    title: 'Spring Break Support Services',
    description: 'Access to student services during the spring break period',
  },
  {
    date: 'Mar 10, 2024',
    title: 'Career Fair Next Week',
    description: 'Meet with top employers at our annual career networking event',
  },
  {
    date: 'Mar 5, 2024',
    title: 'New Mental Health Resources',
    description: 'Additional counseling services now available for students',
  },
];

export default function NewsEvents() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest News & Events</h2>
          <button className="text-blue-600 hover:text-blue-800">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.title} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <span className="text-sm text-gray-500">{item.date}</span>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
                <button className="mt-4 text-blue-600 hover:text-blue-800">Read more →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}