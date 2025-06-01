'use client'

import AlbumsSection from "@/components/AlbumsSection";
import ArtistsSection from "@/components/ArtistsSection";
import HeaderMenu from "@/components/HeaderMenu";
import MainSection from "@/components/MainSection";
import { Layout } from "antd"

const { Content, Footer } = Layout;

export default function Home() {
 
  return (
    <Layout className="page-layout">
    <HeaderMenu /> 
      <Content style={{flex: 1 }}>
        <MainSection />
        <ArtistsSection />
        <AlbumsSection />
      </Content>
      
      <Footer style={{ textAlign: 'center', backgroundColor: 'black', color: 'white' }}>
        DAMA ©{new Date().getFullYear()} Created by Daniel & Maria
      </Footer>
    </Layout>
  );
}
