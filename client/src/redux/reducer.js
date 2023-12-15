import { FILTER, ORDER, LOAD_VIDEOGAMES, LOAD_GENRES } from "./actions/types";

const initialState = {
  allVideogames: [],
  allGenres: [],
  currentPage: 1,
  dogsPerPage: 8, 
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case LOAD_VIDEOGAMES: {
      return {
        ...state,
        allVideogames: payload,
      };
    }
    case LOAD_GENRES: {
      return {
        ...state,
        allGenres: payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
