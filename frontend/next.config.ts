import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // libera qualquer host HTTPS em qualquer pathname
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',    // aceita todos os hosts
        port: '',          // padrão
        pathname: '/**',   // qualquer caminho
      },
    ],
  },
};

export default nextConfig;


