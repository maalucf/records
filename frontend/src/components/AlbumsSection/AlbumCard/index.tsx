import { IAlbumCard } from "@/types/sectionTypes"
import { Card } from "antd"
import { useState } from "react"
import Front from "./Front"
import Back from "./Back"
import { useRouter } from "next/navigation"

export default function AlbumCard({album}: IAlbumCard) {
  const [isFlipped, setIsFlipped] = useState(false)
  const router = useRouter()

  function handleClickAlbum() {
    router.push(`/albums/${album?.id}`)
  }

  return (
    <Card style={{backgroundColor: 'transparent', border: 'none', width: 250, height: 350}} onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)} onClick={handleClickAlbum}>
        <div className="album-card-container">
          <div className={`album-card ${isFlipped ? "flipped" : ""}`}>
            <div className="album-card-front">
              <Front name={album?.name} thumb={album?.thumb} artist={album?.artist} year={album?.year} qty_music={album?.qty_music}/>
            </div>
            <div className="album-card-back">
              <Back musics={album?.musics} />
            </div>
          </div>
        </div>
    </Card>
  )
}