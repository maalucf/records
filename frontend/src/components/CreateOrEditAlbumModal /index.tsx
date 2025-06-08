/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Steps } from "antd";
import { useEffect, useState } from "react";
import { useMessageFunctions } from "../Message";
import { IArtist } from "@/types/sectionTypes";
import { MdOutlineAdd, MdOutlineRemoveCircleOutline } from "react-icons/md";
import { createDisco, getArtists } from "@/services/artists";

const { Option } = Select

interface ICreateOrEditAlbumModall {
  setVisible: (value: boolean) => void
  setRefetchQuery?: (value: boolean) => void

  album?: IArtist
}
export default function CreateOrEditAlbumModal({setVisible, album, setRefetchQuery}:ICreateOrEditAlbumModall) {
  const [albumForm] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0);
  const {messageError, messageSuccess, contextHolder} = useMessageFunctions()
  const [availableArtists, setAvailableArtists] = useState([] as any[])
  console.log(album)

  useEffect(() => {
    getAvailableArtists()
  }, [])

  async function getAvailableArtists() {
    try {
      const data = await getArtists()
      setAvailableArtists(data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(availableArtists, 'availableArtists!!!')

  // useEffect(() => {
  //   if(artist?.id) {
  //     albumForm?.setFieldsValue({
  //       name: artist?.name,
  //       age: artist?.generalInfo?.age,
  //       music_style: artist?.generalInfo?.music_style,
  //       location: artist?.generalInfo?.location,
  //       image_url: artist?.thumb,
  //       instruments: artist?.instruments?.map((a) => a?.name)?.join(', '),
  //       classification: artist?.classification
  //     })
  //   }
  // }, [])

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const requiredValidator = (fieldLabel: string) => {
     
    return async (_: any, value: any) => {
      if (value === undefined || value === null || String(value).trim() === "") {
        messageError(`Preencha o campo ${fieldLabel}`);
        return Promise.reject(new Error(""));
      }
      return Promise.resolve();
    };
  };


  const steps = [
    {
      title: "Informações básicas",
      content: (
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item
              name="titulo"
              label="Titulo"
              style={{ width: "100%" }}
              rules={[{required: true},  {validator: requiredValidator("Nome") }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="data"
              label="Data de lançamento"
              rules={[{required: true},  {validator: requiredValidator("Data de lançamento") }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="formato"
              label="Formato"
              rules={[{required: true},  {validator: requiredValidator("Formato") }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="url_imagem"
              label="URL de imagem"
              rules={[{required: true},  {validator: requiredValidator("URL de imagem") }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      title: "Produtor",
      content: (
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item
              name="produtor"
              label="Produtor"
              rules={[{required: true},  {validator: requiredValidator("Produtor") }]}
            >
              <Input placeholder="Informe o nome do produtor" />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      title: "Músicas",
      content: (
        <Form.List name="musicas">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Row
                  key={key}
                  gutter={[8, 8]}
                  style={{
                    marginBottom: 8,
                    paddingBottom: 8,
                    borderBottom: "1px solid rgba(255,255,255,0.15)",
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "titulo"]}
                      label={index === 0 ? "Título" : " "}
                      rules={[
                        {
                          validator: requiredValidator(
                            `Título (Música ${index + 1})`
                          ),
                        },
                      ]}
                    >
                      <Input placeholder="Título da música" />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item
                      {...restField}
                      name={[name, "duracao"]}
                      label={index === 0 ? "Duração (minutos)" : " "}
                      rules={[
                        {
                          validator: requiredValidator(
                            `Duração (Música ${index + 1})`
                          ),
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        style={{
                          width: "100%",
                          backgroundColor: "transparent",
                          borderColor: "#353535FF",
                          color: "white",
                        }}
                        placeholder="Ex: 3"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "artistas"]}
                      label={index === 0 ? "Artistas" : " "}
                      rules={[
                        {
                          validator: requiredValidator(
                            `Artistas (Música ${index + 1})`
                          ),
                        },
                      ]}
                    >
                      <Select placeholder="Selecione artistas" mode="multiple">
                        {availableArtists?.map((artist) => {
                          return (
                            <Option key={artist?.id_artista} value={artist?.id_artista}>
                              {artist?.nome}
                            </Option>
                          )
                        })}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={2} style={{ textAlign: "center", display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                    <MdOutlineRemoveCircleOutline onClick={() => remove(name)} style={{ fontSize: 20, color: "#ff4d4f", cursor: 'pointer' }}/>
                  </Col>
                </Row>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<MdOutlineAdd />}
                  style={{
                    color: "#c08fff",
                    borderColor: "#c08fff",
                    backgroundColor: 'transparent',
                    marginTop: 8,
                  }}
                >
                  Adicionar Música
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      ),
    }
  ];

  // {
  //   "titulo": "Coletânea Sem Criação de Artista",
  //   "formato": "CD",
  //   "data": "2025-06-14",
  //   "id_artista": 2,
  //   "produtor": { "nome": "Judith"},
  //   "url_imagem": "http://exemplo.com/capa.png",
  //   "musicas": [
  //     { "cod_musica": 2 },
  //     {
  //       "titulo": "Musica",
  //       "duracao": 210,
  //       "artistas": [
  //         { "id_artista": 5 }
  //       ]
  //     }
  //   ]
  // }
  

  

  async function handleCreateNewAlbum() {
    const validated = await albumForm.validateFields();
    if (validated) {
      const musicasComObjetos = validated.musicas.map((m: any) => ({
        ...m,
        duracao: m.duracao*60000,
        artistas: m.artistas.map((id: number) => ({ id_artista: id })),
      }));
      
      const payload = { ...validated, produtor: {name: validated?.produtor}, musicas: musicasComObjetos };
      try {
        const data = await createDisco(payload)
        if (data) {
          messageSuccess("Álbum criado com sucesso")
        }

        if (setRefetchQuery) {
          setRefetchQuery(true)
        }
        
        setTimeout(() => {
          albumForm?.resetFields()
          setVisible(false)
        }, 1000)
      } catch (err) {
        console.log(err)
      }
    }
  }

  async function handleEditAlbum() {
    try {
      console.log(albumForm?.getFieldsValue())
      const allValues = await albumForm.validateFields();
      console.log("Todos os valores válidos:", allValues);
    } catch (err) {
      console.log(err)
    }
  }

  
  return (
    <>
    {contextHolder}
    <Modal
        title={album?.id ? `Editar Álbum` : `Adicionar Álbum`}
        open
        onCancel={() => setVisible(false)}
        footer={null} 
        width={800}
        className="create-or-edit-artist-modal"
      >
        <Steps current={currentStep} items={steps.map((it) => ({ key: it.title, title: it.title }))} />

        <Form layout="vertical" form={albumForm} style={{ marginTop: 20 }}>
          <div style={{ display: currentStep === 0 ? "block" : "none" }}>
            {steps[0].content}
          </div>
          <div style={{ display: currentStep === 1 ? "block" : "none" }}>
            {steps[1].content}
          </div>
          <div style={{ display: currentStep === 2 ? "block" : "none" }}>
            {steps[2].content}
          </div>

          <div style={{ marginTop: 10, textAlign: "right" }}>
            {currentStep > 0 && (
              <Button
                style={{ marginRight: 8, backgroundColor: "transparent", color: "white" }}
                onClick={prev}
                className="back-button"
              >
                Voltar
              </Button>
            )}

            {currentStep < steps.length - 1 && (
              <Button type="primary" style={{ backgroundColor: "#c08fff" }} onClick={next}>
                Próximo
              </Button>
            )}

            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                style={{ backgroundColor: "#c08fff" }}
                onClick={album?.id ? handleEditAlbum : handleCreateNewAlbum}
              >
                Concluir
              </Button>
            )}
          </div>
        </Form>
      </Modal>
    </>
  )
}