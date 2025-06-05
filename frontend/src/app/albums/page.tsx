'use client'

import AlbumCard from "@/components/AlbumsSection/AlbumCard";
import CreateOrEditAlbumModal from "@/components/CreateOrEditAlbumModal ";
import { albums } from "@/util/albums";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";

export default function AlbumsPage() {
  const [showNewAlbumModal, setShowNewAlbumModal] = useState(false)
  const [isAnAdminUser, setIsAnAdminUser] = useState(false)

  useEffect(() => {
    if(localStorage?.getItem("isAnAdminUser")) {
      setIsAnAdminUser(true)
    }
  }, [])

  return (
    <>
    {showNewAlbumModal && (
      <CreateOrEditAlbumModal setVisible={setShowNewAlbumModal}/>
    )}
    <div className={`albums-page`}>
      <div className="albums-page-wrapper">
        <Row>
          <h1 style={{ color: 'white' }}>ÁLBUNS</h1>
          {isAnAdminUser && (
            <MdOutlineAdd size={30} className="action-artist-button" onClick={() => setShowNewAlbumModal(true)}/>
          )}
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
    </>
  )
}