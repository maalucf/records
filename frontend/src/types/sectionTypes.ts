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