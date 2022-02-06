export const MANGAS_TO_DB = 'MANGAS_TO_DB'
export const GET_ALL_MANGAS = 'GET_ALL_MANGAS'
export const GET_GENRES = 'GET_GENRES'
export const RECOMENDATED_MANGAS = 'RECOMENDATED_MANGAS'
export const GET_DETAIL = 'GET_DETAIL'
export const POST_MANGA = 'POST_MANGA'
export const FILTRO_GENERO = 'FILTRO_GENERO'
export const FILTRO_AUTOR = 'FILTRO_AUTOR'
export const ORDER = 'ORDER'
export const SEARCH_MANGA = 'SEARCH_MANGA' 

const axios = require('axios')

export let mangasToDb = () => {
    return async (dispatch) => {
        try {
            let mangas = await axios.get('http://localhost:3001/api/mangas/allMangas')
            return dispatch({
                type: MANGAS_TO_DB,
                payload: mangas.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export let getAllMangas = () => {
    return async (dispatch) => {
        try {
            let allMangas = await axios.get(`http://localhost:3001/api/mangas/directory`)
            return dispatch({
                type: GET_ALL_MANGAS,
                payload: allMangas.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export let getGenres = () => {
    return async (dispatch) => {
        try {
            let allGenres = await axios.get(`http://localhost:3001/api/mangas/listOfGenres`)
            return dispatch({
                type: GET_GENRES,
                payload: allGenres.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export let recomendatedMangas = () => {
    return async (dispatch) => {
        try {
            let allMangas = await axios.get(`http://localhost:3001/api/mangas/recentMangas`)
            return dispatch({
                type: RECOMENDATED_MANGAS,
                payload: allMangas.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}
// falta :id
export let getMangaDetail = (payload) => {
    return async (dispatch) => {
        try {
            let mangaDetail = await axios.get(`http://localhost:3001/api/mangas/manga/24`)
            return dispatch({
                type: GET_DETAIL,
                payload: mangaDetail.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export let postManga = (payload) => {
    return async (dispatch) => {
        try {
            let manga = await axios.post(`http://localhost:3001/api/mangas`, payload)
            return dispatch({
                type: POST_MANGA,
                payload: manga.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}
// falta ruta
export let filterMangasByGenre = (payload) => {
    return async (dispatch) => {
        try {
            let filteredMangas = await axios.get(`http://localhost:3001/api/mangas/directory?filter=${payload}`)
            return dispatch({
                type: FILTRO_GENERO,
                payload: filteredMangas.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}
// falta ruta
export let filterMangasByAuthor = (payload) => {
    return async (dispatch) => {
        try {
            let filteredMangas = await axios.get(`http://localhost:3001/api/mangas/byAuthor?author=${payload}`)
            return dispatch({
                type: FILTRO_AUTOR,
                payload: filteredMangas.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export let orderMangas = (payload) => {
    return async (dispatch) => {
        try {
            let orderedMangas = await axios.get(`http://localhost:3001/api/mangas/directory?order=${payload}&tags=title`)
            return dispatch({
                type: ORDER,
                payload: orderedMangas.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export let searchManga = (payload) => {
    return async (dispatch) => {
        try {
            let search = await axios.get(`http:localhost:3001/api/mangas/Search?title=${payload}`)
            return dispatch({
                type: SEARCH_MANGA,
                payload: search.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
