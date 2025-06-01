import Image from "next/image";

export default function MainSection() {
  return (
    <section className={"main-section"} >
      <div className="main-section-wrapper">
        <Image height={638} width={638} className="ellipse-1" src="/ellipse_1.png" alt="ellipse" />
        <Image height={478} width={478} className="ellipse-2" src="/ellipse_2.png" alt="ellipse" />
        <h1 className="main-title">Conectando você aos maiores artistas do momento.</h1>
      </div>
    </section>
  )
}