import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom';


import Box from '@mui/material/Box';
import bleach from '../img/bleach.png'
import komi from '../img/komi.png'
import blackC from '../img/black.png'
import saitama from '../img/saitama.png'

import './styleBanner.css'

const Banner = (props) => {

    const items = [
        {
            img: bleach,
            link: '/#filters'  
        },
        {
            img:blackC,
            link: '/create'     
        },
        {
            img:komi,
            link: '/#filters'
                
        },
        {
            img:saitama,
            link: '/#filters'       
        }
    ];
    
    return (
        <div className='Fondo'>
            <Box sx={{md:{xs:'20%', md:'40%', lg:'100%' }}}>       
            <Carousel className='Carrusel'>
                {items.map((item, i) => (
                    <Item key={i} {...item} />
                ))}
            </Carousel>
            </Box>
        </div>
    );
}
    
const Item = ({img, link}) => {
    return (
        <div>
            <Box sx={{md:{xs:'20%', md:'40%', lg:'100%' }}}>  
                <Link to={link} >
                
                    <img  className='Imagen' src={img} alt="imagen" />
               
                </Link>
            </Box>
        </div>
    );
    
}

export default Banner