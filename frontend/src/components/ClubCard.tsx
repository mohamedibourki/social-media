import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Users, MapPin, Clock } from "lucide-react";

interface ClubCardProps {
  club: any;
  isSelected: boolean;
  onSelect: () => void;
  onJoinClick: (clubId: string) => void;
}

export function ClubCard({ club, isSelected, onSelect, onJoinClick }: ClubCardProps) {
  return (
    <Card 
      className={`overflow-hidden transition-all hover:shadow-lg cursor-pointer group ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onSelect}
    >
      <div 
        className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${club.coverImage})` }}
      />
      <CardContent className="p-5">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">{club.name}</h3>
              <Badge variant="secondary">{club.category}</Badge>
            </div>
            <Button
              variant={club.isJoined ? "secondary" : "default"}
              onClick={(e) => {
                e.stopPropagation();
                onJoinClick(club.id);
              }}
              className="shadow-sm"
            >
              {club.isJoined ? "Leave Club" : "Join Club"}
            </Button>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{club.memberCount} members</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{club.meetingTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{club.location}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}