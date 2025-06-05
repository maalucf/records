'use client'

import ArtistCard from "@/components/ArtistsSection/ArtistCard";
import CreateOrEditArtistModal from "@/components/CreateOrEditArtistModal";
import { artists } from "@/util/artists";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";

export default function ArtistsPage() {
  const [showNewArtistModal, setShowNewArtistModal] = useState(false)
  const [isAnAdminUser, setIsAnAdminUser] = useState(false)

  useEffect(() => {
    if(localStorage?.getItem("isAnAdminUser")) {
      setIsAnAdminUser(true)
    }
  }, [])

  return (
    <>
      {showNewArtistModal && (
        <CreateOrEditArtistModal setVisible={setShowNewArtistModal}/>
      )}
      <div className={`artists-page`}>
        <div className="artists-page-wrapper">
          <Row>
            <h1 style={{ color: 'white' }}>ARTISTAS</h1>
            {isAnAdminUser && (
              <MdOutlineAdd size={30} className="action-artist-button" onClick={() => setShowNewArtistModal(true)}/>
            )}
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
    </>
  )
}