'use client'

import { IArtistCard } from "@/types/sectionTypes"
import { Card, Col, Row } from "antd"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ArtistCard({artist}: IArtistCard) {
  const [hoverImage, setHoverImage] = useState(false)
  const router = useRouter()

  function handleClickArtist() {
    router.push(`/artists/${artist?.id_artista}`)
  }

  return (
    <Card style={{backgroundColor: 'transparent', border: 'none', width: 250, height: 350, color: 'white'}} onClick={handleClickArtist}>
      <div className="artist-card">
        <Row justify={"center"} style={{textAlign: 'center'}}>
          <Col span={24} >
            <Image className={`artist-thumb ${hoverImage ? 'hovered' : ''}`} onMouseEnter={() => setHoverImage(true)} onMouseLeave={() => setHoverImage(false)} src={artist?.url_imagem} alt="" height={200} width={200}/>
          </Col>
          <Col span={24}>
            <p style={{fontWeight: 600, textTransform: 'capitalize'}}>{artist?.nome}</p>
          </Col>
          <Col span={24} style={{textTransform: 'capitalize'}}>
            <p>{artist?.generos_musicais}</p>
          </Col>
        </Row>
      </div>
    </Card>
  )
}