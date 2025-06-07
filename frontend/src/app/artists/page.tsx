/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import ArtistCard from "@/components/ArtistsSection/ArtistCard";
import CreateOrEditArtistModal from "@/components/CreateOrEditArtistModal";
import { getArtists } from "@/services/artists";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";

export default function ArtistsPage() {
  const [showNewArtistModal, setShowNewArtistModal] = useState(false)
  const [isAnAdminUser, setIsAnAdminUser] = useState(false)
  const [allArtists, setAllArtists] = useState([] as any[])
  const [refetchQuery, setRefetchQuery] = useState(false)

  useEffect(() => {
    setRefetchQuery(true)
    if(localStorage?.getItem("isAnAdminUser")) {
      setIsAnAdminUser(true)
    }
  }, [])

  useEffect(() => {
    if(refetchQuery) {
      getAllArtists()
      setRefetchQuery(false)
    }
  }, [refetchQuery])

  async function getAllArtists() {
    try {
      const data = await getArtists()
      setAllArtists(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {showNewArtistModal && (
        <CreateOrEditArtistModal setVisible={setShowNewArtistModal} setRefetchQuery={setRefetchQuery}/>
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
            {allArtists?.map((artist, index) => {
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