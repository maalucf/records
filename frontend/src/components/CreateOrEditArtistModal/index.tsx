/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button, Col, Form, Input, Modal, Radio, Row, Select, Steps } from "antd";
import { useEffect, useState } from "react";
import { useMessageFunctions } from "../Message";
import { createBand, createMusician, updateBand, updateMusician } from "@/services/artists";
import { CheckboxGroupProps } from "antd/es/checkbox";

const { Option } = Select

interface ICreateOrEditArtistModal {
  setVisible: (value: boolean) => void
  setRefetchQuery?: (value: boolean) => void
  artist?: any
}
export default function CreateOrEditArtistModal({setVisible, setRefetchQuery, artist}:ICreateOrEditArtistModal) {
  const [artistForm] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0);
  const {messageError, messageSuccess,  contextHolder} = useMessageFunctions()
  const [musicianOrBand, setMusicianOrBand] = useState(artist?.classificacao || 'musician')

  useEffect(() => {
    if(artist?.id_artista) {
      if (artist?.musico?.id_artista) {
        artistForm?.setFieldsValue({
          nome: artist?.nome,
          generos_musicais: artist?.generos_musicais,
          endereco: artist?.musico?.localizacao?.endereco,
          telefone: artist?.musico?.localizacao?.telefone,
          url_imagem: artist?.url_imagem,
          instrumentos: artist?.musico?.instrumentos?.map((a: {cod_instrumento:number, nome: string}) => a?.nome)?.join(', '),
          classificacao: 'musician'
        })
      } else {
        artistForm?.setFieldsValue({
          nome: artist?.nome,
          generos_musicais: artist?.generos_musicais,
          endereco: artist?.musico?.localizacao?.endereco,
          telefone: artist?.musico?.localizacao?.telefone,
          url_imagem: artist?.url_imagem,
          classificacao: 'band'
        })
      }
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

  const options: CheckboxGroupProps<string>['options'] = [
    { label: 'Músico', value: 'musician' },
    { label: 'Banda', value: 'band' },
  ]


  const steps = [
    {
      title: "Informações básicas",
      content: (
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <Form.Item
              name="classificacao"
              label="Classificação"
              style={{ width: "100%" }}
              rules={[{required: true},  {validator: requiredValidator("Classificação") }]}
            >
              <Radio.Group
                block
                options={options}
                defaultValue="musician"
                optionType="button"
                buttonStyle="solid"
                onChange={(e) => setMusicianOrBand(e.target.value)}
              />
            </Form.Item>
          </Col>
          
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

        {musicianOrBand === 'musician' && (
          <>
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
          </>
        )}

          <Col span={musicianOrBand === 'musician' ? 24 : 12}>
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

      console.log(validated, 'validated???')

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

        if (setRefetchQuery) {
          setRefetchQuery(true)
        }
        
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
      const validated = await artistForm.validateFields();
      if (validated) {
        if (validated?.classificacao === 'band') {
          const formattedMusicians = validated?.musicos?.map((nro_musico: string) => {
            return {nro_registro: nro_musico}
          })
          const data = await updateBand(artist?.id_artista, {
            nome: validated?.nome,
            url_imagem: validated?.url_imagem,
            generos_musicais: validated?.generos_musicais,
            musicos: formattedMusicians
          })

          if (data) {
            messageSuccess("Banda atualizada com sucesso")
            
          }
        } else {
          const formattedInstruments = validated?.instrumentos?.split(",")?.map((instrumento: any) => {
            return {nome: instrumento}
          })
          const data = await updateMusician(artist?.id_artista, {
            nome: validated?.nome,
            localizacao: {
              telefone: validated?.telefone,
              endereco: validated?.endereco
            },
            url_imagem: validated?.url_imagem,
            generos_musicais: validated?.generos_musicais,
            instrumentos: formattedInstruments
          })

          console.log(data, 'data???')

          if (data) {
            messageSuccess("Músico atualizado com sucesso")
          }
        }

        if (setRefetchQuery) {
          setRefetchQuery(true)
        }
        
        setTimeout(() => {
          artistForm?.resetFields()
          setVisible(false)
        }, 1000)
      }
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
        maskClosable={false}
      >
        <Steps current={currentStep} items={steps.map((it) => ({ key: it.title, title: it.title }))} />

        <Form layout="vertical" form={artistForm} style={{ marginTop: 20 }}>
          <div style={{ display: currentStep === 0 ? "block" : "none" }}>
            {steps[0].content}
          </div>
          <div style={{ display: currentStep === 1 ? "block" : "none" }}>
            {steps[1].content}
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
                onClick={artist?.id_artista ? handleEditNewArtist : handleCreateNewArtist}
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