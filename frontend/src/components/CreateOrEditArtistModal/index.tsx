/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button, Col, Form, Input, Modal, Row, Select, Steps } from "antd";
import { useEffect, useState } from "react";
import { useMessageFunctions } from "../Message";
import { IArtist } from "@/types/sectionTypes";
import { createBand, createMusician } from "@/services/artists";

const { Option } = Select

interface ICreateOrEditArtistModal {
  setVisible: (value: boolean) => void
  setRefetchQuery: (value: boolean) => void
  artist?: IArtist
}
export default function CreateOrEditArtistModal({setVisible, setRefetchQuery, artist}:ICreateOrEditArtistModal) {
  const [artistForm] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0);
  const {messageError, messageSuccess,  contextHolder} = useMessageFunctions()
  const [musicianOrBand, setMusicianOrBand] = useState(artist?.classification || '')

  useEffect(() => {
    if(artist?.id) {
      artistForm?.setFieldsValue({
        nome: artist?.name,
        generos_musicais: artist?.generalInfo?.music_style,
        endereco: artist?.generalInfo?.location,
        // telefone: artist?.generalInfo?.telefone,
        url_imagem: artist?.thumb,
        instrumentos: artist?.instruments?.map((a) => a?.name)?.join(', '),
        classificacao: artist?.classification
      })
    }
  }, [])


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

  function handleChangeClassification(value: string) {
    setMusicianOrBand(value)
  }


  const steps = [
    {
      title: "Informações básicas",
      content: (
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item
              name="nome"
              label="Nome"
              style={{ width: "100%" }}
              rules={[{required: true},  {validator: requiredValidator("Nome") }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="generos_musicais"
              label="Gêneros Musicais"
              rules={[{required: true},  {validator: requiredValidator("Gêneros Musicais") }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="telefone"
              label="Telefone"
              rules={[{required: true},  {validator: requiredValidator("Telefone") }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="endereco"
              label="Endereço"
              rules={[{required: true},  {validator: requiredValidator("Endereço") }]}
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
      title: "Classificação",
      content: (
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item
              name="classificacao"
              label="Classificação"
              rules={[{required: true},  {validator: requiredValidator("Classificação") }]}
            >
              <Select placeholder="Selecione a classificação" onChange={handleChangeClassification}>
                <Option key="1" value="musician">
                  Músico
                </Option>
                <Option key="2" value="band">
                  Banda
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      title: musicianOrBand === 'band' ? "Integrantes" : "Instrumentos tocados",
      content: musicianOrBand === 'band' ? (
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item
              name="musicos"
              label="Músicos"
              rules={[{required: true},  {validator: requiredValidator("Integrantes") }]}
            >
              <Select placeholder="Selecione os integrantes" mode="multiple">
                <Option value="1">Artista 1</Option>
                <Option value="2">Artista 2</Option>
                <Option value="3">Artista 3</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      ) : (
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item
              name="instrumentos"
              label="Instrumentos"
              rules={[{required: true},  {validator: requiredValidator("Instrumentos") }]}
            >
              <Input placeholder="Informe os instrumentos separados por vírgula" />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
  ];

  async function handleCreateNewArtist() {
    try {
      const validated = await artistForm.validateFields();

      if (validated) {
        if (validated?.classificacao === 'band') {
          const formattedMusicians = validated?.musicos?.map((nro_musico: string) => {
            return {nro_registro: nro_musico}
          })
          const data = await createBand({
            nome: validated?.nome,
            url_imagem: validated?.url_imagem,
            generos_musicais: validated?.generos_musicais,
            musicos: formattedMusicians
          })

          if (data) {
            messageSuccess("Banda criada com sucesso")
            
          }
        } else {
          const formattedInstruments = validated?.instrumentos?.split(",")?.map((instrumento: any) => {
            return {nome: instrumento}
          })
          const data = await createMusician({
            nome: validated?.nome,
            localizacao: {
              telefone: validated?.telefone,
              endereco: validated?.endereco
            },
            url_imagem: validated?.url_imagem,
            generos_musicais: validated?.generos_musicais,
            instrumentos: formattedInstruments
          })

          if (data) {
            messageSuccess("Músico criado com sucesso")
          }
        }

        setRefetchQuery(true)
        
        setTimeout(() => {
          artistForm?.resetFields()
          setVisible(false)
        }, 1000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function handleEditNewArtist() {
    try {
      const allValues = await artistForm.validateFields();
      console.log("Todos os valores válidos:", allValues);
    } catch (err) {
      console.log(err)
    }
  }

  
  return (
    <>
    {contextHolder}
    <Modal
        title={artist?.id ? `Editar Artista` : `Adicionar Artista`}
        open
        onCancel={() => setVisible(false)}
        footer={null} 
        width={800}
        className="create-or-edit-artist-modal"
      >
        <Steps current={currentStep} items={steps.map((it) => ({ key: it.title, title: it.title }))} />

        <Form layout="vertical" form={artistForm} style={{ marginTop: 20 }}>
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
                onClick={artist?.id ? handleEditNewArtist : handleCreateNewArtist}
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