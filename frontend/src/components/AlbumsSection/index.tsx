import { Col, Row } from "antd"
import AlbumCard from "./AlbumCard"

export default function AlbunsSection() {
  const albums = [
    {name: 'Sour', thumb: '/albums/sour.png', artist: 'Olivia Rodrigo', year: '2021', qty_music: '11', musics: [
      {
        name: 'brutal',
        singers: 'Olivia Rodrigo'
      },
      {
        name: 'traitor',
        singers: 'Olivia Rodrigo'
      },
      {
        name: 'drivers license',
        singers: 'Olivia Rodrigo'
      },
      {
        name: '1 step forward, 3 steps back',
        singers: 'Olivia Rodrigo'
      },
      {
        name: 'deja vu',
        singers: 'Olivia Rodrigo'
      },
      {
        name: 'good 4 u',
        singers: 'Olivia Rodrigo'
      },
      {
        name: 'enough for you',
        singers: 'Olivia Rodrigo'
      },
      {
        name: 'happier',
        singers: 'Olivia Rodrigo'
      },
      {
        name: 'jealousy, jealousy',
        singers: 'Olivia Rodrigo'
      },
      {
        name: 'favorite crime',
        singers: 'Olivia Rodrigo'
      },
      {
        name: 'hope ur ok',
        singers: 'Olivia Rodrigo'
      }
    ]},

    {name: 'Mr. Morale & The Big Steppers', thumb: '/albums/mr_morale.png', artist: 'Kendrick Lamar', year: '2022', qty_music: '19', musics: [
      {
        name: 'United In Grief',
        singers: 'Kendrick Lamar'
      },
      {
        name: 'N95',
        singers: 'Kendrick Lamar'
      },
      {
        name: 'Worldwide Steppers',
        singers: 'Kendrick Lamar'
      },
      {
        name: 'Die Hard',
        singers: 'Kendrick Lamar, Blxst, Amanda Reifer'
      },
      {
        name: 'Father Time (feat. Sampha)',
        singers: 'Kendrick Lamar, Sampha'
      },
      {
        name: 'Rich - Interlude',
        singers: 'Kendrick Lamar'
      },
      {
        name: 'Rich Spirit',
        singers: 'Kendrick Lamar'
      },
      {
        name: 'We Cry Together',
        singers: 'Kendrick Lamar, Taylour Paige'
      },
      {
        name: 'Purple Hearts',
        singers: 'Kendrick Lamar, Summer Walker, Ghostface Killah'
      }
    ]},

    {name: 'Birds In The Trap Sing McKnight', thumb: '/albums/birds_in_the_trap_sing_mcknight.png', artist: 'Travis Scott', year: '2016', qty_music: '14', musics: [
      {
        name: 'the ends',
        singers: 'Travis Scott'
      },
      {
        name: 'way back',
        singers: 'Travis Scott'
      },
      {
        name: 'coordinate',
        singers: 'Travis Scott'
      },
      {
        name: 'through the late night',
        singers: 'Travis Scott'
      },
      {
        name: 'beibs in the trap',
        singers: 'Travis Scott'
      },
      {
        name: 'sdp interlude',
        singers: 'Travis Scott'
      },
      {
        name: 'sweet sweet',
        singers: 'Travis Scott'
      },
      {
        name: 'outside',
        singers: 'Travis Scott'
      },
      {
        name: 'goosebumps',
        singers: 'Travis Scott'
      },
      {
        name: 'first take',
        singers: 'Travis Scott'
      },
      {
        name: 'pick up the phone',
        singers: 'Young Thug, Travis Scott'
      },
      {
        name: 'lose',
        singers: 'Travis Scott'
      },
      {
        name: 'guidance',
        singers: 'Travis Scott'
      },
      {
        name: 'wonderful',
        singers: 'Travis Scott'
      }
    ]},
    
  ]

  return (
    <section className={"albums-section"}>
      <div className="albums-section-wrapper">
        <Row>
          <h1 style={{color: 'white'}}>ÁLBUNS</h1>
        </Row>
        <Row style={{marginTop: 10}} gutter={[16,16]}>
          {albums?.map((album, index) => {
            return (
              <Col span={4} key={index}>
                <AlbumCard name={album?.name} thumb={album?.thumb} artist={album?.artist} year={album?.year} qty_music={album?.qty_music} musics={album?.musics}/>
              </Col>
            )
          })}
        </Row>
      </div>
    </section>
  )
}