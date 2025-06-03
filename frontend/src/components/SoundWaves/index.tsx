'use client'

import { ISoundWave } from "@/types/sectionTypes";
import { useEffect, useRef, useState } from "react";

export default function SoundWaves({firstWave = false}:ISoundWave) {
  const waveRef = useRef<HTMLDivElement>(null);
  const [strokeCount, setStrokeCount] = useState(0);
  const delayPattern = [0.0, 0.3, 0.6, 0.3, 0.6, 0.3, 0.0];

   useEffect(() => {
    const calcularQuantidade = () => {
      const larguraWave = waveRef.current?.offsetWidth || 0;
      const larguraStroke = 10 + 10;
      const count = Math.floor(larguraWave / larguraStroke);
      setStrokeCount(count);
    };

    calcularQuantidade();
    window.addEventListener('resize', calcularQuantidade);
    return () => window.removeEventListener('resize', calcularQuantidade);
  }, []);

  return (
    <div className="wave-sound" ref={waveRef} style={{marginTop: firstWave ? 0: -120}}>
      {Array.from({ length: strokeCount }).map((_, index) => {
        const etapa = index % delayPattern.length
        const rawDelay = delayPattern[etapa]
        return <span key={index} className="stroke" style={{ animationDelay: `${rawDelay}s` }}/>
      })}
    </div>
  )
}