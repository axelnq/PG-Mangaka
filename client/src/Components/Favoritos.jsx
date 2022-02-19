import React from 'react';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import {Box, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Nabvar from './Navbar'

import { favorite } from '../Actions'

import './styleFavoritos.css'

const Favorite = (props) =>{
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(favorite())
    }, [dispatch])

   let favorite = useSelector(state => state.favorite)

    const imgMangas= 'https://ramenparados.com/wp-content/uploads/2020/09/one-punch-man-image.jpg'

    const [fav, setFav] = React.useState(false);

    const handleFav = () => {
        fav ? setFav(false) : setFav(true)
    }

    return (
        <div>

            <Nabvar />
            <Box sx={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <Box sx={{width:'70%', display:'block', justifyContent:'center', alignContent:'center'}}>
                    
                    <h1>❤ FAVORITOS ❤</h1>

                    {/* { mangaDetail */}
                    <Divider variant="inset" />
                        <ListItem  alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={imgMangas} variant="square" sx={{ width: "6rem", height: "6rem", mr: "1rem" }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary= 'Titulo'
                                // {mangaDetail.title}
                                secondary={
                                    <React.Fragment>
                                        <Typography variant="body2" color="text.secondary">Author</Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                                
                                            {
                                                fav ?
                                                    <Button onClick={handleFav}><FavoriteIcon sx={{ color: 'red' }} /></Button>
                                                    : <Button onClick={handleFav}><FavoriteBorderIcon sx={{ color: 'red' }} /></Button>
                                            }
                                                
                                        </Box>
                                    </React.Fragment>
                                }
                                />
                        </ListItem>
                    <Divider variant="inset" />
                    {/* } */}
                </Box>
            </Box>
        </div>
    );
}   

export default Favorite