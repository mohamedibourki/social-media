import { Button } from '../components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../components/ui/sheet';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Users, MapPin, Clock, UserCircle, Calendar } from 'lucide-react';

interface ClubDetailsPanelProps {
  club: any;
  open: boolean;
  onClose: () => void;
  onJoinClick: (clubId: string) => void;
}

export function ClubDetailsPanel({ club, open, onClose, onJoinClick }: ClubDetailsPanelProps) {
  if (!club) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl">
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <SheetHeader className="space-y-4 pb-4">
            <div
              className="h-48 -mx-6 -mt-6 bg-cover bg-center"
              style={{ backgroundImage: `url(${club.coverImage})` }}
            />
            <div className="px-2">
              <div className="flex justify-between items-start">
                <div>
                  <SheetTitle className="text-2xl font-bold">{club.name}</SheetTitle>
                  <Badge variant="secondary" className="mt-2">
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
            </div>
          </SheetHeader>

          <div className="space-y-6 px-2">
            <div>
              <h3 className="font-medium mb-2">About</h3>
              <p className="text-muted-foreground">{club.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <Users className="h-5 w-5 mb-2" />
                <div className="font-medium">{club.memberCount}</div>
                <div className="text-sm text-muted-foreground">Members</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <UserCircle className="h-5 w-5 mb-2" />
                <div className="font-medium">{club.advisor}</div>
                <div className="text-sm text-muted-foreground">Advisor</div>
              </div>
            </div>

            <Separator />

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Meeting Time</div>
                      <div className="text-sm text-muted-foreground">{club.meetingTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-muted-foreground">{club.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Next Meeting</div>
                      <div className="text-sm text-muted-foreground">Coming soon</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="members" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Club Members</div>
                    <Badge variant="secondary">{club.memberCount} members</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground text-center py-8">
                    Member list coming soon
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}