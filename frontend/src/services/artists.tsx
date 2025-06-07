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
