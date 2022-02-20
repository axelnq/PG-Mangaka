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
    console.log(buffer)
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
        setTimeout(() => dispatch(getChapter(id)), 1500)
    }, [dispatch, id])

    const chapter = useSelector((state) => state.chapter.data);
    console.log(chapter)

    let data = []

    if (chapter && chapter.id == id) {
        data = chapter.images[0];
        console.log(data)
    }

    // const reverse = data.slice()
    // const dataReversed = reverse.reverse()
    // console.log(dataReversed)

    // let [currentPage, setCurrentPage] = useState(0)
    // let [infiniteScroll, setInfiniteScroll] = useState(true)
    // let [LeftToRight, setLeftToRight] = useState(true)

    // let handleLeft = () => {
    //     setCurrentPage(currentPage - 1)
    // }

    // let handleRight = () => {
    //     setCurrentPage(currentPage + 1)
    // }

    // let handleFirst = () => {
    //     setCurrentPage(0)
    // }

    // let handleLast = () => {
    //     setCurrentPage(data.length - 1)
    // }

    // document.addEventListener("keydown", function (e) {
    //     if (e.key === 'ArrowLeft') {
    //         if (currentPage >= 1) {
    //             setCurrentPage(currentPage - 1)
    //         }
    //     } else if (e.key === 'ArrowRight') {
    //         if (currentPage <= data.length - 2) {
    //             setCurrentPage(currentPage + 1)
    //         }
    //     }
    // })

    // let handleInfiniteScroll = () => {
    //     setInfiniteScroll(true)
    // }

    // let handleLeftToRight = () => {
    //     setLeftToRight(true)
    //     if (infiniteScroll) {
    //         setInfiniteScroll(false)

    //     } else {
    //         setCurrentPage((data.length - 1) - currentPage)
    //     }

    // }

    // let handleRightToLeft = () => {
    //     setLeftToRight(false)
    //     if (infiniteScroll) {
    //         setInfiniteScroll(false)
    //     } else {

    //     }
    //     setCurrentPage((data.length - 1) - currentPage)
    // }


    // console.log(currentPage)
    // window.addEventListener('scroll', function () {
    //     for (let i = 0; i < data.length; i++) {
    //         var element = document.getElementById(i);
    //         var position = element.getBoundingClientRect();

    //         // checking whether fully visible
    //         if (position.top >= 0 && position.bottom <= window.innerHeight) {
    //             setCurrentPage(i)
    //             console.log(currentPage)
    //         }
    //     }
    // });


    return (
        <Box sx={{ pb: 7 }}>
            <NavBar />
            <CssBaseline />

            {
                data && chapter ?
                    <img id={chapter.id} height="600px" key={chapter.id} src={'data:image/jpeg;base64,' + _ArrayBufferToBase64(data)} alt={chapter.title} />
                    : <div>Loading...</div>
            }

        </Box >
    );
}

