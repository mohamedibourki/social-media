import { useState, useEffect } from "react";
import { clubs } from "../data/mock-data";
import { useToast } from "../hooks/use-toast";
import { ClubCard } from "../components/ClubCard";
import SocialMediaPost from "./SocialMediaPost";
import { generateClubPosts } from "../data/club-posts";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import {
  Calendar,
  Search,
  Users,
  Clock,
  MapPin,
  MessageSquare,
  ChartBar,
  Bell,
  PlusCircle,
  BarChart2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card } from "../components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

// Add new interfaces
interface ClubAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  authorAvatar?: string;
  isPinned?: boolean;
  type?: "info" | "warning" | "success";
}

interface ClubRole {
  id: string;
  name: "admin" | "moderator" | "member";
  permissions: string[];
  color: string;
}

interface ClubMemberBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedDate: string;
}

interface ClubMember {
  id: string;
  name: string;
  role: ClubRole["name"];
  avatar: string;
  joinDate: string;
  status: "active" | "inactive" | "banned";
  contributions: number;
  badges: ClubMemberBadge[];
  lastActive: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  skills: string[];
  bio?: string;
}

interface ClubEventAttendee {
  userId: string;
  status: "confirmed" | "maybe" | "declined";
  joinedAt: string;
  notes?: string;
}

interface ClubEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "online" | "in-person" | "hybrid";
  attendees: ClubEventAttendee[];
  maxAttendees?: number;
  organizer: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  tags: string[];
  recurring?: {
    frequency: "daily" | "weekly" | "monthly";
    endDate?: string;
  };
  resources?: {
    title: string;
    url: string;
    type: "document" | "video" | "link";
  }[];
  requirements?: string[];
  waitlist?: string[];
  sponsors?: {
    name: string;
    logo: string;
    website: string;
  }[];
}

interface ActivityLog {
  id: string;
  type: "join" | "post" | "event" | "announcement" | "achievement";
  user: string;
  userAvatar: string;
  action: string;
  timestamp: string;
  details?: string;
}

interface ClubStats {
  totalPosts: number;
  activeDiscussions: number;
  totalEvents: number;
  completedEvents: number;
  averageAttendance: number;
  memberGrowthRate: number;
  engagementRate: number;
  topContributors: ClubMember[];
}

