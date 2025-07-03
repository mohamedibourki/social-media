"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Bookmark,
  Send,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { cn } from "../lib/utils";
import { Calendar, Camera, Globe2, Users } from "lucide-react";

const SCHOOL_IMAGES = {
  logo: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1?w=400&h=400&fit=crop", // university shield
  scienceFair:
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=800&fit=crop", // science fair/lab setup
  studentAvatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop", // profile picture
};

export interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    isOfficial?: boolean;
  };
  content: {
    text: string;
    image?: string;
    location?: string;
    tags?: string[];
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
}

export default function SocialMediaPost({ post }: { post: Post }) {
  console.log('Post received in SocialMediaPost:', post);
  const [likes, setLikes] = useState(post.engagement.likes);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState(post.engagement.comments);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const toggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      setComments(comments + 1);
      setCommentText("");
      setShowCommentInput(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mb-6 rounded-3xl overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-background via-background to-background/80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-b from-background to-muted/20">
        <div className="flex items-center space-x-4">
          <HoverCard>
            <HoverCardTrigger>
              <Avatar className="h-14 w-14 ring-2 ring-primary/80 ring-offset-2 transition-all duration-300 hover:scale-105 hover:ring-offset-4 hover:shadow-lg hover:shadow-primary/20">
                <AvatarImage
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary/5 animate-pulse">
                  SC
                </AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4 backdrop-blur-sm border-primary/20">
              <div className="flex justify-between space-x-4">
                <Avatar className="h-24 w-24 ring-1 ring-primary/20">
                  <AvatarImage
                    src={post.author.avatar}
                    className="object-cover"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h4 className="text-base font-semibold tracking-tight">
                    {post.author.name}
                  </h4>
                  <p className="text-sm text-muted-foreground/80">
                    Official School Announcements
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
                    <div className="flex items-center bg-primary/5 px-2 py-1 rounded-full">
                      <Users className="mr-1.5 h-3 w-3" />
                      1.2K students
                    </div>
                    <div className="flex items-center bg-primary/5 px-2 py-1 rounded-full">
                      <Calendar className="mr-1.5 h-3 w-3" />
                      2023-2024
                    </div>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer group">
                {post.author.name}
                <span className="block h-0.5 max-w-0 group-hover:max-w-full transition-all duration-500 bg-primary"></span>
              </p>
              {post.author.isOfficial && (
                <Badge
                  variant="secondary"
                  className="text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  Official
                </Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground/80 mt-1">
              <Globe2 className="mr-1.5 h-3.5 w-3.5" />
              <span className="hover:text-primary transition-colors">
                @{post.author.username}
              </span>
              <span className="mx-2 text-muted-foreground/40">•</span>
              <Tooltip>
                <TooltipTrigger>
                  <span className="cursor-help hover:text-primary transition-colors">
                    {post.timestamp}
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-background/95 backdrop-blur-sm"
                >
                  <div className="flex items-center px-1 text-black">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    Posted on {new Date().toLocaleDateString()} at{" "}
                    {new Date().toLocaleTimeString()}
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 transition-all duration-300"
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[180px] backdrop-blur-sm"
          >
            <DropdownMenuLabel className="text-primary/80">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem className="gap-2">
              <Share2 className="h-4 w-4" /> Copy link
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-destructive">
              <MessageCircle className="h-4 w-4" /> Report post
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <Users className="h-4 w-4" /> Unfollow @{post.author.username}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        {post.content.image && (
          <img src={post.content.image} alt="" className="w-full" />
        )}
        <p
          className={cn(
            "text-lg leading-relaxed space-y-4",
            post.content.image && "mt-3",
            !isExpanded && post.content.text.length > 180 && "line-clamp-3"
          )}
        >
          {post.content.text}
        </p>
        {!isExpanded && post.content.text.length > 180 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="text-muted-foreground hover:text-primary p-0 h-auto group mt-2"
          >
            Read more
            <span className="block h-0.5 max-w-0 group-hover:max-w-full transition-all duration-500 bg-primary"></span>
          </Button>
        )}
        {post.content.tags && (
          <div className="flex gap-2 mt-2">
            {post.content.tags.map(tag => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <Separator className="opacity-50" />
      <CardFooter className="flex flex-col gap-4 py-4 bg-gradient-to-b from-muted/5 to-muted/10">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <Avatar className="h-6 w-6 border-2 border-background">
                <AvatarImage src="https://i.pravatar.cc/100?img=1" />
              </Avatar>
              <Avatar className="h-6 w-6 border-2 border-background">
                <AvatarImage src="https://i.pravatar.cc/100?img=2" />
              </Avatar>
              <Avatar className="h-6 w-6 border-2 border-background">
                <AvatarImage src="https://i.pravatar.cc/100?img=3" />
              </Avatar>
            </div>
            <span className="text-sm text-muted-foreground">
              Liked by{" "}
              <span className="font-medium text-foreground">Sarah</span> and{" "}
              {likes - 1} others
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{comments} comments</span>
            <span>•</span>
            <span>{post.engagement.shares} shares</span>
          </div>
        </div>

        <div className="flex justify-between w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn(
              "flex-1 transition-all duration-300 hover:scale-105",
              "hover:shadow-inner rounded-xl gap-2",
              liked
                ? "text-red-500 hover:text-red-600 hover:bg-red-100/20"
                : "hover:bg-muted/60 text-muted-foreground hover:text-primary"
            )}
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-transform",
                liked && "animate-heartbeat scale-110"
              )}
              fill={liked ? "currentColor" : "none"}
            />
            <span className="font-medium">{likes - 1}</span>
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1 opacity-20" />

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCommentInput}
            className={cn(
              "flex-1 transition-all duration-300 hover:scale-105",
              "hover:shadow-inner rounded-xl gap-2",
              "hover:bg-muted/60 text-muted-foreground hover:text-primary"
            )}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">{comments}</span>
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1 opacity-20" />

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-1 transition-all duration-300 hover:scale-105",
              "hover:shadow-inner rounded-xl gap-2",
              "hover:bg-muted/60 text-muted-foreground hover:text-primary"
            )}
          >
            <Share2 className="w-5 h-5" />
            <span className="font-medium">Share</span>
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1 opacity-20" />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={cn(
              "flex-1 transition-all duration-300 hover:scale-105",
              "hover:shadow-inner rounded-xl gap-2",
              bookmarked
                ? "text-yellow-500 hover:text-yellow-600 hover:bg-yellow-100/20"
                : "hover:bg-muted/60 text-muted-foreground hover:text-primary"
            )}
          >
            <Bookmark
              className={cn(
                "w-5 h-5 transition-transform",
                bookmarked && "scale-110"
              )}
              fill={bookmarked ? "currentColor" : "none"}
            />
            <span className="font-medium">Save</span>
          </Button>
        </div>
      </CardFooter>
      {showCommentInput && (
        <>
          <Separator className="opacity-50" />
          <CardFooter className="pt-4 pb-6 bg-gradient-to-b from-background/50 to-muted/10">
            <div className="flex items-start space-x-4 w-full">
              <Avatar className="h-9 w-9 ring-2 ring-primary/20 transition-all duration-300 hover:scale-105 hover:ring-primary/40 hover:shadow-lg">
                <AvatarImage
                  src={SCHOOL_IMAGES.studentAvatar}
                  alt="Your avatar"
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary/5 animate-pulse">
                  YA
                </AvatarFallback>
              </Avatar>
              <div className="relative flex-grow group">
                <Input
                  className="pr-24 min-h-[2.75rem] bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/30 
                    focus-visible:border-primary/30 transition-all duration-300 rounded-2xl placeholder:text-muted-foreground/50
                    hover:bg-muted/70 hover:border-primary/20"
                  placeholder="Share your thoughts..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCommentSubmit();
                    } else if (e.key === "Escape") {
                      setShowCommentInput(false);
                      setCommentText("");
                    }
                  }}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full hover:bg-primary/10 transition-all duration-300 text-muted-foreground/70 
                      hover:text-primary hover:scale-105"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Add image</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 
                      text-primary hover:scale-105 hover:shadow-md hover:shadow-primary/20"
                    onClick={handleCommentSubmit}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Post comment</span>
                  </Button>
                </div>
                <div className="absolute -bottom-6 left-0 text-xs text-muted-foreground/50 hidden group-focus-within:block">
                  Press Enter to post • ESC to cancel
                </div>
              </div>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
