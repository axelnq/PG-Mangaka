import React from 'react';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import { Box, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Nabvar from './Navbar'

import { favorite, removeFavorite } from '../Actions'





const _ArrayBufferToBase64 = (buffer) => {
    //console.log(buffer)
    if (buffer === undefined) return '';
    var binary = '';
    var byte = new Uint8Array(buffer.data);
    var length = byte.byteLength;

    for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(byte[i])
    }
    return window.btoa(binary)
}

const Favorite = (props) => {

    const dispatch = useDispatch()



    let favorites = useSelector(state => state.favorite)


    useEffect(() => {
        dispatch(favorite())

    }, [dispatch])

    const [fav, setFav] = React.useState(false);

    const handleFav = (e, id) => {
        e.preventDefault()
        fav ? setFav(false) : setFav(true)
        axios.put(`http://localhost:3001/api/users/user/lists?list=favorites`, { mangaId: id }, { withCredentials: true })
            .then((data) => {
                dispatch(removeFavorite(id))
            })
            .catch((error) => console.error(error.response))

    }

    return (
        <div>

            <Nabvar />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Box sx={{ width: '70%', display: 'block', justifyContent: 'center', alignContent: 'center' }}>

                    <h1>❤ FAVORITOS ❤</h1>

                    {
                        favorites.data?.length ? favorites.data?.map((f) =>
                            <div  >
                                <Divider variant="inset" />
                                <ListItem alignItems="flex-start">

                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={'data:image/jpeg;base64,' + _ArrayBufferToBase64(f.image)} variant="square" sx={{ width: "6rem", height: "6rem", mr: "1rem" }} />
                                    </ListItemAvatar>

                                    <Link to={'/detail/' + f.id}> <ListItemText
                                        primary={f.title}

                                        secondary={
                                            <React.Fragment>
                                                <Typography variant="body2" color="text.secondary">{f.name}</Typography>

                                            </React.Fragment>
                                        }
                                    />
                                    </Link>
                                    <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }} key={f.id}>


                                        <Button id={f.id} onClick={(e) => handleFav(e, f.id)}><FavoriteIcon sx={{ color: 'red' }} /></Button>


                                    </Box>

                                </ListItem>
                                <Divider variant="inset" />
                            </div>
                        )

                            : <Typography color="text.primary"> 'NO TIENES FAVORITOS EN ESTE MOMENTO'</Typography>
                    }

                </Box>
            </Box>
        </div>
    );
}

export default Favorite