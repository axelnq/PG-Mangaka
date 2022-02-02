const initialState = {
    allMangas: [],
    currentMangas: [],
    mangaDetail: {}
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case 'GET_MANGAS': 
            return {
                ...state,
                allMangas: payload
            }
        default:
            return state
    }
}

export default rootReducer