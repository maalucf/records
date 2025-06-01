import { Col, Row } from "antd";
import ArtistCard from "./ArtistCard";

export default function ArtistsSection() {
  const artists = [
    {name: 'artista 1'},
    {name: 'artista 2'},
    {name: 'artista 3'},
    {name: 'artista 4'},
    {name: 'artista 5'},
    {name: 'artista 6'},
    {name: 'artista 7'},
    {name: 'artista 8'},
  ]

  return (
    <section className={"artists-section"}>
      <div className="artists-section-wrapper">
        <Row>
          <h1>ARTISTAS</h1>
        </Row>
        <Row style={{marginTop: 10}} gutter={[16,16]}>
          {artists?.map((artist, index) => {
            return (
              <Col span={4} key={index}>
                <ArtistCard artistName={artist?.name}/>
              </Col>
            )
          })}
        </Row>
      </div>
    </section>
  )
}