'use client'

import { Col, Row } from "antd";
import ArtistCard from "./ArtistCard";
import { useEffect, useRef, useState } from "react";
import { artists } from "@/util/artists";
import CreateOrEditArtistModal from "../CreateOrEditArtistModal";
import { MdOutlineAdd } from "react-icons/md";

export default function ArtistsSection() {
  const [visible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showNewArtistModal, setShowNewArtistModal] = useState(false)
  const [isAnAdminUser, setIsAnAdminUser] = useState(false)

  useEffect(() => {
    if(localStorage?.getItem("isAnAdminUser")) {
      setIsAnAdminUser(true)
    }
  }, [])

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
    <>
    {showNewArtistModal && (
        <CreateOrEditArtistModal setVisible={setShowNewArtistModal}/>
      )}
    <section className={`artists-section ${visible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="artists-section-wrapper">
        <Row style={{display: 'flex', alignItems: 'center'}}>
          <h1>ARTISTAS</h1>
          {isAnAdminUser && (
            <MdOutlineAdd size={30} style={{marginBottom: 5}} className="action-artist-button" onClick={() => setShowNewArtistModal(true)}/>
          )}
        </Row>
        <Row style={{marginTop: 10}} gutter={[16,16]}>
          {artists?.map((artist, index) => {
            return (
              <Col span={4} key={index}>
                <ArtistCard artist={artist} />
              </Col>
            )
          })}
        </Row>
      </div>
    </section>
    </>
  )
}