import { IAlbumCard } from "@/types/sectionTypes"
import { Card } from "antd"
import { useState } from "react"
import Front from "./Front"
import Back from "./Back"

export default function AlbumCard({name, thumb, artist, year, qty_music, musics}: IAlbumCard) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <Card style={{backgroundColor: 'transparent', border: 'none', width: 250, height: 350}} onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)}>
        <div className="album-card-container">
          <div className={`album-card ${isFlipped ? "flipped" : ""}`}>
            <div className="album-card-front">
              <Front name={name} thumb={thumb} artist={artist} year={year} qty_music={qty_music}/>
            </div>
            <div className="album-card-back">
              <Back musics={musics} />
            </div>
          </div>
        </div>
    </Card>
  )
}