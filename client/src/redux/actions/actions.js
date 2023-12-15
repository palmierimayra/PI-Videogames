import { FILTER, ORDER, LOAD_VIDEOGAMES, LOAD_GENRES } from "./types";
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
