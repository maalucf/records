"use client";

import { Col, Row } from "antd";
import AlbumCard from "./AlbumCard";
import { albums } from "@/util/albums";
import { useEffect, useRef, useState } from "react";

export default function AlbunsSection() {
  const [visible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="albums-section" ref={sectionRef}>
      <div className={`albums-section-internal ${visible ? "visible" : ""}`}>
        <div className="albums-section-wrapper">
          <Row>
            <h1 style={{ color: "white" }}>ÁLBUNS</h1>
          </Row>
          <Row style={{ marginTop: 10 }} gutter={[16, 16]}>
            {albums?.map((album, index) => (
              <Col span={4} key={index}>
                <AlbumCard album={album} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
}
