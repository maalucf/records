import { JSX } from "react"

export interface IArtistCard {
  artist: {
    id: number
    name: string
    thumb: string
    musicGender: string
    albuns: string
  }
}


export interface IAlbumCard {
  album: IAlbum
}

export interface IAlbum {
  id: number
  name: string
  thumb: string
  artist: string
  year: string
  qty_music: string
  musics: IAlbumMusic[]
}
export interface IAlbumFrontCard {
  name: string
  thumb: string
  artist: string
  year: string
  qty_music: string
}

export interface IAlbumBackCard {
  musics: IAlbumMusic[]
}

export interface IAlbumMusic {
  name: string
  singers: string
}

export interface ISoundWave {
  firstWave?: boolean
}

export interface IArtist {
  id: number
  name: string
  thumb: string
  generalInfo: {artist_type: string, age: string, music_style: string, location: string}
  instruments: {name: string, icon: JSX.Element}[]
  musicGender: string
  musics: IAlbumMusic[]
  classification: string
}