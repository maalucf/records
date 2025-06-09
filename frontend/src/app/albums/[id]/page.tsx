/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { IAlbumMusic } from "@/types/sectionTypes";
import { Col, Popconfirm, Row, Table } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getAlbum, removeAlbum } from "@/services/artists";
import ColorThief from "color-thief-browser"
import CreateOrEditAlbumModal from "@/components/CreateOrEditAlbumModal ";
import { MdCreate, MdDelete } from "react-icons/md";
import { useMessageFunctions } from "@/components/Message";

export default function AlbumPage() {
  const routes = useRouter()
  const { id } = useParams()
  const [isAnAdminUser, setIsAnAdminUser] = useState(false)
  const [showEditAlbumModal, setShowEditAlbumModal] = useState(false)
  const [currentAlbum, setCurrentAlbum] = useState({} as any)
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
    if (refetchQuery) {
      getAlbumValues()
      setRefetchQuery(false)
    }

  }, [refetchQuery])

  useEffect(() => {
      if (!currentAlbum?.url_imagem || !imgRef.current) return
  
      const imgEl = imgRef.current
      imgEl.crossOrigin = "anonymous" 
      imgEl.src = currentAlbum.url_imagem
  
      imgEl.onload = () => {
        try {
          const colorThief = new ColorThief()
          const [r, g, b] = colorThief.getColor(imgEl)
          setBgColor(`rgb(${r}, ${g}, ${b})`)
        } catch (err) {
          console.error("ColorThief erro:", err)
        }
      }
    }, [currentAlbum?.url_imagem])

  async function getAlbumValues() {
      try {
        if (id) {
          const data = await getAlbum(id.toString())
          setCurrentAlbum(data)
        }
      } catch(error) {
        console.log(error)
      }
    }

  const columns = [
    {
      title: '#',
      key: 'index',
      width: 10,
      render: (text: IAlbumMusic, record: IAlbumMusic, index: number) => index + 1,
    },
    {
      title: 'Título',
      dataIndex: 'titulo',
      key: 'titulo',
      render: (text: string, record: any) => {
        return (
          <Row>
            <Col span={24}>
              <Row justify="start" style={{fontSize: 16, fontWeight: 600}}>
                {record?.titulo}
              </Row>
              <Row justify="start" style={{fontSize: 12, fontWeight: 400, opacity: 0.7}}>
                {record?.artistas[0]?.nome}
              </Row>
              {record?.artistas?.slice(1, record?.artistas?.length)?.length > 0 && (
                <Row justify="start" style={{fontSize: 12, fontWeight: 400, opacity: 0.7}}>
                  {`Feat: ${record?.artistas?.slice(1, record?.artistas?.length)?.map((a: {nome: string}) => a.nome)?.join(', ')}`}
                </Row>
              )}
            </Col>
          </Row>
        )
      } 
    },
    {
      title: 'Duração',
      dataIndex: 'duracao',
      width: 150,
      key: 'duracao',
      render: (text: number) => {
        return (
          `${(text/60000).toFixed(2)} minutos`
        )
      }
        
    }
  ];

  async function handleDeleteAlbum() {
      try {
        if (id) {
          await removeAlbum(id?.toString())
          messageSuccess("Álbum removido com sucesso")
  
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


  return currentAlbum?.cod_disco ? (
    <>
    {contextHolder}
    <img
        ref={imgRef}
        style={{ display: "none" }}
        alt="load for color extraction"
      />
    {showEditAlbumModal && (
          <CreateOrEditAlbumModal setVisible={setShowEditAlbumModal} album={currentAlbum} setRefetchQuery={setRefetchQuery}/>
        )}
    <div className="album-page">
      <Row className="header" style={{background: `linear-gradient(${bgColor}, rgb(24, 24, 24))`}}>
        <Col>
          <Image src={currentAlbum?.url_imagem} width={232} height={232} alt="album-photo" className="artist-photo"/>
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
                {currentAlbum?.titulo}
                {isAnAdminUser && (
                  <>
                    <MdCreate size={30} style={{marginLeft: 30}} className="action-artist-button" onClick={() => setShowEditAlbumModal(true)}/>
                    <Popconfirm
                      title={`Remover álbum`}
                      description={`Tem certeza que deseja remover esse álbum?`}
                      onConfirm={handleDeleteAlbum}
                      // onCancel={cancel}
                      okText="Excluir"
                      okButtonProps={{style: {backgroundColor: 'red'}}}
                      cancelText="Cancelar"
                    >
                      <MdDelete size={30} style={{marginLeft: 30}} className="action-artist-button" />
                    </Popconfirm>
                  </>
                )}
                <Col span={24} className="artist">
                  <span onClick={() => gotoArtistPage(currentAlbum?.id_artista)} style={{display: 'flex', alignItems: 'center'}}>
                    <Image src={currentAlbum?.url_imagem_artista} width={30} height={30} alt="album-photo" className="photo"/>
                    {currentAlbum?.nome_artista}
                  </span>
                </Col>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="music-infos">
        <Table
          dataSource={currentAlbum?.musicas}
          columns={columns}
          style={{width: '100%'}}
          pagination={false}
          rowKey="cod_musica"
        />
      </Row>
    </div>
    </>
  ) :(<></>);
}