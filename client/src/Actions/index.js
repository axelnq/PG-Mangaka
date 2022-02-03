export const MANGAS_TO_DB = 'MANGAS_TO_DB'
export const GET_ALL_MANGAS = 'GET_ALL_MANGAS'
export const GET_DETAIL = 'GET_DETAIL'
export const POST_MANGA = 'POST_MANGA'
export const FILTRO_GENERO = 'FILTRO_GENERO'
export const FILTRO_AUTOR = 'FILTRO_AUTOR'
export const ORDER = 'ORDER'

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

export let getMangaDetail = (payload) => {
    return async (dispatch) => {
        try {
            let mangaDetail = await axios.get(`http://localhost:3001/api/mangas/allMangas`)
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

export let filterMangasByGenre = (payload) => {
    return async (dispatch) => {
        try {
            let filteredMangas = await axios.get(`http://localhost:3001/api/mangas/allMangas`)
            return dispatch({
                type: FILTRO_GENERO,
                payload: filteredMangas.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export let filterMangasByAuthor = (payload) => {
    return async (dispatch) => {
        try {
            let filteredMangas = await axios.get(`http://localhost:3001/api/mangas/allMangas`)
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
            let orderedMangas = await axios.get(`http://localhost:3001/api/mangas/allMangas`)
            return dispatch({
                type: ORDER,
                payload: orderedMangas.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

