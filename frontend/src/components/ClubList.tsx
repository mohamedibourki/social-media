import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Users, MapPin } from "lucide-react";

interface ClubListProps {
  clubs: any[];
  selectedClub: any | null;
  onSelectClub: (club: any) => void;
}

export function ClubList({ clubs, selectedClub, onSelectClub }: ClubListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
      <div className="space-y-4">
        {clubs.map((club) => (
          <Card
            key={club.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedClub?.id === club.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelectClub(club)}
          >
            <CardContent className="p-4">
              <div
                className="h-32 rounded-md bg-cover bg-center mb-4"
                style={{ backgroundImage: `url(${club.coverImage})` }}
              />
              <h3 className="font-semibold mb-2">{club.name}</h3>
              <Badge variant="secondary" className="mb-3">
                {club.category}
              </Badge>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{club.memberCount} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{club.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
