export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: {
    text: string;
    images?: string[];
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    isLiked: boolean;
  };
  timestamp: string;
}
