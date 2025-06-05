'use client'

import { IAlbumMusic } from "@/types/sectionTypes";
import { albums } from "@/util/albums";
import { Col, Row, Table } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function AlbumPage() {
  const { id } = useParams()
  const router = useRouter()
  const currentAlbum = albums?.filter((album) => album.id === Number(id))[0]
  

  const columns = [
    {
      title: '#',
      key: 'index',
      width: 10,
      render: (text: IAlbumMusic, record: IAlbumMusic, index: number) => index + 1,
    },
    {
      title: 'Título',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: IAlbumMusic) => {
        return (
          <Row>
            <Col span={24}>
              <Row justify="start" style={{fontSize: 16, fontWeight: 600}}>
                {record?.name}
              </Row>
              <Row justify="start" style={{fontSize: 12, fontWeight: 400, opacity: 0.7}}>
                {record?.singers}
              </Row>
            </Col>
          </Row>
        )
      } 
    },
    {
      title: 'Duração',
      dataIndex: 'age',
      width: 150,
      key: 'age',
    }
  ];

  function gotoArtistPage() {
    // currentAlbum?.artist_id
    router.push(`/artists/${currentAlbum?.artist_id}`)
  }


  return (
    <div className="album-page">
      <Row className="header">
        <Col>
          <Image src={currentAlbum?.thumb} width={232} height={232} alt="album-photo" className="artist-photo"/>
        </Col>
        <Col span={20} className="album-infos">
          <Row>
            <Col span={24}>
              <p className="classification">
                {"Álbum"}
              </p>
            </Col>
            <Col span={24}>
              <p className="name">
                {currentAlbum?.name}
              </p>
            </Col>
            <Col span={24}>
              <span className="artist" onClick={gotoArtistPage}>
                <Image src={currentAlbum?.thumb} width={24} height={24} alt="album-photo" className="photo"/>
                {currentAlbum?.artist}
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="music-infos">
        <Table
          dataSource={currentAlbum?.musics}
          columns={columns}
          style={{width: '100%'}}
          pagination={false}
          rowKey={"name"}
        />
      </Row>
    </div>
  );
}