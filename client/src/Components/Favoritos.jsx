import React from 'react';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import {Box, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Nabvar from './Navbar'

import  {favorite}  from '../Actions'
// import {addFavorite} from '../Actions'

import './styleFavoritos.css'

const Favorite = (props) =>{
    
    const dispatch = useDispatch()
    
    let favorites = useSelector(state => state.favorite)
    // let addFavorites = useSelector(state => state.addFavorite)

    useEffect(() => {
        dispatch(favorite())
        // dispatch(addFavorite())
    }, [dispatch])

    const [fav, setFav] = React.useState(false);

    const handleFav = () => {
        fav ? setFav(false) : setFav(true)
    }

    return (
        <div>

            <Nabvar />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Box sx={{ width: '70%', display: 'block', justifyContent: 'center', alignContent: 'center' }}>

                    <h1>❤ FAVORITOS ❤</h1>

                    {
                        favorites.data?.length ? favorites.data?.map((f) => {

                            return (
                                <div>
                                    <Divider variant="inset" />
                                    <ListItem alignItems="flex-start">

                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={f.image} variant="square" sx={{ width: "6rem", height: "6rem", mr: "1rem" }} />
                                        </ListItemAvatar>

                                        <ListItemText
                                            primary={f.title}

                                            secondary={
                                                <React.Fragment>
                                                    <Typography variant="body2" color="text.secondary">{f.name}</Typography>
                                                   
                                                </React.Fragment>
                                            }
                                        />

                                        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                        {
                                            fav ?
                                                <Button onClick={handleFav}><FavoriteIcon sx={{ color: 'red' }} /></Button>
                                                : <Button onClick={handleFav}><FavoriteBorderIcon sx={{ color: 'red' }} /></Button>
                                        }
                                        </Box>

                                    </ListItem>
                                    <Divider variant="inset" />
                                </div>
                            ); 
                        }) 
                        : <Typography color="text.primary"> 'NO TIENES FAVORITOS EN ESTE MOMENTO'</Typography>
                    }

                </Box>
            </Box>
        </div>
    );
}   

export default Favorite