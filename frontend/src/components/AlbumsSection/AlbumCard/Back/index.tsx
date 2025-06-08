/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd"

export default function Back({musics}: any) {
  return (
    <Row style={{width: '100%'}}>
      {musics?.map((music: any, index: any) => {
        return (
          <Col span={24} key={index} style={{marginTop: index > 0 ? 10 : 0, textAlign: 'start'}}>
            <Row justify="start" style={{marginLeft: 15, fontSize: 16, fontWeight: 600}}>
              {`${index+1}. ${music?.titulo}`}
            </Row>
            <Row justify="start" style={{marginLeft: 32, fontSize: 12, fontWeight: 400, opacity: 0.7}}>
              {music?.artistas[0]?.nome}
            </Row>
            {music?.artistas?.slice(1, music?.artistas?.length)?.length > 0 && (
              <Row justify="start" style={{marginLeft: 32, fontSize: 12, fontWeight: 400, opacity: 0.7}}>
                {`Feat: ${music?.artistas?.slice(1, music?.artistas?.length)?.map((a: {nome: string}) => a.nome)?.join(', ')}`}
              </Row>
            )}
          </Col>
        )
      })}
    </Row>
  )
}