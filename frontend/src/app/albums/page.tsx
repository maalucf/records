'use client'

import AlbumCard from "@/components/AlbumsSection/AlbumCard";
import { albums } from "@/util/albums";
import { Col, Row } from "antd";

export default function AlbumsPage() {
  return (
    <div className={`albums-page`}>
      <div className="albums-page-wrapper">
        <Row>
          <h1 style={{ color: 'white' }}>ÁLBUNS</h1>
        </Row>
        <Row style={{ marginTop: 10 }} gutter={[16, 16]}>
          {albums?.map((album, index) => (
            <Col span={4} key={index}>
              <AlbumCard
                album={album}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}