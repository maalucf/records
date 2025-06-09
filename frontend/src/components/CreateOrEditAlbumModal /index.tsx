/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button, Col, Form, Input, Modal, Row, Select, Steps } from "antd";
import { useEffect, useState } from "react";
import { useMessageFunctions } from "../Message";
import { MdOutlineAdd, MdOutlineRemoveCircleOutline } from "react-icons/md";
import { createDisco, getArtists, updateDisco } from "@/services/artists";

const { Option } = Select

interface ICreateOrEditAlbumModall {
  setVisible: (value: boolean) => void
  setRefetchQuery?: (value: boolean) => void

  album?: any
}
export default function CreateOrEditAlbumModal({setVisible, album, setRefetchQuery}:ICreateOrEditAlbumModall) {
  const [albumForm] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0);
  const {messageError, messageSuccess, contextHolder} = useMessageFunctions()
  const [availableArtists, setAvailableArtists] = useState([] as any[])

  useEffect(() => {
    if(album?.cod_disco) {
      const initialMusicas = album.musicas.map((m: any) => {
        const totalSeconds = Math.floor(m.duracao / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const secStr = seconds.toString().padStart(2, "0");
    
        return {
          titulo: m.titulo,
          duracao: `${minutes}:${secStr}`,                    // aqui!
          artistas: m.artistas
            .filter((a: any) => a.id_artista !== album.id_artista)
            .map((a: any) => a.id_artista),
        };
      });

      albumForm.setFieldsValue({
        id_artista: album.id_artista,
        titulo:     album.titulo,
        data:       album.data,
        formato:    album.formato,
        produtor:   album.produtor.nome,
        url_imagem: album.url_imagem,
        musicas:    initialMusicas,  
      });
    }
  }, [])
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
          <Col span={12}>
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
              name="id_artista"
              label="Artista"
              rules={[
                {
                  validator: requiredValidator(
                    `Artista`
                  ),
                },
              ]}
            >
              <Select placeholder="Selecione o artista">
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
                      label={index === 0 ? "Duração (mm:ss)" : " "}
                      rules={[
                        { validator: requiredValidator(
                          `Duração (Música ${index + 1})`
                        ) },
                        {
                          pattern: /^\d+:[0-5]\d$/,
                          message: "Formato inválido — use minutos e segundos: “m:ss”",
                        },
                      ]}
                      validateTrigger="onBlur"
                      normalize={(value: string) => {
                        if (!value) return value;
                        const raw = value.replace(/\D/g, "");
                        const digits = raw.length > 4 ? raw.slice(0, 4) : raw;
                        if (digits.length <= 2) {
                          const sec = digits.padStart(2, "0");
                          return `0:${sec}`;
                        }
                        let min = digits.slice(0, digits.length - 2)
                          .replace(/^0+/, "")
                        if (!min) min = "0";
                        const sec = digits.slice(-2);
                        return `${min}:${sec}`;
                      }}
                    >
                      <Input
                        placeholder="Ex: 4:08"
                        style={{ width: "100%", backgroundColor: "transparent", borderColor: "#353535FF", color: "white" }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "artistas"]}
                      label={index === 0 ? "Feat." : " "}
                    >
                      <Select placeholder="Selecione feats" mode="multiple" allowClear>
                        
                        {availableArtists?.filter((a) => !a.banda && a.id_artista !== albumForm?.getFieldValue("id_artista"))?.map((artist) => {
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

  function parseDuration(durationStr: string): number {
    const [minStr, secStr] = durationStr.split(':')
    const minutes = parseInt(minStr, 10)
    const seconds = parseInt(secStr, 10)
    return (minutes * 60 + seconds) * 1000
  }
  
  

  async function handleCreateNewAlbum() {
    const validated = await albumForm.validateFields();

    if (validated) {
      const musicasComObjetos = validated.musicas.map((m: any) => ({
        ...m,
        duracao: parseDuration(m.duracao),
        artistas: Array.isArray(m.artistas)
          ? m.artistas.map((id: number) => ({ id_artista: id }))
          : [],  
      }));
      
      const payload = { ...validated, produtor: {nome: validated?.produtor}, musicas: musicasComObjetos };
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
    const validated = await albumForm.validateFields();

    if (validated) {
      const musicasComObjetos = validated.musicas.map((m: any) => ({
        ...m,
        duracao: parseDuration(m.duracao),
        artistas: Array.isArray(m.artistas)
          ? m.artistas.map((id: number) => ({ id_artista: id }))
          : [],    
      }));
      
      const payload = { ...validated, produtor: {nome: validated?.produtor}, musicas: musicasComObjetos };

      console.log(payload, 'payload')

      try {
        const data = await updateDisco(album?.cod_disco, payload)
        if (data) {
          messageSuccess("Álbum atualizado com sucesso")
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

  
  return (
    <>
    {contextHolder}
    <Modal
        title={album?.cod_disco ? `Editar Álbum` : `Adicionar Álbum`}
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
                onClick={album?.cod_disco ? handleEditAlbum : handleCreateNewAlbum}
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