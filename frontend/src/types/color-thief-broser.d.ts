declare module 'color-thief-browser' {
  export default class ColorThief {
    constructor();
    /** Retorna [r, g, b] */
    getColor(img: HTMLImageElement): [number, number, number];
  }
}