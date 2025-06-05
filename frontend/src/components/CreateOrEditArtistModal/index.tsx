'use client'

import { Button, Col, Form, Input, Modal, Row, Select, Steps } from "antd";
import { useEffect, useState } from "react";
import { useMessageFunctions } from "../Message";
import { IArtist } from "@/types/sectionTypes";

const { Option } = Select

interface ICreateOrEditArtistModal {
  setVisible: (value: boolean) => void
  artist?: IArtist
}
export default function CreateOrEditArtistModal({setVisible, artist}:ICreateOrEditArtistModal) {
  const [artistForm] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0);
  const {messageError, contextHolder} = useMessageFunctions()

  useEffect(() => {
    if(artist?.id) {
      artistForm?.setFieldsValue({
        name: artist?.name,
        age: artist?.generalInfo?.age,
        music_style: artist?.generalInfo?.music_style,
        location: artist?.generalInfo?.location,
        image_url: artist?.thumb,
        instruments: artist?.instruments?.map((a) => a?.name)?.join(', '),
        classification: artist?.classification
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              name="name"
              label="Nome"
              style={{ width: "100%" }}
              rules={[{required: true},  {validator: requiredValidator("Nome") }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="music_style"
              label="Estilo Musical"
              rules={[{required: true},  {validator: requiredValidator("Estilo Musical") }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="phone"
              label="Telefone"
              rules={[{required: true},  {validator: requiredValidator("Telefone") }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="location"
              label="Endereço"
              rules={[{required: true},  {validator: requiredValidator("Endereço") }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="image_url"
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
              name="classification"
              label="Classificação"
              rules={[{required: true},  {validator: requiredValidator("Classificação") }]}
            >
              <Select placeholder="Selecione a classificação">
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
      title: "Instrumentos tocados",
      content: (
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item
              name="instruments"
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
      const allValues = await artistForm.validateFields();
      console.log("Todos os valores válidos:", allValues);
    } catch (err) {
      console.log(err)
    }
  }

  async function handleEditNewArtist() {
    
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