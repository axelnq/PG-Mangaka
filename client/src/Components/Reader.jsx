import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { CssBaseline, TextField, Paper, Button, Typography } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { getChapter } from '../Actions';
import NavBar from './Navbar';

const _ArrayBufferToBase64 = (buffer) => {
    // console.log(buffer)
    var binary = '';
    var byte = new Uint8Array(buffer.data);
    var length = byte.byteLength;

    for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(byte[i])
    }
    return window.btoa(binary)
}

export default function Reader() {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => dispatch(getChapter(id)), 2000)
    }, [dispatch, id])

    const chapter = useSelector((state) => state.chapter.data);
    // console.log(chapter)
    let data = []
    let reverse = [];
    let dataReversed = [];
    if (chapter && chapter.length > 0) {
        data = chapter
        // console.log(data.length)
        // console.log(data)
        reverse = data?.slice()
        // console.log(reverse)
        dataReversed = reverse?.reverse()
        // console.log(dataReversed)
    }

    let [currentPage, setCurrentPage] = useState(0)
    let [infiniteScroll, setInfiniteScroll] = useState(false)
    let [LeftToRight, setLeftToRight] = useState(true)

    let handleLeft = () => {
        setCurrentPage(currentPage - 1)
    }

    let handleRight = () => {
        setCurrentPage(currentPage + 1)
    }

    let handleFirst = () => {
        setCurrentPage(0)
    }

    let handleLast = () => {
        setCurrentPage(data?.length - 1)
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === 'ArrowLeft') {
            if (currentPage >= 1) {
                setCurrentPage(currentPage - 1)
            }
        } else if (e.key === 'ArrowRight') {
            if (currentPage <= data?.length - 2) {
                setCurrentPage(currentPage + 1)
            }
        }
    })

    let handleInfiniteScroll = () => {
        setInfiniteScroll(true)
    }

    let handleLeftToRight = () => {
        setLeftToRight(true)
        if (infiniteScroll) {
            setInfiniteScroll(false)
        } else {
            setCurrentPage((data?.length - 1) - currentPage)
        }

    }

    let handleRightToLeft = () => {
        setLeftToRight(false)
        if (infiniteScroll) {
            setInfiniteScroll(false)
        } else {

        }
        setCurrentPage((data?.length - 1) - currentPage)
    }



    // console.log(currentPage)
    window.addEventListener('scroll', function () {
        for (let i = 0; i < data.length; i++) {
            var element = document.getElementById(i);
            var position = element.getBoundingClientRect();

            // checking whether fully visible
            if (position.top >= 0 && position.bottom <= window.innerHeight) {
                setCurrentPage(i)
                // console.log(currentPage)
            }
        }
    });


    return (
        <Box sx={{ pb: 7 }}>
            <NavBar />
            <CssBaseline />

            {/* SHOW IMAGES */}
            <div>
                {/* check if array is empty */}
                {data.length > 0 ?
                    <div>
                        {/* if not and infinite scroll show all */}
                        {infiniteScroll ?
                            data?.map((item, index) => {
                                return (
                                    <Box sx={{ disply: 'flex', justifyContent: 'center', px: { xs: '15rem', lg: '10rem' }, pb: '2rem' }}>
                                        <img id={index} key={index} width="contain" src={'data:image/jpeg;base64,' + _ArrayBufferToBase64(item)} alt={index} />
                                    </Box>

                                )
                            })
                            //  else show by one
                            : <div>
                                {
                                    data ?
                                        <div>
                                            {LeftToRight ?
                                                <Box sx={{ disply: 'flex', justifyContent: 'center', alignItems: 'center', px: { xs: '15rem', lg: '33rem' } }}>
                                                    <img id={data[currentPage]} key={data[currentPage]} src={'data:image/jpeg;base64,' + _ArrayBufferToBase64(data[currentPage])} />
                                                </Box> :
                                                <Box sx={{ disply: 'flex', justifyContent: 'center', alignItems: 'center', px: { xs: '15rem', lg: '33rem' } }}>
                                                    <img id={dataReversed[currentPage]} key={dataReversed[currentPage]} src={'data:image/jpeg;base64,' + _ArrayBufferToBase64(dataReversed[currentPage])} />
                                                </Box>
                                            }
                                        </div>
                                        : <p>Cargando...</p>

                                }
                            </div>
                        }
                        {/* SHOW BUTTONS */}
                        {
                            infiniteScroll ?
                                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Box>
                                            <Button sx={{ my: "1rem", mx: "1rem" }} onClick={handleLeftToRight} variant="contained">Left to right</Button>
                                            <Button sx={{ my: "1rem", mx: "1rem" }} onClick={handleRightToLeft} variant="contained">Right to Left</Button>
                                        </Box>
                                    </Box>
                                </Paper >
                                :
                                <Paper elevation={3}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                {!LeftToRight ?
                                                    <Button sx={{ my: "1rem" }} onClick={handleLeftToRight} variant="contained">Left to right</Button> :
                                                    <Button sx={{ my: "1rem" }} onClick={handleRightToLeft} variant="contained">Right to left</Button>
                                                }
                                                <Button sx={{ my: "1rem", ml: "1rem" }} onClick={handleFirst} variant="contained"><KeyboardDoubleArrowLeftIcon /></Button>
                                                {
                                                    //left 
                                                    currentPage <= 0 ?
                                                        <Button id="leftArrow" sx={{ my: "1rem", mx: "1rem" }} disabled variant="contained"><ArrowLeftIcon /></Button> :
                                                        <Button id="leftArrow" sx={{ my: "1rem", mx: "1rem" }} onClick={handleLeft} variant="contained"><ArrowLeftIcon /></Button>
                                                }
                                                <Typography variant="button" gutterBottom component="div">
                                                    {currentPage + 1}/{data?.length}
                                                </Typography>
                                                {//right
                                                    currentPage >= data?.length - 1 ?
                                                        <Button id="rightArrow" sx={{ my: "1rem", mx: "1rem" }} disabled variant="contained"><ArrowRightIcon /></Button> :
                                                        <Button id="rightArrow" sx={{ my: "1rem", mx: "1rem" }} onClick={handleRight} variant="contained"><ArrowRightIcon /></Button>
                                                }
                                                <Button sx={{ my: "1rem", mr: "1rem" }} onClick={handleLast} variant="contained"><KeyboardDoubleArrowRightIcon /></Button>
                                            </Box>
                                            {
                                                LeftToRight ?
                                                    <a href={'#' + currentPage}><Button sx={{ my: "1rem" }} onClick={handleInfiniteScroll} variant="contained">Infinite scroll</Button></a> :
                                                    <a href={'#' + ((data.length - 1) - currentPage)}><Button sx={{ my: "1rem" }} onClick={handleInfiniteScroll} variant="contained">Infinite scroll</Button></a>
                                            }


                                        </Box>
                                    </Box>
                                </Paper >
                        }
                    </div>
                    : <p>Cargando...</p>
                }
            </div >

        </Box >
    );
}

