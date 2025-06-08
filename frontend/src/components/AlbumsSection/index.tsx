"use client";

import { Col, Row } from "antd";
import AlbumCard from "./AlbumCard";
import { useEffect, useRef, useState } from "react";
import CreateOrEditAlbumModal from "../CreateOrEditAlbumModal ";
import { MdOutlineAdd } from "react-icons/md";
import { getAlbums } from "@/services/artists";

export default function AlbunsSection() {
  const [visible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showNewAlbumModal, setShowNewAlbumModal] = useState(false)
  const [isAnAdminUser, setIsAnAdminUser] = useState(false)
  const [refetchQuery, setRefetchQuery] = useState(false)
  const [allAlbums, setAllAlbums] = useState([])

  useEffect(() => {
      setRefetchQuery(true)
      if(localStorage?.getItem("isAnAdminUser")) {
        setIsAnAdminUser(true)
      }
    }, [])
  
  
    useEffect(() => {
      if(refetchQuery) {
        getAllAlbums()
        setRefetchQuery(false)
      }
    }, [refetchQuery])
  
    async function getAllAlbums() {
      try {
        const data = await getAlbums()
        setAllAlbums(data)
        console.log(allAlbums, "allAlbums!!!")
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    if(localStorage?.getItem("isAnAdminUser")) {
      setIsAnAdminUser(true)
    }
  }, [])

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
    <>
    {showNewAlbumModal && (
            <CreateOrEditAlbumModal setVisible={setShowNewAlbumModal} setRefetchQuery={setRefetchQuery}/>
          )}
    <section className="albums-section" ref={sectionRef}>
      <div className={`albums-section-internal ${visible ? "visible" : ""}`}>
        <div className="albums-section-wrapper">
          <Row style={{display: 'flex', alignItems: 'center'}}>
            <h1 style={{ color: "white" }}>ÁLBUNS</h1>
            {isAnAdminUser && (
              <MdOutlineAdd size={30} style={{marginBottom: 5}} className="action-artist-button" onClick={() => setShowNewAlbumModal(true)}/>
            )}
          </Row>
          <Row style={{ marginTop: 10 }} gutter={[16, 16]}>
            {allAlbums?.slice(0,18)?.map((album, index) => (
              <Col span={4} key={index}>
                <AlbumCard album={album} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
    </>
  );
}
