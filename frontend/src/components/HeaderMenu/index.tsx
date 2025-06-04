'use client'

import { inter } from "@/util/fonts"
import { Layout, Menu, Row } from "antd"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Header } = Layout

export default function HeaderMenu() {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState("/")
  
  const items = [
    {key: '/', label: 'Início'},
    {key: '/artists', label: 'Artistas'},
    {key: '/albums', label: 'Álbuns'}
  ]

  function redirectToLocal(key: string) {
    setActiveKey(key)
    router.push(key)
  } 

  return (
    <Header className={`main-page-header ${activeKey ? 'activeKey' : ''}`}>
      <Row justify="space-between" className={`nav-wrapper ${inter.className}`}>
        <div className="demo-logo" onClick={() => redirectToLocal('/')}>
          <Image width={95} height={22} src="/DAMA.png" alt="record-logo" />
        </div>
        <div>
          <Menu
            theme="dark"
            mode="horizontal"
            className={`nav-menu ${inter.className}`}
            items={items}
            style={{ flex: 1, minWidth: 320 }}
            onClick={(option) => redirectToLocal(option?.key)}
          />
        </div>
      </Row>
    </Header>
  )
}