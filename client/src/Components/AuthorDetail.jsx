import React from 'react';
import {Link, useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Container, Box, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Checkbox } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import {getAuthorDetail} from '../Actions'
import { getAllMangas } from '../Actions'
 
export default function AuthorDetail() {
    const dispatch = useDispatch()
    const {id} = useParams()
    console.log(id,'detail')
  

    useEffect(() => {
        dispatch(getAuthorDetail(id))
        dispatch(getAllMangas())
    },[dispatch, id])

    const Author = useSelector(state => state.authorDetail)
    console.log(Author,'author')
    const allMangas = useSelector((state) => state.allMangas)

    const avatar = 'https://e00-elmundo.uecdn.es/elmundo/imagenes/2010/10/27/cultura/1288199917_0.jpg'
  
    
    return (
        <div>
            <Container fixed maxWidth="md">
                <Box sx={{ position: "relative" }}>
                    <Box sx={{
                        background: 'linear-gradient(180deg, rgba(25,42,69,1) 0%, rgba(255,255,255,0) 100%)',
                        width: "100%",
                        height: "100%",
                    }} position="absolute">
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between',  height: "80%", mt: { xs: '4%', md: '10%' }, ml: '1rem', color: "white" }}>
                            
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: { xs: '4%', md: '10%' }, ml: '1rem', color: "white" }}>
                                {/* <Typography variant="h5" sx={{ fontSize: { xs: "1.2rem", md: "1.6rem" } }} component="div">{Author.map((t)=>t.name)}</Typography> */}
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: { xs: '4%', md: '10%' }, ml: '1rem', color: "white" }}>
                                <Typography variant="subtitle1" sx={{ mb: { xs: "0.5rem", md: "0.7rem" }, fontSize: { xs: "0.8rem", md: "1.2rem" } }}>About Me</Typography>
                                
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Typography variant="body2" sx={{ textAlign: 'left', width: "70%", fontSize: { xs: "0.6rem", md: "1rem" } }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: "1rem", mt: { xs: "0.5rem", md: "1rem" } }}>
                                        <Checkbox
                                            value={'1'}
                                            icon={<StarBorderIcon />}
                                            checkedIcon={<StarIcon />}
                                            sx={{ p: 0, color: "#FFD400", '&.Mui-checked': { color: "#FFD400" } }}
                                        />
                                        < Checkbox
                                            value={'2'}
                                            icon={<StarBorderIcon />}
                                            checkedIcon={<StarIcon />}
                                            sx={{ p: 0, color: "#FFD400", '&.Mui-checked': { color: "#FFD400" } }}
                                        />
                                        <Checkbox
                                            value={'3'}
                                            icon={<StarBorderIcon />}
                                            checkedIcon={<StarIcon />}
                                            sx={{ p: 0, color: "#FFD400", '&.Mui-checked': { color: "#FFD400" } }}
                                        />
                                        <Checkbox
                                            value={'4'}
                                            icon={<StarBorderIcon />}
                                            checkedIcon={<StarIcon />}
                                            sx={{ p: 0, color: "#FFD400", '&.Mui-checked': { color: "#FFD400" } }}
                                        />
                                        <Checkbox
                                            value={'5'}
                                            icon={<StarBorderIcon />}
                                            checkedIcon={<StarIcon />}
                                            sx={{ p: 0, color: "#FFD400", '&.Mui-checked': { color: "#FFD400" } }}
                                        />
                                    </Box>
                                </Box>
                           </Box>
                            
                        </Box>
                    
                    </Box>
                    <Box>
                        <img
                            component="img"
                            height="100%"
                            width="100%"
                            src={avatar}
                            alt="avatar"
                        />
                    </Box>
                </Box>
                <List sx={{ width: '100%', minWidth: "22.5rem", bgcolor: 'background.paper' }}>

                    {
                        allMangas.data?.map((m, i) => {
                            
                            return (
                                <Box key={i}>

                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={m.image} variant="square" sx={{ width: "6rem", height: "6rem", mr: "1rem" }} />
                                        </ListItemAvatar>
                                        <ListItemText primary= {m.title} />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />

                                </Box>
                            )
                        })
                    }  
                  
                </List>
            </Container>
        </div>

    );
}
