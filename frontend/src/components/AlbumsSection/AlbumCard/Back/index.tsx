import { IAlbumBackCard } from "@/types/sectionTypes"
import { Col, Row } from "antd"

export default function Back({musics}: IAlbumBackCard) {
  return (
    <Row style={{width: '100%'}}>
      {musics?.map((music, index) => {
        return (
          <Col span={24} key={index} style={{marginTop: index > 0 ? 10 : 0, textAlign: 'start'}}>
            <Row justify="start" style={{marginLeft: 15, fontSize: 16, fontWeight: 600}}>
              {`${index+1}. ${music?.name}`}
            </Row>
            <Row justify="start" style={{marginLeft: 32, fontSize: 12, fontWeight: 400, opacity: 0.7}}>
              {`quem canta`}
            </Row>
          </Col>
        )
      })}
    </Row>
  )
}