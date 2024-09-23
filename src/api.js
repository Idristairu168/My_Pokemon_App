import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/';

export const getPokemonList = async (limit = 20, offset = 0) => {
    try {
        const response = await axios.get(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPokemonDetail = async (name) => {
    try {
        const response = await axios.get(`${BASE_URL}pokemon/${name}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
