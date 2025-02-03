// /src/components/dashboard/TopTrackCard.tsx

import * as React from "react"
import { cn } from "@/src/lib/utils"  // Assuming this is a utility function for className merging
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/src/components/ui/card"  // Adjust the path based on where your card components are defined


interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumArtUrl: string;
}

interface TopTrackCardProps {
  track: Track;
  className?: string;
}

const TopTrackCard = React.forwardRef<HTMLDivElement, TopTrackCardProps>(
  ({ track, className }, ref) => (
    <div ref={ref} className={cn("w-64", className)}>
      <Card>
        <CardHeader>
          <CardTitle>{track.name}</CardTitle>
          <CardDescription>{track.artist}</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={track.albumArtUrl}
            alt={`Album art for ${track.album}`}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="mt-2 text-sm text-muted-foreground">{track.album}</div>
        </CardContent>
        <CardFooter>
          <a
            href={`https://open.spotify.com/track/${track.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Listen on Spotify
          </a>
        </CardFooter>
      </Card>
    </div>
  )
)

TopTrackCard.displayName = "TopTrackCard"

export default TopTrackCard;
