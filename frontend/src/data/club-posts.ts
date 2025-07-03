export const generateClubPosts = (clubName: string): any[] => {
  const clubImages = {
    'Chess Club': [
      'https://images.unsplash.com/photo-1529699211952-734e80c4d42b',
      'https://images.unsplash.com/photo-1580541832626-2a7131ee809f',
      'https://images.unsplash.com/photo-1638539966851-e56c3701f7c4',
    ],
    'Robotics Club': [
      'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
      'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801',
    ],
    'Environmental Club': [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e694',
    ],
  };

  const defaultImages = [
    'https://source.unsplash.com/random/800x600?club',
    'https://source.unsplash.com/random/800x600?meeting',
    'https://source.unsplash.com/random/800x600?event',
  ];

  const getClubImages = (clubName: string) => {
    return clubImages[clubName as keyof typeof clubImages] || defaultImages;
  };

  return [
    {
      id: `${clubName}-1`,
      author: {
        name: "Sarah Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
        username: "sarahw",
      },
      content: {
        text: `Just had an amazing discussion in ${clubName} about the latest developments! What are your thoughts? #${clubName.replace(' ', '')}`,
        images: [getClubImages(clubName)[0], getClubImages(clubName)[1]]
      },
      engagement: {
        likes: 45,
        comments: 12,
        shares: 5,
        isLiked: false
      },
      timestamp: "2h ago",
    },
    {
      id: `${clubName}-2`,
      author: {
        name: "Mike Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
        username: "mikej",
      },
      content: {
        text: `Excited to share my progress with fellow ${clubName} members! Looking forward to your feedback.`,
        images: [getClubImages(clubName)[1]]
      },
      engagement: {
        likes: 32,
        comments: 8,
        shares: 3,
        isLiked: false
      },
      timestamp: "5h ago",
    },
    {
      id: `${clubName}-3`,
      author: {
        name: "Emily Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
        username: "emilyc",
      },
      content: {
        text: `Monthly ${clubName} meetup was a blast! Here are some highlights from our session.`,
        images: [
          getClubImages(clubName)[0],
          getClubImages(clubName)[1],
          getClubImages(clubName)[2]
        ]
      },
      engagement: {
        likes: 89,
        comments: 24,
        shares: 15,
        isLiked: false
      },
      timestamp: "1d ago",
    }
  ];
};
