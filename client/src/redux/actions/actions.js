import { VIDEOGAME_BY_ID, FILTER_BY_ORIGIN, FILTER_BY_GENRE, ORDER_BY_NAME, ORDER_BY_RATING, LOAD_VIDEOGAMES, LOAD_GENRES, CREATE_VIDEOGAME, SEARCH_VIDEOGAME } from "./types";
import axios from 'axios';

export const loadVideogames = () => {
  return async (dispatch) => {
      const response = await axios.get('http://localhost:3001/videogames');
      dispatch({
        type: LOAD_VIDEOGAMES,
        payload: response.data,
      });
  };
};

export const loadGenres = () => {
  return async (dispatch) => {
      const response = await axios.get('http://localhost:3001/genres');
      dispatch({
        type: LOAD_GENRES,
        payload: response.data,
      });
  };
};

export const videogameById = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/videogames/${id}`);
    dispatch({
      type: VIDEOGAME_BY_ID,
      payload: response.data,
    });
};
}

export const orderByName = (order) => {
  return {
    type: ORDER_BY_NAME,
    payload: order,
  };
};

export const orderByRating = (order) => {
  return {
    type: ORDER_BY_RATING,
    payload: order,
  };
};

export const filterByGenre = (genre) => {
  return {
    type: FILTER_BY_GENRE,
    payload: genre,
  };
};

export const filterByOrigin = (source) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: source,
  };
};

export const createVideogame = (videogame) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/videogames', videogame);
      return dispatch({
        type: CREATE_VIDEOGAME,
        payload: response,
      });
    } catch (error) {
      console.error("Error creating videogame:", error);
    }
  };
}

export const searchVideogame = (name) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/videogames/name?name="${name}"`);
    return dispatch({
      type: SEARCH_VIDEOGAME,
      payload: response.data,
    })
  }
}