import { Post } from "../components/SocialMediaPost";

export const posts: Post[] = [
  {
    id: "1",
    author: {
      name: "The Manager",
      username: "manager",
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400", // Professional male portrait
      isOfficial: true,
    },
    content: {
      text: "🔬 Annual Science Fair 2024! 📚\n\n📅 When: Next Friday...",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800", // Science fair with student presenting
      location: "Main Auditorium",
      tags: ["#ScienceFair2024", "#Innovation", "#STEM"],
    },
    engagement: {
      likes: 142,
      comments: 24,
      shares: 15,
    },
    timestamp: "1h ago",
  },
  {
    id: "2",
    author: {
      name: "Sports Department",
      username: "sports",
      avatar: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400", // Sports whistle/stopwatch avatar
      isOfficial: true,
    },
    content: {
      text: "🏆 Big win for our basketball team! Congratulations to...",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800", // Basketball game photo
      tags: ["#SchoolSports", "#Basketball", "#Victory"],
    },
    engagement: {
      likes: 89,
      comments: 12,
      shares: 8,
    },
    timestamp: "3h ago",
  },
  {
    id: "3",
    author: {
      name: "Library Services",
      username: "library",
      avatar: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400", // Library/books avatar
      isOfficial: true,
    },
    content: {
      text: "📚 Extended library hours during finals week! The library will remain open until midnight from Monday-Thursday. Take advantage of our quiet study spaces, group study rooms, and research assistance services. Don't forget - our online resources are available 24/7 through the library portal.\n\nReminder: Please return all borrowed books before the semester ends!",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800", // Modern library interior
      location: "Main Library",
      tags: ["#LibraryServices", "#Finals", "#StudyTime"],
    },
    engagement: {
      likes: 76,
      comments: 15,
      shares: 23,
    },
    timestamp: "5h ago",
  }
];
