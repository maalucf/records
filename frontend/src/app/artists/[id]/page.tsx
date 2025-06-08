/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import AlbumCard from "@/components/AlbumsSection/AlbumCard";
// import AlbumCard from "@/components/AlbumsSection/AlbumCard";
import CreateOrEditArtistModal from "@/components/CreateOrEditArtistModal";
import { getArtist, getArtistAlbums, removeArtist } from "@/services/artists";
import {  mapInstrumentIcons } from "@/util/icons";
// import { albums } from "@/util/albums";
// import { artists } from "@/util/artists";
import { Col, Popconfirm, Row } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdCreate, MdDelete } from "react-icons/md";
import ColorThief from "color-thief-browser"
import { useMessageFunctions } from "@/components/Message";

export default function ArtistPage() {
  const routes = useRouter()
  const { id } = useParams()
  const [showEditArtistModal, setShowEditArtistModal] = useState(false)
  const [isAnAdminUser, setIsAnAdminUser] = useState(false)
  const [currentArtist, setCurrentArtist] = useState({} as any)
  const [artistAlbums, setArtistAlbums] = useState([] as any[])
  const [bgColor, setBgColor] = useState<string>('rgb(24, 24, 24)')
  const imgRef = useRef<HTMLImageElement>(null)
  const { messageSuccess, contextHolder} = useMessageFunctions()
  const [refetchQuery, setRefetchQuery] = useState(false)

  useEffect(() => {
    setRefetchQuery(true)
    if(localStorage?.getItem("isAnAdminUser")) {
      setIsAnAdminUser(true)
    }
  }, [])

  useEffect(() => {
    if(refetchQuery) {
      getArtistValues()
      getArtistAllAlbums()

      setRefetchQuery(false)
    }
  },[refetchQuery])

  useEffect(() => {
    if (!currentArtist?.url_imagem || !imgRef.current) return

    const imgEl = imgRef.current
    imgEl.crossOrigin = "anonymous"
    imgEl.src = currentArtist.url_imagem

    imgEl.onload = () => {
      try {
        const colorThief = new ColorThief()
        const [r, g, b] = colorThief.getColor(imgEl)
        setBgColor(`rgb(${r}, ${g}, ${b})`)
      } catch (err) {
        console.error("ColorThief erro:", err)
      }
    }
  }, [currentArtist?.url_imagem])
 
  async function getArtistValues() {
    try {
      if (id) {
        const data = await getArtist(id?.toString())
        setCurrentArtist(data)
      }
    } catch(error) {
      console.log(error)
    }
  }
  
  async function getArtistAllAlbums() {
    try {
      if (id) {
        const data = await getArtistAlbums(id?.toString())
        setArtistAlbums(data?.discos)
      }
    } catch(error) {
      console.log(error)
    }
  }

  async function handleDeleteArtist() {
    try {
      if (id) {
        await removeArtist(id?.toString())
        messageSuccess(currentArtist?.banda?.cod_banda ? "Banda removida com sucesso" : "Músico removido com sucesso")

        setTimeout(() => {
          routes.push('/')
        }, 1000)

      }

    } catch(error) {
      console.log(error)
    }
  }

  function gotoArtistPage(id_artista: string) {
      // currentAlbum?.artist_id
      routes.push(`/artists/${id_artista}`)
    }
  

  return currentArtist?.id_artista ? (
    <>
    {contextHolder}
    <img
        ref={imgRef}
        style={{ display: "none" }}
        alt="load for color extraction"
      />
    {showEditArtistModal && (
      <CreateOrEditArtistModal setVisible={setShowEditArtistModal} artist={currentArtist} setRefetchQuery={setRefetchQuery}/>
    )}
    <div className="artist-page">
      <Row className="header" style={{background: `linear-gradient(${bgColor}, rgb(24, 24, 24))`}}>
        <Col>
          <Image src={currentArtist?.url_imagem} width={232} height={232} alt="album-photo" className="artist-photo"/>
        </Col>
        <Col span={20} className="artist-infos">
          <Row>
            <Col span={24}>
              <p className="classification">
                {currentArtist?.banda?.cod_banda ? "Banda" : "Músico"}
              </p>
            </Col>
            <Col span={24}>
              <p className="name">
                {currentArtist?.nome}
                {isAnAdminUser && (
                  <>
                    <MdCreate size={30} style={{marginLeft: 30}} className="action-artist-button" onClick={() => setShowEditArtistModal(true)}/>
                    <Popconfirm
                      title={`Remover ${currentArtist?.banda?.cod_banda ? 'banda' : 'músico'}`}
                      description={`Tem certeza que deseja remover ${currentArtist?.banda?.cod_banda ? 'essa banda' : 'esse músico'}?`}
                      onConfirm={handleDeleteArtist}
                      // onCancel={cancel}
                      okText="Excluir"
                      okButtonProps={{style: {backgroundColor: 'red'}}}
                      cancelText="Cancelar"
                    >
                      <MdDelete size={30} style={{marginLeft: 30}} className="action-artist-button" />
                    </Popconfirm>
                  </>
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
              {!currentArtist?.banda?.cod_banda ? (
                <>
                  <h1>{"Instrumentos tocados"}</h1>
                  <Row style={{marginTop: 10}} gutter={[16,16]}>
                    {currentArtist?.musico?.instrumentos?.length > 0 ? (
                      <>
                        {currentArtist?.musico?.instrumentos?.map((instrument: any, index: number) => {
                          return (
                            <Col span={4} key={index}>
                              <div className="instrument-show">
                                {mapInstrumentIcons[instrument?.nome?.trim()?.toLowerCase()]}
                                <h2>
                                  {instrument?.nome}
                                </h2>
                              </div>
                            </Col>
                          )
                        })}
                      </>
                    ) : (
                      <Col span={4} key={'vocalista'}>
                        <div className="instrument-show">
                          {mapInstrumentIcons['vocalista']}
                          <h2>
                            {"Vocalista"}
                          </h2>
                        </div>
                      </Col>
                    )}
                    
                  </Row> 
                </>
              ) : (
                <>
                  <h1>{"Integrantes"}</h1>
                  <Row style={{marginTop: 20}} gutter={[16,16]}>
                    {currentArtist?.banda?.musicos?.map((musico: any) => {
                      return (
                        <Col span={4} key={musico?.id_artista} className="musicians">
                          <span onClick={() => gotoArtistPage(musico?.id_artista)} style={{display: 'flex', alignItems: 'center', justifyContent: 'center' ,flexDirection: 'column'}}>
                            <Image src={musico?.url_imagem} width={50} height={50} alt="album-photo" className="musician-photo"/>
                            {musico?.nome}
                          </span>
                        </Col>
                      )
                    })}
                    
                  </Row> 
                </>
              )}
            </Col>
            <Col span={12}>
              <h1>{"Informações Gerais"}</h1>

              <Row className="info-row">
                <h2>
                  {`Estilo Musical: ${currentArtist?.generos_musicais}`}
                </h2>
              </Row>

              {isAnAdminUser && !currentArtist?.banda?.cod_banda && (
                <>
                  <Row className="info-row">
                    <h2>
                      {`Telefone:  ${currentArtist?.musico?.localizacao?.telefone} `}
                    </h2>
                    
                  </Row>

                  <Row className="info-row">
                    <h2>
                      {`Endereço: ${currentArtist?.musico?.localizacao?.endereco} `}
                    </h2>
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </div>
        <div className="albums">
            {currentArtist?.musico?.bandas?.length > 0 ? (
              <>
                <Row>
                  <h1 style={{ color: "white" }}>BANDAS</h1>
                </Row>
                <Row style={{ marginTop: 10 }} gutter={[16, 16]}>
                  {currentArtist?.musico?.bandas?.map((banda: any, index: number) => (
                    <Col span={24} key={index}>
                      <h2 className="band-name" onClick={() => gotoArtistPage(banda?.id_artista)}>
                        {banda?.nome}
                      </h2>
                    </Col>
                  ))}
                </Row>
              </>
            ) : (
              <>
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
              </>
            )}
        </div>
      </Row>
    </div>
    </>
  ) : (
    <></>
  );
}