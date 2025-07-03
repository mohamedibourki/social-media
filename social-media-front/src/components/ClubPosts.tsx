import { generateClubPosts } from "../data/club-posts";
import SocialMediaPost from "./SocialMediaPost";

interface ClubPostsProps {
  club: {
    id: string;
    name: string;
  };
}

export function ClubPosts({ club }: ClubPostsProps) {
  const posts = generateClubPosts(club.name);
  
  return (
    <div className="space-y-6">
      {posts.map((post) => {
        console.log('Post being passed to SocialMediaPost:', post);
        if (!post || !post.likes) {
          console.log('Invalid post data:', post);
          return null;
        }
        return <SocialMediaPost key={post.id} post={post} />;
      })}
    </div>
  );
}