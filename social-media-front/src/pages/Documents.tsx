import { useState } from "react";
import {
  Search,
  SortAsc,
  SortDesc,
  Folder,
  FileText,
  Download,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export default function Documents() {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | "all">("all");
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const documents = {
    courses: [
      {
        id: 1,
        title: "Francais - Course Materials",
        type: "pdf",
        size: "2.4 MB",
        url: "/documents/francais/course-materials.pdf",
        teacher: "Elazouzi Chama",
        subject: "Francais",
      },
      {
        id: 2,
        title: "CSS - Responsive Design Guide",
        type: "pdf",
        size: "3.2 MB",
        url: "/documents/css/responsive-design.pdf",
        teacher: "Remmach Chaimae",
        subject: "CSS",
      },
      {
        id: 3,
        title: "POO - Object Oriented Programming",
        type: "pdf",
        size: "4.5 MB",
        url: "/documents/poo/oop-basics.pdf",
        teacher: "El Kouari Omaima",
        subject: "POO",
      },
      {
        id: 4,
        title: "Algorithms - Course Guide",
        type: "pdf",
        size: "3.8 MB",
        url: "/documents/algorithms/course-guide.pdf",
        teacher: "Khezane Abdelmoutaleb",
        subject: "Algorithms",
      },
    ],
    assignments: [
      {
        id: 1,
        title: "French Literature Essay - Les Misérables",
        type: "pdf",
        size: "1.1 MB",
        url: "/documents/francais/essay-guidelines.pdf",
        dueDate: "2024-03-25",
        status: "pending",
        subject: "Francais",
      },
      {
        id: 2,
        title: "Responsive Design Project Guidelines",
        type: "pdf",
        size: "2.3 MB",
        url: "/documents/css/project-guidelines.pdf",
        dueDate: "2024-03-22",
        status: "in-progress",
        subject: "CSS",
      },
      {
        id: 3,
        title: "PIE - Project Innovation Guidelines",
        type: "pdf",
        size: "3.1 MB",
        url: "/documents/pie/project-guidelines.pdf",
        dueDate: "2024-11-19",
        status: "in-progress",
        subject: "PIE",
      },
    ],
    resources: [
      {
        id: 1,
        title: "Programming Best Practices",
        type: "pdf",
        size: "2.8 MB",
        url: "/documents/resources/programming-practices.pdf",
        subject: "General",
      },
      {
        id: 2,
        title: "Algorithm Complexity Guide",
        type: "pdf",
        size: "1.9 MB",
        url: "/documents/resources/algorithm-complexity.pdf",
        subject: "Algorithms",
      },
      {
        id: 3,
        title: "Web Development Standards",
        type: "pdf",
        size: "2.2 MB",
        url: "/documents/resources/web-standards.pdf",
        subject: "CSS",
      },
    ],
    exams: [
      {
        id: 1,
        title: "Midterm Exam - French Grammar",
        type: "pdf",
        size: "1.8 MB",
        url: "/documents/francais/midterm-exam.pdf",
        date: "2024-04-15",
        subject: "Francais",
        duration: "2 hours",
      },
      {
        id: 2,
        title: "Final Exam - Web Development",
        type: "pdf",
        size: "2.1 MB",
        url: "/documents/css/final-exam.pdf",
        date: "2024-06-20",
        subject: "CSS",
        duration: "3 hours",
      },
    ],
    projects: [
      {
        id: 1,
        title: "Group Project Guidelines - Innovation",
        type: "pdf",
        size: "3.5 MB",
        url: "/documents/pie/group-project.pdf",
        deadline: "2024-05-30",
        subject: "PIE",
        teamSize: "4-5 students",
      },
      {
        id: 2,
        title: "Individual Project Rubric",
        type: "pdf",
        size: "1.7 MB",
        url: "/documents/poo/individual-project.pdf",
        deadline: "2024-04-25",
        subject: "POO",
      },
    ],
    tutorials: [
      {
        id: 1,
        title: "Git Version Control Basics",
        type: "pdf",
        size: "4.2 MB",
        url: "/documents/tutorials/git-basics.pdf",
        subject: "General",
        difficulty: "Beginner",
      },
      {
        id: 2,
        title: "Advanced CSS Animations",
        type: "pdf",
        size: "3.8 MB",
        url: "/documents/tutorials/css-animations.pdf",
        subject: "CSS",
        difficulty: "Advanced",
      },
    ],
    worksheets: [
      {
        id: 1,
        title: "Algorithm Practice Problems",
        type: "pdf",
        size: "1.5 MB",
        url: "/documents/algorithms/practice-problems.pdf",
        subject: "Algorithms",
        difficulty: "Intermediate",
      },
      {
        id: 2,
        title: "French Vocabulary Exercises",
        type: "pdf",
        size: "1.2 MB",
        url: "/documents/francais/vocabulary.pdf",
        subject: "Francais",
        difficulty: "Beginner",
      },
    ],
  };

  // Get unique subjects for filter
  const subjects = Array.from(
    new Set(
      [
        ...documents.courses,
        ...documents.assignments,
        ...documents.resources,
        ...documents.exams,
        ...documents.projects,
        ...documents.tutorials,
        ...documents.worksheets,
      ].map((doc) => doc.subject)
    )
  );

  // Filter and sort documents
  const filterAndSortDocuments = (items: any[]) => {
    return items
      .filter((doc) => {
        const matchesSearch =
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (doc.subject &&
            doc.subject.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesSubject =
          selectedSubject === "all" || doc.subject === selectedSubject;
        return matchesSearch && matchesSubject;
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          const dateA = a.dueDate ? new Date(a.dueDate) : new Date(0);
          const dateB = b.dueDate ? new Date(b.dueDate) : new Date(0);
          return sortOrder === "asc"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        }
        if (sortBy === "name") {
          return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
        if (sortBy === "size") {
          const sizeA = parseFloat(a.size);
          const sizeB = parseFloat(b.size);
          return sortOrder === "asc" ? sizeA - sizeB : sizeB - sizeA;
        }
        return 0;
      });
  };

  // Preview document
  const handlePreview = (doc: any) => {
    setSelectedDocument(doc);
  };

  const handleDownload = (doc: {
    title: string;
    url: string;
    dueDate?: string;
    status?: string;
    subject?: string;
    teacher?: string;
  }) => {
    const link = document.createElement("a");
    link.href = doc.url;
    link.download = doc.title + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Enhanced Header with better gradient and spacing */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-[48px] font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/50 text-transparent bg-clip-text tracking-tight">
              Documents Library
            </h1>
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium"
            >
              {Object.values(documents).flat().length} Documents
            </Badge>
          </div>
        </div>

        {/* Enhanced Search and Filters with better shadows and hover states */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6 hover:shadow-md transition-all duration-200">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[300px] group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-hover:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Search documents..."
                className="pl-10 bg-gray-50/50 border-gray-200 focus:border-primary hover:border-primary/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="border rounded-lg px-4 py-2 bg-gray-50/50 border-gray-200 focus:border-primary hover:border-primary/50 outline-none min-w-[200px] transition-all cursor-pointer"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Enhanced Filter Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2 p-1.5 bg-gray-100/80 rounded-lg">
              <Button
                variant="ghost"
                onClick={() => setSortBy("date")}
                className={cn(
                  "rounded-md transition-all duration-200 hover:bg-white hover:shadow-sm",
                  sortBy === "date"
                    ? "bg-white shadow-sm text-primary font-medium"
                    : ""
                )}
              >
                Date
              </Button>
              <Button
                variant="ghost"
                onClick={() => setSortBy("name")}
                className={cn(
                  "rounded-md transition-all duration-200 hover:bg-white hover:shadow-sm",
                  sortBy === "name"
                    ? "bg-white shadow-sm text-primary font-medium"
                    : ""
                )}
              >
                Name
              </Button>
              <Button
                variant="ghost"
                onClick={() => setSortBy("size")}
                className={cn(
                  "rounded-md transition-all duration-200 hover:bg-white hover:shadow-sm",
                  sortBy === "size"
                    ? "bg-white shadow-sm text-primary font-medium"
                    : ""
                )}
              >
                Size
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="border-gray-200"
            >
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
              }
              className="border-gray-200"
            >
              {viewMode === "grid" ? "List View" : "Grid View"}
            </Button>
          </div>
        </div>

        {/* Enhanced Statistics Cards with better gradients and animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-green-50 via-green-100/50 to-green-100 p-8 rounded-2xl shadow-sm border border-green-200/50 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-green-700 mb-3 text-lg">
              Total Documents
            </h3>
            <p className="text-4xl font-bold text-green-900">
              {documents.courses.length +
                documents.assignments.length +
                documents.resources.length +
                documents.exams.length +
                documents.projects.length +
                documents.tutorials.length +
                documents.worksheets.length}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-yellow-50 via-yellow-100/50 to-yellow-100 p-8 rounded-2xl shadow-sm border border-yellow-200/50 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-yellow-700 mb-3 text-lg">
              Pending Assignments
            </h3>
            <p className="text-4xl font-bold text-yellow-900">
              {
                documents.assignments.filter((a) => a.status === "pending")
                  .length
              }
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-100 p-8 rounded-2xl shadow-sm border border-blue-200/50 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-blue-700 mb-3 text-lg">
              In-Progress Courses
            </h3>
            <p className="text-4xl font-bold text-blue-900">
              {
                documents.assignments.filter((a) => a.status === "in-progress")
                  .length
              }
            </p>
          </motion.div>

        </div>
      </div>

      {/* Enhanced Document Categories with better card design */}
      {Object.entries(documents).map(([category, items]) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={category}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary/10 p-2.5 rounded-xl">
              <Folder className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold capitalize tracking-tight">
              {category}
            </h2>
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary px-3 py-1"
            >
              {items.length}
            </Badge>
          </div>

          <div
            className={cn(
              "gap-6 transition-all",
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            )}
          >
            {filterAndSortDocuments(items).map((doc) => (
              <motion.div
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ duration: 0.2 }}
                key={doc.id}
                className={cn(
                  "bg-white p-6 rounded-xl border border-gray-200/80 hover:shadow-lg transition-all duration-200",
                  viewMode === "list" ? "flex items-center justify-between" : ""
                )}
              >
                <div className="flex items-start gap-4">
                  <FileText className="h-8 w-8 text-gray-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">{doc.title}</h3>
                    <p className="text-sm text-gray-500">
                      {doc.type.toUpperCase()} • {doc.size}
                    </p>
                    {doc.subject && (
                      <p className="text-sm text-gray-500">
                        Subject: {doc.subject}
                      </p>
                    )}
                    {doc.teacher && (
                      <p className="text-sm text-gray-500">
                        Teacher: {doc.teacher}
                      </p>
                    )}
                    {doc.dueDate && (
                      <p className="text-sm text-gray-500">
                        Due: {new Date(doc.dueDate).toLocaleDateString()}
                      </p>
                    )}
                    {doc.status && (
                      <Badge
                        variant="outline"
                        className={
                          doc.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : doc.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {doc.status.charAt(0).toUpperCase() +
                          doc.status.slice(1)}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(doc)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" onClick={() => handleDownload(doc)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Enhanced Preview Dialog */}
      <Dialog
        open={!!selectedDocument}
        onOpenChange={() => setSelectedDocument(null)}
      >
        <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-2xl">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-xl font-semibold">
              {selectedDocument?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <iframe
              src={selectedDocument?.url}
              className="w-full h-[600px] rounded-xl border"
              title={selectedDocument?.title}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
