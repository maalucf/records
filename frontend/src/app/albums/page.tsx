/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import AlbumCard from "@/components/AlbumsSection/AlbumCard";
import CreateOrEditAlbumModal from "@/components/CreateOrEditAlbumModal ";
import { getAlbums } from "@/services/artists";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";

export default function AlbumsPage() {
  const [showNewAlbumModal, setShowNewAlbumModal] = useState(false)
  const [isAnAdminUser, setIsAnAdminUser] = useState(false)
  const [refetchQuery, setRefetchQuery] = useState(false)
  const [allAlbums, setAllAlbums] = useState([] as any[])
  
  useEffect(() => {
    setRefetchQuery(true)
    if(localStorage?.getItem("isAnAdminUser")) {
      setIsAnAdminUser(true)
    }
  }, [])

  useEffect(() => {
    if(refetchQuery) {
      getAllAlbums()
      setRefetchQuery(false)
    }
  }, [refetchQuery])
  
  async function getAllAlbums() {
    try {
      const data = await getAlbums()
      setAllAlbums(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    {showNewAlbumModal && (
      <CreateOrEditAlbumModal setVisible={setShowNewAlbumModal} setRefetchQuery={setRefetchQuery}/>
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
          {allAlbums?.map((album, index) => (
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