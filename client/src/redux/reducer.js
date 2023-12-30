import { FILTER_BY_ORIGIN, FILTER_BY_GENRE, ORDER_BY_NAME, ORDER_BY_RATING , LOAD_VIDEOGAMES, LOAD_GENRES, CREATE_VIDEOGAME, SEARCH_VIDEOGAME } from "./actions/types";

const initialState = {
  allVideogames: [],
  allGenres: [],
  videogamesOriginal: [],
  filteredVideogames: [],
  createVideogame: null,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case LOAD_VIDEOGAMES: {
      return {
        ...state,
        allVideogames: payload,
        videogamesOriginal: payload,
      };
    }
    
    case LOAD_GENRES: {
      return {
        ...state,
        allGenres: payload,
      };
    }

    case CREATE_VIDEOGAME: {
      return {
        ...state,
        createVideogame: payload,
      }
    }

    case SEARCH_VIDEOGAME: {
      return {
        ...state,
        allVideogames: payload,
      }
    }

    case ORDER_BY_NAME:
      const orderByName = [...state.allVideogames].sort((a, b) => {
        return payload === "A" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      });
      return {
        ...state,
        allVideogames: orderByName,
      };

    case ORDER_BY_RATING:
      const orderByRating = [...state.allVideogames].sort((a, b) => {
        return payload === "A" ? a.rating - b.rating : b.rating - a.rating;
      });
      return {
        ...state,
        allVideogames: orderByRating,
      };

      case FILTER_BY_GENRE: {      

         let filteredVideogames = [];

         if(payload===null) {
          filteredVideogames = [...state.videogamesOriginal];
         } else {
          filteredVideogames = [...state.videogamesOriginal].filter((videogame) => videogame.genres.includes(payload));
         }

        return {
          ...state,
          allVideogames: filteredVideogames,
        };
      }
      
default:
  return {
    ...state,
  };
}
};

export default rootReducer;
