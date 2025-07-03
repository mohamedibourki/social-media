import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Clock, MapPin } from "lucide-react"

export default function CampusMap() {
  return (
    <div className="flex h-[89vh] items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-lg p-8 space-y-6">
        <div className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="rounded-full p-3 bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Campus Map</h1>
          <p className="text-muted-foreground">
            We're working on something exciting. Stay tuned!
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Coming Soon</span>
        </div>

        <div className="flex justify-center">
          <Button variant="outline">Get Notified</Button>
        </div>
      </Card>
    </div>
  )
}
