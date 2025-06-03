import { Col, Row } from "antd";
import ArtistCard from "./ArtistCard";
import { useEffect, useRef, useState } from "react";
import { artists } from "@/util/artists";

export default function ArtistsSection() {
  const [visible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className={`artists-section ${visible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="artists-section-wrapper">
        <Row>
          <h1>ARTISTAS</h1>
        </Row>
        <Row style={{marginTop: 10}} gutter={[16,16]}>
          {artists?.map((artist, index) => {
            return (
              <Col span={4} key={index}>
                <ArtistCard name={artist?.name} thumb={artist?.thumb} musicGender={artist?.musicGender} albuns={artist?.albuns} />
              </Col>
            )
          })}
        </Row>
      </div>
    </section>
  )
}