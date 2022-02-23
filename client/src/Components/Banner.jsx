import React from 'react';

import { Link } from 'react-router-dom';


import Carousel from 'react-material-ui-carousel'
import Box from '@mui/material/Box';

import bleach from '../img/bleach.png'
import komi from '../img/komi.png'
import blackC from '../img/black.png'
import saitama from '../img/saitama.png'



const Banner = (props) => {


    const items = [
        {
            img: bleach,
            link: '/#filters'
        },
        {
            img: blackC,
            link: '/create'
        },
        {
            img: komi,
            link: '/#destacados'

        },
        {
            img: saitama,
            link: '/#recientes'
        }
    ];

    return (
        <div>
            <Box sx={{ md: { xs: '20%', md: '40%', lg: '100%' } }}>
                <div className='Fondo'>
                    <Box>
                        <Carousel className='Carrusel'
                            sx={{ height: { xs: 6.5 + 'rem', sm: 9.8 + 'rem', md: 12.5 + 'rem', lg: 14.5 + 'rem', xl: 16 + 'rem' } }}

                            animation='slide'
                            duration='2100'

                            activeIndicatorIconButtonProps={{
                                style: {
                                    backgroundColor: '#E2E9F3'
                                }
                            }}
                            indicatorIconButtonProps={{
                                style: {
                                    padding: '1px',
                                    color: '#357DED'
                                }
                            }}
                            navButtonsProps={{
                                style: {
                                    backgroundColor: '#1850AB',

                                }
                            }}
                        >
                            {items.map((item, i) => (
                                <Item key={i} {...item}
                                    sx={{ width: '100%' }}
                                />
                            ))}
                        </Carousel>
                    </Box>
                </div>
            </Box>
        </div>

    );
}

const Item = ({ img, link }) => {
    return (
        <div>
            <Box sx={{ md: { xs: '20%', md: '40%', lg: '100%', heigh: '220px' } }}>
                <Link
                    to={link}
                >

                    <img
                        className='Imagen' src={img}
                        alt="imagen"
                        width='100%'
                    />

                </Link>
            </Box>
        </div>
    );

}

export default Banner