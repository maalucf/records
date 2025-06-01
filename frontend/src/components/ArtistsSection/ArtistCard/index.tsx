import { IArtistCard } from "@/types/sectionTypes"
import { Card } from "antd"

export default function ArtistCard({artistName}: IArtistCard) {
  return (
    <Card style={{borderColor: 'black', width: 250, height: 350}}>
        {artistName}
    </Card>
  )
}