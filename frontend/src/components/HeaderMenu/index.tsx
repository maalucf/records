import { inter } from "@/util/fonts"
import { Layout, Menu, Row } from "antd"
import Image from "next/image"

const { Header } = Layout

export default function HeaderMenu() {
  const items = [
    {key: 'home', label: 'Home'},
    {key: 'artists', label: 'Artistas'},
    {key: 'albuns', label: 'Álbuns'}
  ]

  return (
    <Header className={`main-page-header`}>
      <Row justify="space-between" className={`nav-wrapper ${inter.className}`}>
        <div className="demo-logo">
          <Image width={95} height={22} src="/DAMA.png" alt="record-logo" />
        </div>
        <div>
          <Menu
            theme="dark"
            mode="horizontal"
            className={`nav-menu ${inter.className}`}
            items={items}
            style={{ flex: 1, minWidth: 320 }}
          />
        </div>
      </Row>
    </Header>
  )
}