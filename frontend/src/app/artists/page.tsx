'use client'

import ArtistCard from "@/components/ArtistsSection/ArtistCard";
import { artists } from "@/util/artists";
import { Col, Row } from "antd";

export default function ArtistsPage() {
  return (
    <div className={`artists-page`}>
      <div className="artists-page-wrapper">
        <Row>
          <h1 style={{ color: 'white' }}>ARTISTAS</h1>
        </Row>
        <Row style={{ marginTop: 10 }} gutter={[16, 16]}>
          {artists?.map((artist, index) => {
            return (
              <Col span={4} key={index}>
                <ArtistCard artist={artist}/>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}