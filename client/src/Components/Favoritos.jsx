import React from 'react';

import {Box, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';

import corazon from '../img/corazon.png'

import './styleFavoritos.css'

const Favorite = (props) =>{

    const imgMangas= 'https://ramenparados.com/wp-content/uploads/2020/09/one-punch-man-image.jpg'

    return (
        <Box sx={{width:'70%', display:'block', justifyContent:'center', alignContent:'center'}}>
            <h1>aqui van los favoritos pendejo</h1>
            <Divider variant="inset" />
                <ListItem  alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={imgMangas} variant="square" sx={{ width: "6rem", height: "6rem", mr: "1rem" }} />
                    </ListItemAvatar>
                    <ListItemText
                        primary="#6 Título del capítulo"
                        secondary={
                            <React.Fragment>
                                <Typography variant="body2" color="text.secondary">Rating</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                        
                                    <img className='corazonOK' src={corazon} alt="corazon" />
                                        
                                </Box>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            <Divider variant="inset" />
        </Box>
    );
}   

export default Favorite