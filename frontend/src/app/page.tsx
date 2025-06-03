'use client'

import AlbumsSection from "@/components/AlbumsSection";
import ArtistsSection from "@/components/ArtistsSection";
import MainSection from "@/components/MainSection";
import SoundWaves from "@/components/SoundWaves";

export default function Home() {
 
  return (
    <>
      <MainSection />
      <SoundWaves firstWave/>
      <ArtistsSection />
      <SoundWaves />
      <AlbumsSection />
    </>
  );
}
