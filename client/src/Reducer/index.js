import { MANGAS_TO_DB, GET_ALL_MANGAS,GET_GENRES, GET_DETAIL, POST_MANGA, FILTRO_GENERO, FILTRO_AUTOR ,ORDER, SEARCH_MANGA } from '../Actions'

const initialState = {
    allMangas: [],
    currentMangas: [],
    mangaDetail: {},
    genres: []
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case MANGAS_TO_DB:
            return {
                ...state
            }
        case GET_ALL_MANGAS:
            return {
                ...state,
                allMangas: payload
            }
        case GET_GENRES: 
            return {
                ...state,
                genres: payload
            }
        case GET_DETAIL:
            return {
                ...state,
                mangaDetail: payload
            }
        case POST_MANGA:
            return {
                ...state
            }
        case FILTRO_GENERO:
            return {
                ...state,
                currentMangas: payload
            }
        case FILTRO_AUTOR:
            return {
                ...state,
                currentMangas: payload
            }
        case ORDER:
            return {
                ...state,
                currentMangas: payload
            }
        case SEARCH_MANGA:
            return {
                ...state,
                currentMangas: payload
            }
        default:
            return state
    }
}

export default rootReducer