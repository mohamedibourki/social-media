import SocialMediaPost from "../components/SocialMediaPost";
import useAuth from "../hooks/use-auth";
import { posts } from "../data/posts";

export const DashboardHome = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {/* Left Sidebar - Fixed */}
      <div className="col-span-3">
        <div className="space-y-4 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-3">Profile Overview</h2>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Profile"
                className="rounded-full w-12 h-12"
              />
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-gray-500">@johndoe</div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <div className="font-medium">1,234</div>
                <div className="text-gray-500">Followers</div>
              </div>
              <div>
                <div className="font-medium">567</div>
                <div className="text-gray-500">Following</div>
              </div>
              <div>
                <div className="font-medium">89</div>
                <div className="text-gray-500">Posts</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-3">Your Clubs</h2>
            <div className="space-y-3">
              {[
                {
                  name: "Chess Masters",
                  members: "1.2k",
                  color: "bg-purple-100",
                },
                { name: "Book Club", members: "856", color: "bg-green-100" },
                {
                  name: "Fitness Group",
                  members: "2.3k",
                  color: "bg-orange-100",
                },
                { name: "Movie Buffs", members: "943", color: "bg-blue-100" },
              ].map((club) => (
                <div
                  key={club.name}
                  className="flex items-center justify-between hover:bg-gray-50 p-2 rounded cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-10 h-10 ${club.color} rounded-lg flex items-center justify-center font-medium`}
                    >
                      {club.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{club.name}</div>
                      <div className="text-xs text-gray-500">
                        {club.members} members
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              ))}
              <button className="w-full mt-2 text-sm text-blue-500 hover:text-blue-600 font-medium">
                Discover More Clubs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content (Posts) */}
      <div className="col-span-6 space-y-6">
        {posts.map((post) => (
          <SocialMediaPost key={post.id} post={post} />
        ))}
      </div>

      {/* Right Sidebar - Fixed */}
      <div className="col-span-3">
        <div className="space-y-4 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-3">Suggested Connections</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://via.placeholder.com/40`}
                      alt="User"
                      className="rounded-full w-10 h-10"
                    />
                    <div>
                      <div className="font-medium">User Name {i}</div>
                      <div className="text-sm text-gray-500">
                        Frontend Developer
                      </div>
                    </div>
                  </div>
                  <button className="text-blue-500 text-sm hover:text-blue-600">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-3">Upcoming Events</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-3">
                <div className="font-medium">Tech Meetup</div>
                <div className="text-sm text-gray-500">Tomorrow, 6:00 PM</div>
              </div>
              <div className="border-l-4 border-green-500 pl-3">
                <div className="font-medium">Code Review</div>
                <div className="text-sm text-gray-500">Friday, 2:00 PM</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-3">Trending Topics</h2>
            <div className="space-y-3">
              {[
                { tag: "typescript", posts: "2.3k" },
                { tag: "reactjs", posts: "1.8k" },
                { tag: "tailwindcss", posts: "945" },
              ].map((topic) => (
                <div
                  key={topic.tag}
                  className="flex items-center justify-between"
                >
                  <span className="text-blue-500">#{topic.tag}</span>
                  <span className="text-xs text-gray-500">
                    {topic.posts} posts
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-3">Your Activity</h2>
            <div className="space-y-3">
              {[
                {
                  action: "Commented on",
                  target: "TypeScript Best Practices",
                  time: "2h ago",
                },
                {
                  action: "Liked",
                  target: "React Performance Tips",
                  time: "4h ago",
                },
                {
                  action: "Shared",
                  target: "Frontend News Weekly",
                  time: "1d ago",
                },
              ].map((activity, i) => (
                <div key={i} className="text-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-600">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
