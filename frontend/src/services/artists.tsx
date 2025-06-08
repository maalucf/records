/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { isAxiosError } from 'axios';

export const getArtists = async () => {
  try {
    const { data } = await axios.get(
      'http://localhost:5000/artistas',
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
};

export const getArtist = async (id_artista: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/artistas/${id_artista}`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
};

export const getArtistAlbums = async (id_artista: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/artistas/${id_artista}/discos`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
};


export const removeArtist = async (id_artista: string) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:5000/artistas/${id_artista}`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
};

export const getAlbums = async () => {
  try {
    const { data } = await axios.get(
      'http://localhost:5000/discos',
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
};

export const getAlbum = async (id_album: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/discos/${id_album}`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
};

export const removeAlbum = async (cod_disco: string) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:5000/discos/${cod_disco}`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
};

export const createMusician = async (dadosMusico: any) => {
  try {
    const { data } = await axios.post(
      'http://localhost:5000/musicos',
      dadosMusico,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
};

export const updateMusician = async (id_musico: string, dadosMusico: any) => {
  try {
    const { data } = await axios.put(
      `http://localhost:5000/musicos/${id_musico}`,
      dadosMusico,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
};

export const createBand = async (dadosBanda: any) => {
  try {
    const { data } = await axios.post(
      'http://localhost:5000/bandas',
      dadosBanda,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
};

export const updateBand = async (id_banda: string, dadosBanda: any) => {
  try {
    const { data } = await axios.put(
      `http://localhost:5000/bandas/${id_banda}`,
      dadosBanda,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
};

export const createDisco = async (dadosDisco: any) => {
  try {
    const { data } = await axios.post(
      'http://localhost:5000/discos',
      dadosDisco,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
};

export const updateDisco = async (cod_disco: string, dadosDisco: any) => {
  try {
    const { data } = await axios.put(
      `http://localhost:5000/discos/${cod_disco}`,
      dadosDisco,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
};



