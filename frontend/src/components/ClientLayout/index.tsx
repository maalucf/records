// components/ClientLayout.tsx
"use client"; // ← este arquivo roda no browser

import { Layout } from "antd";
import HeaderMenu from "@/components/HeaderMenu";

const { Content, Footer } = Layout;

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="page-layout">
      <HeaderMenu />

      <Content style={{ flex: 1 }}>
        {children}
      </Content>

      <Footer style={{ textAlign: "center", backgroundColor: "black", color: "white", alignItems: 'end'}}>
        DAMA ©{new Date().getFullYear()} Created by Daniel & Maria
      </Footer>
    </Layout>
  );
}
