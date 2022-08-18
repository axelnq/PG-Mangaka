import React from 'react';
import {Link, useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Container, Box, Typography, Checkbox } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import {getAuthorDetail} from '../Actions'

import AuthorMangas from './AuthorMangas';
import Navbar from './Navbar';

 

const _ArrayBufferToBase64 = (buffer) => {
    //console.log(buffer)
    if(buffer === undefined) return '';
    var binary = '';
    var byte = new Uint8Array(buffer.data);
    var length = byte.byteLength;

    for(var i = 0; i < length ;i++) {
        binary += String.fromCharCode(byte[i])
    }
    return window.btoa(binary)
}

export default function AuthorDetail() {
   
    const dispatch = useDispatch()
    const {id} = useParams()   

    useEffect(() => {
        dispatch(getAuthorDetail(id))
        
    },[dispatch, id])

    const Author = useSelector(state => state.authorDetail)
    console.log(Author,'fe')

    return (
        <div>
            <Navbar/>
            <Container fixed maxWidth="md" background='E2E9F3'>
                <Box sx={{ position: "relative" }}>
                    <Box sx={{
                        background: 'linear-gradient(180deg, rgba(25,42,69,1) 0%, rgba(255,255,255,0) 100%)',
                        width: "100%",
                        height: "100%",
                    }} position="absolute">
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: "75%", mt: { xs: '4%', md: '10%' }, ml: '1rem', color: "white" }}>
                            
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: { xs: '4%', md: '10%' }, ml: '1rem', color: "white" }}>
                                <Typography variant="h5" sx={{ fontSize: { xs: "1.2rem", md: "1.6rem" } }} component="div">{Author?.data.name}</Typography>
                            </Box>

                           
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: { xs: '4%', md: '10%' }, ml: '1rem', color: "white" }}>
                                <Typography variant="subtitle1" sx={{ mb: { xs: "0.5rem", md: "0.7rem" }, fontSize: { xs: "0.8rem", md: "1.2rem" } }}>{Author?.data.username}</Typography>
                                
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',  width:'100%'}}>
                                    <Typography variant="body2" sx={{ textAlign: 'left', width: "70%", fontSize: { xs: "0.6rem", md: "1rem" } }}>{Author?.data.about}</Typography>

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
                    <Box  sx={{ overflow: 'hidden', height: { xs: '15rem', md: '25rem' }, display:'flex', justifyContent:'center' }}>
                        <img
                            component="img"
                            height="auto"
                            width="100%"
                            src={'data:image/jpeg;base64,' + _ArrayBufferToBase64(Author?.data.avatar)} 
                            alt="avatar"
                        />
                    </Box>
                </Box>
                
                    
                {
                    Author?.data.created.map((c) => {
                        return(

                            <AuthorMangas key={c['id']} image={'data:image/jpeg;base64,' + _ArrayBufferToBase64(c['image'])} title={c['title']} id={c['id']} link={c['title']}/>
                        )
                    })

                    
                    
                }
                    

                    
                     
                

            </Container>
        </div>

    );
}
