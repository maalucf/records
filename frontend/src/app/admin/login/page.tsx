'use client'

import { useMessageFunctions } from "@/components/Message"
import { Button, Col, Form, Input, Row } from "antd"
import { useRouter } from "next/navigation"
import { MdLockPerson } from "react-icons/md"

export default function AdminLoginPage() {
  const [adminForm] = Form.useForm()
  const validCredentials = {user: "admin", password: "admin"}
  const { messageError, messageSuccess, contextHolder } = useMessageFunctions()
  const routes = useRouter()

  async function handleAdminLogin() {
    const validated = await adminForm?.validateFields()

    if (validated) {
      if (validated?.user === validCredentials?.user && validated?.password === validCredentials?.password) {
        localStorage.setItem("isAnAdminUser", "true")
        messageSuccess("Usuário autenticado com sucesso")
        setTimeout(() => {
          routes.push('/')
        }, 500)
      } else {
        messageError('Login inválido, verifique as informações e tente novamente')
      }
    }
  }

  const handleTextAreaKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdminLogin()
    }
  };

  return (
    <div className="admin-login-wrapper">
      {contextHolder}
      <Row className="content">
        <Col span={24} >
          <MdLockPerson size={40}/>
          <h2 className="login">{'Autenticação de Administrador'}</h2>
        </Col>
        <Col span={24} className="admin-login-form">
          <Form layout="vertical" form={adminForm}>
            <Form.Item label={"Usuário"} name="user" rules={[{required: true, message: 'Por favor, informe o e-mail'}]} >
              <Input onKeyDown={handleTextAreaKeyDown}/>
            </Form.Item>
            <Form.Item label={"Senha"} name="password" rules={[{required: true,  message: 'Por favor, informe a senha'}]}>
              <Input type="password"  onKeyDown={handleTextAreaKeyDown}/>
            </Form.Item>
            <Button onClick={handleAdminLogin} className="send-button">
              {'Enviar'}
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
} 