import { IArtistCard } from "@/types/sectionTypes"
import { Card, Col, Row } from "antd"
import Image from "next/image"

export default function ArtistCard({name, thumb, musicGender, albuns}: IArtistCard) {
  return (
    <Card style={{backgroundColor: 'transparent', border: 'none', width: 250, height: 350, color: 'white'}}>
      <div className="artist-card">
        <Row justify={"center"} style={{textAlign: 'center'}}>
          <Col span={24}>
            <Image className="album-thumb" src={thumb} alt="" height={200} width={200}/>
          </Col>
          <Col span={24}>
            <p style={{fontWeight: 600, textTransform: 'capitalize'}}>{name}</p>
          </Col>
          <Col span={24} style={{textTransform: 'capitalize'}}>
            <p>{musicGender}</p>
          </Col>
          <Col span={24}>
            <p>{`${albuns} Álbuns lançados`}</p>
          </Col>
        </Row>
      </div>
    </Card>
  )
}