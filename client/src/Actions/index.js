export const MANGAS_TO_DB = "MANGAS_TO_DB";
export const GET_ALL_MANGAS = "GET_ALL_MANGAS";
export const GET_GENRES = "GET_GENRES";
export const RECENT_MANGAS = "RECENT_MANGAS";
export const GET_DETAIL = "GET_DETAIL";
export const POST_MANGA = "POST_MANGA";
export const FILTRO_GENERO = "FILTRO_GENERO";
export const FILTRO_AUTOR = "FILTRO_AUTOR";
export const ORDER = "ORDER";
export const SEARCH_MANGA = "SEARCH_MANGA";
export const PAGINADO_PAGE = "PAGINADO_PAGE";
export const GET_MANGAS_PREVIEW = "GET_MANGAS_PREVIEW";
export const POST_CHAPTERS = "POST_CHAPTERS";
export const GET_LIBRARY = "GET_LIBRARY";
export const GET_WISHLIST = "GET_WISHLIST";
export const CURRENT_USER = "CURRENT_USER";
export const GET_ALL_CHAPTERS = "GET_ALL_CHAPTERS";
export const GET_USER_INFO = "GET_USER_INFO";
export const GET_DETAIL_WISHLIST = "GET_DETAIL_WISHLIST";
export const GET_DETAIL_LIBRARY = "GET_DETAIL_LIBRARY";
export const GET_POPULAR_MANGAS = "GET_POPULAR_MANGAS";
export const GET_AUTHORS = "GET_AUTHORS";
export const CHANGE_SHOW = "CHANGE_SHOW";
export const GET_USERS = "GET_USERS";
export const SET_ACTIVE = "SET_ACTIVE";
export const SET_ACTIVE_MANGA = "SET_ACTIVE_MANGA";
export const SET_ADMIN = "SET_ADMIN";
export const DELETE_WISHLIST_MANGA = "DELETE_WISHLIST_MANGA";
export const ADD_MANGA_WISHLIST = "ADD_MANGA_WISHLIST";
export const POST_CHECKOUT = "POST_CHECKOUT";
export const GET_PACKS = "GET_PACKS";
export const BUY_COINS = "BUY_COINS";
export const GET_CHAPTER = "GET_CHAPTER";
// export const GET_PREFERENCE_ID = "GET_PREFERENCE_ID"
export const GET_PREFERENCE_ID = "GET_PREFERENCE_ID";
export const GET_AUTHOR_DETAILS ='GET_AUTHOR_DETAILS';
export const FAVORITE = 'FAVORITE';
export const GET_POPULAR_AUTHORS = 'GET_POPULAR_AUTHORS'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const CREATE_COMMENT = 'CREATE_COMMENT'

const axios = require("axios");

