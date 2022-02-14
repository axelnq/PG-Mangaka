import {
    MANGAS_TO_DB,
    GET_ALL_MANGAS,
    GET_GENRES,
    GET_DETAIL,
    POST_MANGA,
    FILTRO_GENERO,
    FILTRO_AUTOR,
    ORDER,
    SEARCH_MANGA,
    RECOMENDATED_MANGAS,
    PAGINADO_PAGE,
    GET_MANGAS_PREVIEW,
    POST_CHAPTERS,
    GET_LIBRARY,
    GET_WISHLIST,
    CURRENT_USER,
    GET_ALL_CHAPTERS,
} from "../Actions";

const initialState = {
    allMangas: [],
    currentMangas: [],
    mangaDetail: {},
    genres: [],
    mangasPreview: [],
    filters: {
        genre: "",
        order: "",
    },
    library: [],
    wishlist: [],
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    allChapters:[],

};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CURRENT_USER:
            return {
                ...state,
                user: payload,
            };
        case MANGAS_TO_DB:
            return {
                ...state,
            };
        case GET_ALL_MANGAS:
            return {
                ...state,
                allMangas: payload,
                // filters: {
                //     genre: '',
                // }
            };
        case GET_GENRES:
            return {
                ...state,
                genres: payload,
            };
        case RECOMENDATED_MANGAS:
            return {
                ...state,
                allMangas: payload,
            };
        case GET_DETAIL:
            return {
                ...state,
                mangaDetail: payload,
            };
        case GET_MANGAS_PREVIEW:
            return {
                ...state,
                mangasPreview: payload,
            };
        case POST_MANGA:
            return {
                ...state,
            };
        case FILTRO_GENERO:
            return {
                ...state,
                allMangas: payload,
                filters: {
                    genre: payload,
                    order: state.filters.order,
                },
            };
        case FILTRO_AUTOR:
            return {
                ...state,
                allMangas: payload,
            };
        case ORDER:
            return {
                ...state,
                allMangas: payload,
                filters: {
                    order: payload,
                    genre: state.filters.genre,
                },
            };
        case SEARCH_MANGA:
            return {
                ...state,
                allMangas: payload,
            };
        case PAGINADO_PAGE:
            return {
                ...state,
                allMangas: payload,
            };
        case POST_CHAPTERS:
            return {
                ...state,
            };
        case GET_LIBRARY:
            return {
                ...state,
                library: payload,
            };
        case GET_WISHLIST:
            return {
                ...state,
                wishlist: payload,
            };
            case GET_ALL_CHAPTERS:
                return {
                    ...state,
                    allChapters: payload,
                    
                };
        default:
            return state;
    }
};

export default rootReducer;
