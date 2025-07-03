import { BookOpen, Download, ExternalLink } from 'lucide-react';

const resources = [
  {
    category: "Academic Resources",
    items: [
      { title: "Student Handbook 2024", type: "PDF", size: "2.5 MB" },
      { title: "Course Registration Guide", type: "PDF", size: "1.8 MB" },
      { title: "Academic Calendar", type: "DOC", size: "1.2 MB" }
    ]
  },
  {
    category: "Career Resources",
    items: [
      { title: "Resume Writing Guide", type: "PDF", size: "3.1 MB" },
      { title: "Interview Preparation", type: "PDF", size: "2.2 MB" },
      { title: "Career Fair Tips", type: "DOC", size: "1.5 MB" }
    ]
  },
  {
    category: "Student Life",
    items: [
      { title: "Campus Housing Guide", type: "PDF", size: "4.2 MB" },
      { title: "Student Organizations", type: "PDF", size: "2.8 MB" },
      { title: "Health Services Guide", type: "DOC", size: "1.9 MB" }
    ]
  }
];

export default function ResourceHub() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Resource Hub</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access important documents, guides, and resources to support your academic journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((section) => (
            <div key={section.category} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  {section.category}
                </h3>
              </div>
              <div className="p-6">
                {section.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 group"
                  >
                    <div className="flex items-center">
                      <Download className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      <span className="ml-3 text-gray-700 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{item.size}</span>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}