export default function Clubs() {
  const [clubsList, setClubsList] = useState(clubs);
  const [selectedClub, setSelectedClub] = useState(() => clubs[0] || null);
  const [, setShowDetailsPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("feed");
  const [announcements] = useState<ClubAnnouncement[]>([
    {
      id: "1",
      title: "New Club Guidelines",
      content:
        "We've updated our club guidelines to ensure a better experience for all members. Please review the new rules.",
      date: "2024-03-15",
      author: "Club Admin",
      authorAvatar: "/avatars/admin.jpg",
      isPinned: true,
      type: "info",
    },
    {
      id: "2",
      title: "Upcoming Virtual Meetup",
      content:
        "Join us this Saturday for our monthly virtual meetup. We'll be discussing upcoming projects and initiatives.",
      date: "2024-03-14",
      author: "Event Coordinator",
      type: "success",
    },
  ]);
  const [members] = useState<ClubMember[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      role: "admin",
      avatar: "/avatars/sarah.jpg",
      joinDate: "2023-12-01",
      status: "active",
      contributions: 156,
      badges: [
        {
          id: "1",
          name: "Founding Member",
          icon: "🌟",
          description: "One of the first 10 members",
          earnedDate: "2023-12-01",
        },
        {
          id: "2",
          name: "Top Contributor",
          icon: "🏆",
          description: "Made over 100 contributions",
          earnedDate: "2024-02-15",
        },
      ],
      lastActive: "2024-03-15T10:30:00Z",
      socialLinks: {
        twitter: "sarahj",
        github: "sarahjohnson",
        linkedin: "sarah-johnson",
      },
      skills: ["React", "TypeScript", "UI/UX"],
      bio: "Full-stack developer passionate about building communities",
    },
    {
      id: "2",
      name: "Mike Chen",
      role: "moderator",
      avatar: "/avatars/mike.jpg",
      joinDate: "2024-01-15",
      status: "active",
      contributions: 89,
      badges: [],
      lastActive: "2024-03-15T10:30:00Z",
      socialLinks: {
        twitter: "mikechen",
        github: "mikechen",
        linkedin: "mike-chen",
      },
      skills: ["JavaScript", "Node.js", "MongoDB"],
      bio: "Software engineer with a focus on backend development",
    },
    {
      id: "3",
      name: "Emma Wilson",
      role: "member",
      avatar: "/avatars/emma.jpg",
      joinDate: "2024-02-01",
      status: "active",
      contributions: 45,
      badges: [],
      lastActive: "2024-03-15T10:30:00Z",
      socialLinks: {
        twitter: "emmawilson",
        github: "emmawilson",
        linkedin: "emma-wilson",
      },
      skills: ["HTML", "CSS", "JavaScript"],
      bio: "Frontend developer with a passion for design",
    },
  ]);
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  const [memberRoleFilter, setMemberRoleFilter] = useState<string>("all");
  const [memberStatusFilter, setMemberStatusFilter] = useState<string>("all");
  const [events] = useState<ClubEvent[]>([
    {
      id: "1",
      title: "Monthly Book Discussion",
      description:
        "Join us for an engaging discussion about this month's selected book: 'The Innovator's Dilemma'",
      date: "2024-03-20",
      time: "18:00",
      location: "Zoom Meeting",
      type: "online",
      attendees: [
        {
          userId: "1",
          status: "confirmed",
          joinedAt: "2024-03-15T14:30:00Z",
          notes: "Looking forward to the discussion!",
        },
        {
          userId: "2",
          status: "maybe",
          joinedAt: "2024-03-15T14:30:00Z",
          notes: "Might be busy that day, but I'll try to join!",
        },
      ],
      maxAttendees: 30,
      organizer: "Sarah Johnson",
      status: "upcoming",
      tags: ["book-club", "discussion", "monthly-event"],
      recurring: {
        frequency: "monthly",
        endDate: "2024-12-31",
      },
      resources: [
        {
          title: "Book Summary",
          url: "https://example.com/book-summary",
          type: "document",
        },
        {
          title: "Discussion Guide",
          url: "https://example.com/discussion-guide",
          type: "document",
        },
      ],
      requirements: ["Read the book before the discussion"],
      waitlist: [],
      sponsors: [
        {
          name: "Book Publisher",
          logo: "/logos/book-publisher.png",
          website: "https://example.com/book-publisher",
        },
      ],
    },
    {
      id: "2",
      title: "Tech Workshop: AI Basics",
      description:
        "Learn the fundamentals of AI and machine learning in this hands-on workshop",
      date: "2024-03-25",
      time: "14:00",
      location: "Tech Hub, Room 3B",
      type: "hybrid",
      attendees: [
        {
          userId: "2",
          status: "confirmed",
          joinedAt: "2024-03-15T14:30:00Z",
          notes: "Looking forward to the workshop!",
        },
      ],
      maxAttendees: 50,
      organizer: "Mike Chen",
      status: "upcoming",
      tags: ["workshop", "tech", "AI"],
      recurring: {
        frequency: "monthly",
        endDate: "2024-12-31",
      },
      resources: [
        {
          title: "AI Introduction",
          url: "https://example.com/ai-introduction",
          type: "video",
        },
        {
          title: "AI Case Studies",
          url: "https://example.com/ai-case-studies",
          type: "document",
        },
      ],
      requirements: ["Bring a laptop"],
      waitlist: [],
      sponsors: [
        {
          name: "Tech Company",
          logo: "/logos/tech-company.png",
          website: "https://example.com/tech-company",
        },
      ],
    },
  ]);
  const [activityLogs] = useState<ActivityLog[]>([
    {
      id: "1",
      type: "join",
      user: "Emma Wilson",
      userAvatar: "/avatars/emma.jpg",
      action: "joined the club",
      timestamp: "2024-03-15T14:30:00Z",
    },
    {
      id: "2",
      type: "post",
      user: "Mike Chen",
      userAvatar: "/avatars/mike.jpg",
      action: "shared a new post",
      timestamp: "2024-03-15T13:15:00Z",
      details: "Introduction to Machine Learning Concepts",
    },
    {
      id: "3",
      type: "achievement",
      user: "Sarah Johnson",
      userAvatar: "/avatars/sarah.jpg",
      action: "earned a badge",
      timestamp: "2024-03-15T12:00:00Z",
      details: "Top Contributor of the Month",
    },
  ]);
  const [roles] = useState<ClubRole[]>([
    {
      id: "1",
      name: "admin",
      permissions: [
        "manage_members",
        "manage_events",
        "manage_content",
        "manage_roles",
      ],
      color: "#FF4444",
    },
    {
      id: "2",
      name: "moderator",
      permissions: ["manage_content", "moderate_discussions"],
      color: "#44AA44",
    },
    {
      id: "3",
      name: "member",
      permissions: ["create_posts", "join_events"],
      color: "#4444FF",
    },
  ]);

  const categories = [
    "all",
    ...new Set(clubs.map((club) => club.category.toLowerCase())),
  ];

  const filteredClubs = clubsList.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" ||
      club.category.toLowerCase() === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleClubClick = (club: any) => {
    if (selectedClub?.id === club.id) {
      setShowDetailsPanel(true);
    } else {
      setSelectedClub(club);
      setShowDetailsPanel(false);
    }
  };

  const handleJoinClick = (clubId: string) => {
    setClubsList((clubs) =>
      clubs.map((club) =>
        club.id === clubId
          ? {
              ...club,
              isJoined: !club.isJoined,
              memberCount: club.isJoined
                ? club.memberCount - 1
                : club.memberCount + 1,
            }
          : club
      )
    );

    setSelectedClub((current: any) => {
      if (current?.id === clubId) {
        return {
          ...current,
          isJoined: !current.isJoined,
          memberCount: current.isJoined
            ? current.memberCount - 1
            : current.memberCount + 1,
        };
      }
      return current;
    });

    const club = clubsList.find((c) => c.id === clubId);
    if (club) {
      toast({
        title: club.isJoined ? "Left club" : "Joined club",
        description: club.isJoined
          ? `You have left ${club.name}`
          : `Welcome to ${club.name}!`,
      });
    }
  };

  // Generate posts with proper image handling
  const getClubPosts = () => {
    if (!selectedClub) return [];
    const posts = generateClubPosts(selectedClub.name);
    return posts.map((post) => ({
      ...post,
      content: {
        ...post.content,
        image: post.content.images?.[0] || null,
        text: post.content.text,
      },
      engagement: {
        ...post.engagement,
        likes: post.engagement?.likes || 0,
        comments: post.engagement?.comments || 0,
        shares: post.engagement?.shares || 0,
        isLiked: post.engagement?.isLiked || false,
      },
    }));
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name
      .toLowerCase()
      .includes(memberSearchQuery.toLowerCase());
    const matchesRole =
      memberRoleFilter === "all" || member.role === memberRoleFilter;
    const matchesStatus =
      memberStatusFilter === "all" || member.status === memberStatusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Add new state for club statistics
  const [, setClubStats] = useState<ClubStats>({
    totalPosts: 0,
    activeDiscussions: 0,
    totalEvents: 0,
    completedEvents: 0,
    averageAttendance: 0,
    memberGrowthRate: 0,
    engagementRate: 0,
    topContributors: [],
  });

  // Add useEffect for statistics calculation
  useEffect(() => {
    if (!selectedClub) return;

    const calculateStats = () => {
      const posts = getClubPosts();

      setClubStats({
        totalPosts: posts.length,
        activeDiscussions: posts.filter((p) => p.engagement.comments > 0)
          .length,
        totalEvents: events.length,
        completedEvents: events.filter((e) => e.status === "completed").length,
        averageAttendance:
          events.reduce(
            (acc, event) =>
              acc +
              event.attendees.filter((a) => a.status === "confirmed").length,
            0
          ) / Math.max(events.length, 1),
        memberGrowthRate: 0, // Calculate based on historical data
        engagementRate:
          posts.reduce(
            (acc, post) =>
              acc + post.engagement.likes + post.engagement.comments,
            0
          ) / Math.max(posts.length, 1),
        topContributors: members
          .sort((a, b) => b.contributions - a.contributions)
          .slice(0, 5),
      });
    };

    calculateStats();
  }, [selectedClub, members, events]);

  const renderClubContent = () => {
    switch (activeTab) {
      case "feed":
        return (
          <div className="space-y-4">
            {getClubPosts().map((post) => (
              <SocialMediaPost key={post.id} post={post} />
            ))}
          </div>
        );

      case "announcements":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Announcements</h3>
              <Button size="sm" variant="outline">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </div>
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium">{announcement.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {announcement.content}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <span>{announcement.author}</span>
                      <span>•</span>
                      <span>{announcement.date}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case "members":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  Members ({filteredMembers.length})
                </h3>
                <p className="text-sm text-gray-500">
                  {members.filter((m) => m.status === "active").length} active
                  members
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <Input
                    placeholder="Search members..."
                    value={memberSearchQuery}
                    onChange={(e) => setMemberSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <div className="flex gap-2">
                    <select
                      className="text-sm border rounded-md px-2 py-1"
                      value={memberRoleFilter}
                      onChange={(e) => setMemberRoleFilter(e.target.value)}
                    >
                      <option value="all">All Roles</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <select
                      className="text-sm border rounded-md px-2 py-1"
                      value={memberStatusFilter}
                      onChange={(e) => setMemberStatusFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="banned">Banned</option>
                    </select>
                  </div>
                </div>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Invite Members
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{member.name}</h4>
                          <Badge
                            variant="outline"
                            style={{
                              color: roles.find((r) => r.name === member.role)
                                ?.color,
                            }}
                          >
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {member.bio}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {member.socialLinks &&
                            Object.entries(member.socialLinks).map(
                              ([platform, handle]) => (
                                <a
                                  key={platform}
                                  href={`https://${platform}.com/${handle}`}
                                  className="text-gray-500 hover:text-gray-700"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <span className="text-sm">{platform}</span>
                                </a>
                              )
                            )}
                        </div>
                      </div>
                      <Badge
                        variant={
                          member.status === "active"
                            ? "default"
                            : member.status === "inactive"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {member.status}
                      </Badge>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {member.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div>
                        Joined {new Date(member.joinDate).toLocaleDateString()}
                      </div>
                      <div>{member.contributions} contributions</div>
                      <div>
                        Last active{" "}
                        {formatDistanceToNow(new Date(member.lastActive))} ago
                      </div>
                    </div>

                    {member.badges.length > 0 && (
                      <div className="flex gap-2">
                        {member.badges.map((badge) => (
                          <Tooltip key={badge.id}>
                          <TooltipTrigger>
                            <div className="flex items-center gap-1 text-sm bg-gray-50 px-2 py-1 rounded">
                              <span>{badge.icon}</span>
                              <span>{badge.name}</span>
                            </div>
                          </TooltipTrigger>
                            <TooltipContent>{badge.description}</TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      {member.role !== "admin" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                              Manage
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            <DropdownMenuItem>
                              Remove from Club
                            </DropdownMenuItem>
                            {member.status !== "banned" ? (
                              <DropdownMenuItem className="text-red-600">
                                Ban Member
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>Unban Member</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Active Members</div>
                    <div className="text-2xl font-semibold">
                      {selectedClub?.memberCount}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Posts</div>
                    <div className="text-2xl font-semibold">
                      {getClubPosts().length}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Avg. Engagement</div>
                    <div className="text-2xl font-semibold">
                      {Math.round(
                        getClubPosts().reduce(
                          (acc, post) =>
                            acc +
                            post.engagement.likes +
                            post.engagement.comments,
                          0
                        ) / getClubPosts().length
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Member Activity</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-4">
                    Activity by Day
                  </h4>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Activity chart coming soon
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-4">
                    Top Contributors
                  </h4>
                  <div className="space-y-3">
                    {members.slice(0, 5).map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {member.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {member.role}
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {Math.floor(Math.random() * 100)} points
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Recent Activity</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 pb-4 border-b last:border-0"
                  >
                    <div className="bg-gray-100 p-2 rounded-full">
                      <ChartBar className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">New member</span> joined
                        the club
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Engagement Metrics</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Posts This Week</div>
                  <div className="text-2xl font-semibold mt-1">24</div>
                  <div className="text-xs text-green-600 mt-1">
                    ↑ 12% vs last week
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">
                    Active Discussions
                  </div>
                  <div className="text-2xl font-semibold mt-1">8</div>
                  <div className="text-xs text-red-600 mt-1">
                    ↓ 3% vs last week
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">New Members</div>
                  <div className="text-2xl font-semibold mt-1">15</div>
                  <div className="text-xs text-green-600 mt-1">
                    ↑ 25% vs last week
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">
                    Avg. Response Time
                  </div>
                  <div className="text-2xl font-semibold mt-1">2.5h</div>
                  <div className="text-xs text-green-600 mt-1">
                    ↑ 15% faster
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Activity</h3>
                <Button variant="outline" size="sm">
                  Export Log
                </Button>
              </div>
              <div className="space-y-4">
                {activityLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={log.userAvatar} />
                      <AvatarFallback>{log.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{log.user}</span>{" "}
                        {log.action}
                        {log.details && (
                          <span className="text-gray-600">
                            {" "}
                            - {log.details}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {log.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case "events":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {events.map((event) => (
                <Card key={event.id} className="p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {event.description}
                        </p>
                      </div>
                      <Badge
                        variant={
                          event.type === "online"
                            ? "default"
                            : event.type === "in-person"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {event.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {event.attendees.length}/{event.maxAttendees}{" "}
                          attendees
                        </span>
                      </div>
                      <Button size="sm">RSVP</Button>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    // If no club is selected and clubs exist, select the first one
    if (!selectedClub && clubsList.length > 0) {
      setSelectedClub(clubsList[0]);
    }
  }, [clubsList]);

  return (
    <div className="grid grid-cols-9 min-h-screen">
      {/* Left Sidebar - Club List */}
      <div className="col-span-3 p-4 w-full">
        <div className="space-y-4 sticky top-6 bg-white rounded-xl shadow-sm p-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Clubs</h2>
              <Badge variant="outline" className="text-primary">
                {filteredClubs.length} clubs
              </Badge>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search clubs..."
                className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs
              defaultValue="all"
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsList className="w-full bg-gray-50/50 p-1">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="capitalize data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-3 mt-6">
            {filteredClubs.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                isSelected={selectedClub?.id === club.id}
                onSelect={() => handleClubClick(club)}
                onJoinClick={handleJoinClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-6 space-y-6 p-4 mx-auto w-full">
        {selectedClub ? (
          <>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedClub.coverImage})` }}
              />
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {selectedClub.name}
                    </h1>
                    <Badge variant="secondary" className="mt-2">
                      {selectedClub.category}
                    </Badge>
                  </div>
                  <Button
                    variant={selectedClub.isJoined ? "secondary" : "default"}
                    onClick={() => handleJoinClick(selectedClub.id)}
                    className="shadow-sm"
                  >
                    {selectedClub.isJoined ? "Joined" : "Join"}
                  </Button>
                </div>
                <p className="text-gray-600 mt-4">{selectedClub.description}</p>
              </div>
            </div>

            {/* Upcoming Events Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Upcoming Events</h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((_, i) => (
                  <div
                    key={i}
                    className="group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-lg p-2 group-hover:bg-primary/20 transition-colors">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Club Meeting {i + 1}</h4>
                        <p className="text-sm text-gray-500">Next Week</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 gap-4 bg-transparent">
                <TabsTrigger
                  value="feed"
                  className="data-[state=active]:bg-primary/10"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Feed
                </TabsTrigger>
                <TabsTrigger
                  value="announcements"
                  className="data-[state=active]:bg-primary/10"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Announcements
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className="data-[state=active]:bg-primary/10"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Members
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-primary/10"
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="mt-6">
                {renderClubContent()}
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="h-[80vh] flex flex-col items-center justify-center text-gray-500 bg-white rounded-xl shadow-sm">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <Users className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Club Selected</h2>
            <p>Select a club from the sidebar to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
