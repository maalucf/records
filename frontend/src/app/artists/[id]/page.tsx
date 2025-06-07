'use client'

import AlbumCard from "@/components/AlbumsSection/AlbumCard";
import CreateOrEditArtistModal from "@/components/CreateOrEditArtistModal";
import { getArtist } from "@/services/artists";
import { albums } from "@/util/albums";
import { artists } from "@/util/artists";
import { Col, Row } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCreate } from "react-icons/md";

export default function ArtistPage() {
  const { id } = useParams()
  const currentArtist = artists?.filter((artist) => artist.id === Number(id))[0]
  const artistAlbums = albums?.filter((album) => album?.artist_id === currentArtist?.id)
  const [showEditArtistModal, setShowEditArtistModal] = useState(false)
  const [isAnAdminUser, setIsAnAdminUser] = useState(false)

  useEffect(() => {
    getArtistValues()
  }, [])
  
  useEffect(() => {
    if(localStorage?.getItem("isAnAdminUser")) {
      setIsAnAdminUser(true)
    }
  }, [])

  async function getArtistValues() {
    try {
      if (id) {
        const data = await getArtist(id[0])
        console.log(data, 'data!!!')
      }
    } catch(error) {
      console.log(error)
    }
  }


  return (
    <>
    {showEditArtistModal && (
      <CreateOrEditArtistModal setVisible={setShowEditArtistModal} artist={currentArtist}/>
    )}
    <div className="artist-page">
      <Row className="header">
        <Col>
          <Image src={currentArtist?.thumb} width={232} height={232} alt="album-photo" className="artist-photo"/>
        </Col>
        <Col span={20} className="artist-infos">
          <Row>
            <Col span={24}>
              <p className="classification">
                {currentArtist?.classification === "musician" ? "Músico" : "Banda"}
              </p>
            </Col>
            <Col span={24}>
              <p className="name">
                {currentArtist?.name}
                {isAnAdminUser && (
                  <MdCreate size={30} style={{marginLeft: 30}} className="action-artist-button" onClick={() => setShowEditArtistModal(true)}/>
                )}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="artist-content">
        <div className="infos">
          <Row gutter={[16,16]} style={{width: '100%'}}>
            <Col span={12}>
              <h1>{"Instrumentos tocados"}</h1>

              <Row style={{marginTop: 10}} gutter={[16,16]}>
                {currentArtist?.instruments?.map((instrument, index) => {
                  return (
                    <Col span={4} key={index}>
                      <div className="instrument-show">
                        {instrument?.icon}
                        <h2>
                          {instrument?.name}
                        </h2>
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </Col>
            <Col span={12}>
              <h1>{"Informações Gerais"}</h1>

              <Row className="info-row">
                <h2>
                  {`Estilo Musical: ${currentArtist?.generalInfo?.music_style}`}
                </h2>
              </Row>

              {isAnAdminUser && (
                <>
                  <Row className="info-row">
                    <h2>
                      {`Telefone: `}
                    </h2>
                    
                  </Row>

                  <Row className="info-row">
                    <h2>
                      {`Endereço: ${currentArtist?.generalInfo?.location} `}
                    </h2>
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </div>
        <div className="albums">
            <Row>
              <h1 style={{ color: "white" }}>ÁLBUNS</h1>
            </Row>
            <Row style={{ marginTop: 10 }} gutter={[16, 16]}>
              {artistAlbums?.map((album, index) => (
                <Col span={4} key={index}>
                  <AlbumCard album={album} />
                </Col>
              ))}
            </Row>
        </div>
      </Row>
    </div>
    </>
  );
}