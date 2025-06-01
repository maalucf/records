export interface IArtistCard {
  artistName: string
}


export interface IAlbumCard {
  name: string
  thumb: string
  artist: string,
  year: string,
  qty_music: string
  musics: {name: string}[]
}

export interface IAlbumFrontCard {
  name: string
  thumb: string
  artist: string,
  year: string,
  qty_music: string
}

export interface IAlbumBackCard {
  musics: {name: string}[]
}

