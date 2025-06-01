import { IAlbumFrontCard } from "@/types/sectionTypes";
import { Col, Row } from "antd";
import Image from "next/image"

export default function Front({name, thumb, artist, year, qty_music}: IAlbumFrontCard) {
  return (
    <Row justify={"center"} style={{textAlign: 'center'}}>
      <Col span={24}>
        <Image className="album-thumb" src={thumb} alt="" height={200} width={200}/>
      </Col>
      <Col span={24}>
        <p style={{fontWeight: 600}}>{name}</p>
      </Col>
      <Col span={24}>
        {artist}
      </Col>
      <Col span={24}>
        {`${year} • ${qty_music} músicas`}
      </Col>
    </Row>
  )
}