export let mangasToDb = () => {
    return async (dispatch) => {
        try {
            let mangas = await axios.get(
                "http://localhost:3001/api/mangas/allMangas"
            );
            return dispatch({
                type: MANGAS_TO_DB,
                payload: mangas.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let getAllMangas = () => {
    return async (dispatch) => {
        try {
            let allMangas = await axios.get(
                `http://localhost:3001/api/mangas/directory`
            );
            return dispatch({
                type: GET_ALL_MANGAS,
                payload: allMangas.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let getGenres = () => {
    return async (dispatch) => {
        try {
            let allGenres = await axios.get(
                `http://localhost:3001/api/mangas/listOfGenres`
            );
            return dispatch({
                type: GET_GENRES,
                payload: allGenres.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let getRecentMangas = () => {
    return async (dispatch) => {
        try {
            let allMangas = await axios.get(
                `http://localhost:3001/api/mangas/recentMangas`
            );
            return dispatch({
                type: RECENT_MANGAS,
                payload: allMangas.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let getMangaDetail = (payload) => {
    return async (dispatch) => {
        try {
            let mangaDetail = await axios.get(
                `http://localhost:3001/api/mangas/manga/${payload}`
            );
            return dispatch({
                type: GET_DETAIL,
                payload: mangaDetail.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let postManga = (payload) => {
    return async (dispatch) => {
        try {
            console.log(payload);
            let manga = await axios.post(
                `http://localhost:3001/api/mangas`,
                payload,
                { withCredentials: true }
            );
            return dispatch({
                type: POST_MANGA,
                payload: manga.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let filterMangasByGenre = (payload) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: FILTRO_GENERO,
                payload: payload,
            });
        } catch (error) {
            console.log(error);
        }
    };
};
// falta ruta
export let filterMangasByAuthor = (payload) => {
    return async (dispatch) => {
        try {
            let filteredMangas = await axios.get(
                `http://localhost:3001/api/mangas/byAuthor?author=${payload}`
            );
            return dispatch({
                type: FILTRO_AUTOR,
                payload: filteredMangas.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let orderMangas = (payload) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: ORDER,
                payload: payload,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let searchManga = (payload) => {
    return async (dispatch) => {
        try {
            let search = await axios.get(
                `http://localhost:3001/api/mangas/Search?title=${payload}`
            );
            return dispatch({
                type: SEARCH_MANGA,
                payload: search.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};
//show autocomplete in the searchbar
export let getMangasPreview = () => {
    return async (dispatch) => {
        try {
            let search = await axios.get(
                "http://localhost:3001/api/mangas/Search?title="
            );
            return dispatch({
                type: GET_MANGAS_PREVIEW,
                payload: search.data.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};
export let paginado = ({ page, genre, order }) => {
    return async (dispatch) => {
        try {
            let mangas = await axios.get(
                `http://localhost:3001/api/mangas/directory?page=${page}&filter=${
                    genre ? genre : ""
                }&order=${order ? order : "asc"}&tags=title`
            );
            return dispatch({
                type: PAGINADO_PAGE,
                payload: mangas.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let postChapters = (payload) => {
    return async (dispatch) => {
        try {
            console.log(payload);
            let chapters = await axios.post(
                `http://localhost:3001/api/chapters`,
                payload,
                { withCredentials: true }
            );

            return dispatch({
                type: POST_CHAPTERS,
                payload: chapters.data,
            });
        } catch (error) {
            console.log(error.response);
        }
    };
};
// falta rutas
// export let getLibrary = (payload) => {
//     return async (dispatch) => {
//         try {
//             let mangas = await axios.get(``)
//             return dispatch({
//                 type: GET_LIBRARY,
//                 payload: mangas.data
//             })
//         } catch(error) {
//             console.log(error)
//         }
//     }
// }

export let getWishList = (payload) => {
    return async (dispatch) => {
        try {
            let mangas = await axios.get(
                `http://localhost:3001/api/profile/wishlist`,
                { withCredentials: true }
            );
            return dispatch({
                type: GET_WISHLIST,
                payload: mangas.data,
            });
        } catch (error) {
            console.log(error.response);
        }
    };
};
export let getCurrentUser = (form) => {
    return async (dispatch) => {
        try {
            const request = await axios.post(
                `http://localhost:3001/api/auth/local/login`,
                form,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    Authorization: {
                        username: form.username,
                        password: form.password,
                    },
                    withCredentials: true,
                }
            );

            const response = await request.data;
            if (response.msg === "usuario no logueado") {
                localStorage.clear();
                return dispatch({
                    type: CURRENT_USER,
                    payload: null,
                });
            }
            localStorage.setItem("user", JSON.stringify(response));
            const user = JSON.parse(localStorage.getItem("user"));
            return dispatch({ type: CURRENT_USER, payload: user });
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const UserLogout = () => {
    return async (dispatch) => {
        try {
            const request = await axios({
                method: "GET",
                withCredentials: true,
                url: "http://localhost:3001/api/auth/logout",
            });
            const response = await request.data;
            console.log(response);
            localStorage.clear();
            return dispatch({
                type: CURRENT_USER,
                payload: null,
            });
        } catch (e) {
            console.log(e);
        }
    };
};

//Verifica si el usuario está conectado
export const getUser = () => {
    return async (dispatch) => {
        try {
            const request = await axios.get(
                "http://localhost:3001/api/users/currentUser",
                { withCredentials: true }
            );
            const response = await request.data;
            localStorage.setItem("user", JSON.stringify(response));
            const user = JSON.parse(localStorage.getItem("user"));
            return dispatch({
                type: CURRENT_USER,
                payload: user,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getGoogleUser = () => {
    return async (dispatch) => {
        try {
            const request = await axios({
                method: "GET",
                withCredentials: true,
                url: "http://localhost:3001/api/auth/google/response",
            });
            const response = await request.data;
            if (response.msg === "usuario no logueado") {
                localStorage.clear();
                return dispatch({
                    type: CURRENT_USER,
                    payload: null,
                });
            }
            localStorage.setItem("user", JSON.stringify(response));
            const user = JSON.parse(localStorage.getItem("user"));
            return dispatch({
                type: CURRENT_USER,
                payload: user,
            });
        } catch (error) {
            console.log(error);
        }
    };
};
export let getChapters = (payload) => {
    return async (dispatch) => {
        try {
            let allChapters = await axios.get(
                `http://localhost:3001/api/chapters/chapter/getchapter/${payload} `
            );
            return dispatch({
                type: GET_ALL_CHAPTERS,
                payload: allChapters.data,
                withCredentials: true
            });
        } catch (error) {
            console.log(error);
        }
    };
};
export let getUserInfo = (payload) => {
    return async (dispatch) => {
        try {
            let user = await axios.get(
                `http://localhost:3001/api/users/user/${payload}`
            );
            return dispatch({
                type: GET_USER_INFO,
                payload: user.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let getMangaDetailWishList = (payload) => {
    return async (dispatch) => {
        try {
            let mangaDetail = await axios.get(
                `http://localhost:3001/api/mangas/manga/${payload}`
            );
            return dispatch({
                type: GET_DETAIL_WISHLIST,
                payload: mangaDetail.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let getMangaDetailLibrary = (payload) => {
    return async (dispatch) => {
        try {
            let mangaDetail = await axios.get(
                `http://localhost:3001/api/mangas/manga/${payload}`
            );
            return dispatch({
                type: GET_DETAIL_LIBRARY,
                payload: mangaDetail.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let getPopularMangas = () => {
    return async (dispatch) => {
        try {
            let mangas = await axios.get(
                "http://localhost:3001/api/mangas/popularMangas"
            );
            return dispatch({
                type: GET_POPULAR_MANGAS,
                payload: mangas.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let popularAuthors = () => {
    return async (dispatch) => {
        try {
            let authors = await axios.get("http://localhost:3001/api/users/popularAuthors");
            return dispatch({
                type: GET_POPULAR_AUTHORS,
                payload: authors.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let changeShow = () => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: CHANGE_SHOW,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let getAllUsers = () => {
    return async (dispatch) => {
        try {
            let users = await axios.get("http://localhost:3001/api/users");
            return dispatch({
                type: GET_USERS,
                payload: users.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let setActive = (payload) => {
    return async (dispatch) => {
        try {
            console.log(payload);
            let setActive = await axios.put(
                `http://localhost:3001/api/users/user/setActive/${payload}`, { withCredentials: true}
            );
            return dispatch({
                type: SET_ACTIVE,
                payload: setActive.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let setActiveManga = (payload) => {
    return async (dispatch) => {
        try {
            console.log(payload);
            let setActiveManga = await axios.put(
                `http://localhost:3001/api/mangas/manga/setActive/${payload}`, { withCredentials: true}
            );
            return dispatch({
                type: SET_ACTIVE_MANGA,
                payload: setActiveManga.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let setAdmin = (payload) => {
    return async (dispatch) => {
        try {
            console.log(payload);
            let setAdmin = await axios.put(
                `http://localhost:3001/api/users/user/setAdmin/${payload}`, { withCredentials: true}
            );
            return dispatch({
                type: SET_ADMIN,
                payload: setAdmin.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let deleteWishlistManga = (payload) => {
    return async (dispatch) => {
        try {
            console.log(payload);
            let manga = axios.put(
                `http://localhost:3001/api/users/user/lists?list=wishList`,
                { mangaId: payload },
                { withCredentials: true }
            );
            return dispatch({
                type: DELETE_WISHLIST_MANGA,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let addMangaWishList = (payload) => {
    return async (dispatch) => {
        try {
            console.log(payload);
            let manga = axios.put(
                "http://localhost:3001/api/users/user/lists?list=wishList",
                payload,
                { withCredentials: true }
            );
            return dispatch({
                type: ADD_MANGA_WISHLIST,
                payload: manga.data,
            });
        } catch (error) {
            console.log(error.response);
        }
    };
};

export let postCheckout = (payload) => {
    return async (dispatch) => {
        try {
            console.log(payload);
            let checkout = await axios.post(
                `http://localhost:3001/api/coins/sell`,
                payload,
                { withCredentials: true }
            );

            return dispatch({
                type: POST_CHECKOUT,
                payload: checkout.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let getPacks = () => {
    return async (dispatch) => {
        try {
            let packs = await axios.get("http://localhost:3001/api/coins/pack");
            return dispatch({
                type: GET_PACKS,
                payload: packs.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export let buyCoins = (payload) => {
    return async (dispatch) => {
        try {
            console.log(payload);
            let buyCoins = await axios.post(
                `http://localhost:3001/api/coins/buy`,
                payload
            );
            return dispatch({
                type: BUY_COINS,
                payload: buyCoins,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

// export let getPreferenceId = (payload) => {
//     return async (dispatch) => {
//         try {
//             console.log(payload);
//             let getPreferenceId = await axios.get(
//                 `http://localhost:3001/api/coins/buy`
//             );
//             console.log(getPreferenceId)
//             return dispatch({
//                 type: GET_PREFERENCE_ID,
//                 payload: getPreferenceId,
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     };
// };

export let getChapter = (payload) => {
    return async (dispatch) => {
        try {
            let getChapter = await axios.get(
                `http://localhost:3001/api/chapters/chapter/images/${payload}`
            );
            return dispatch({
                type: GET_CHAPTER,
                payload: getChapter.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};
//-------------------- DETALLES DE AUTOR -------------------------//
export let getAuthorDetail = (id) => {
    return async (dispatch) => {
        try {
            let authorDetail = await axios(`http://localhost:3001/api/users/user/${id}`)
            return dispatch({
                type: 'GET_AUTHOR_DETAILS',
                payload: authorDetail.data
            })
        } catch (error){
            console.log(error.msg)
        }
    };
};

//------------------------- FAVORITOS -------------------------------//
export let favorite = () =>{
    return async (dispatch) => {
        try {
            let favorite = await axios.get(`http://localhost:3001/api/profile/favorites`, {withCredentials:true})
            return dispatch({
                type: 'FAVORITE',
                payload: favorite.data
            });
        } catch (error){
            console.log(error)
        }
    };
};

//------------------ REMOVE FAVORITE  -----------------------------------------//
export let removeFavorite = (id) => {
    return (dispatch) => {
        return dispatch({
            type: 'REMOVE_FAVORITE',
            payload: id
        });
    }
}

//-------------------- CREAR COMENTARIOS ---------------------------------//
export let createComment = (payload) => {
    return async function (dispatch) {
        console.log(payload,'pay')
        try{
            const comments = await axios.post(`http://localhost:3001/api/comments/addComent`, payload , {withCredentials:true});
            console.log(comments,'comentarios')
            dispatch({
                type: "CREATE_COMMENT",
                payload: comments.data 
            });
        } catch (error) {
            console.log(error.response)
        }
    }
}