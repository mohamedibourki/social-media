import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Users, MapPin, Clock } from "lucide-react";

interface ClubDetailsProps {
  club: any;
  onJoinClick: (clubId: string) => void;
}

export function ClubDetails({ club, onJoinClick }: ClubDetailsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">{club.name}</h2>
            <p className="text-muted-foreground mb-4">{club.description}</p>
            <Badge variant="secondary" className="mb-4">
              {club.category}
            </Badge>
          </div>
          <Button
            variant={club.isJoined ? "secondary" : "default"}
            onClick={() => onJoinClick(club.id)}
          >
            {club.isJoined ? 'Leave Club' : 'Join Club'}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <Users className="h-5 w-5 mb-2" />
            <div className="font-medium">{club.memberCount}</div>
            <div className="text-sm text-muted-foreground">Members</div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <Clock className="h-5 w-5 mb-2" />
            <div className="font-medium">Meetings</div>
            <div className="text-sm text-muted-foreground">{club.meetingTime}</div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <MapPin className="h-5 w-5 mb-2" />
            <div className="font-medium">Location</div>
            <div className="text-sm text-muted-foreground">{club.location}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}