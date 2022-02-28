import React from 'react';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
//actions
import axios from 'axios';
import { getMangaDetail, addMangaWishList, buyChapters, getUser } from '../Actions'
//mui
import { Container, Box, Button, List, ListItem, Modal, LinearProgress, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// components
import Nabvar from './Navbar'
import Score from './Score'
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

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

const Detail = () => {
    const { id } = useParams()
    console.log(id)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => dispatch(getMangaDetail(id)), 1500)
        getUser()
    }, [dispatch, id])

    const mangaDetail = useSelector((state) => state.mangaDetail.data)
    let user = useSelector(state => state.user)
    console.log(user)
    console.log(mangaDetail)
    let buffer;
    if (mangaDetail && mangaDetail.id == id) {
        buffer =
            _ArrayBufferToBase64(mangaDetail.image)
    }

    const [valueManga, setValueManga] = React.useState(0);
    const [valueChapter, setValueChapter] = React.useState(0);
    const [fav, setFav] = React.useState(false);
    let [wishlist, setWishlist] = React.useState({ mangaId: id })

    const handleFav = () => {
        fav ? setFav(false) : setFav(true)
        axios.put(`http://localhost:3001/api/users/user/lists?list=favorites`, { mangaId: id }, { withCredentials: true })
    }

    let handleAddWishlist = (e) => {
        e.preventDefault()
        dispatch(addMangaWishList(wishlist))
    }

    const [open, setOpen] = React.useState(false);
    const [chapId, setChapId] = React.useState(0);
    const handleOpen = (e) => {
        setOpen(true);
        setChapId(e.target.value)
        console.log(chapId)
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleBuyChapters = (e) => {
        dispatch(buyChapters({ sellerId: mangaDetail.authorId, productId: chapId }))
        setTimeout(() => navigate(`/reader/${chapId}`), 1000)
    }

    const [paragraph, setParagraph] = React.useState(false)

    const handleParagraph = (e) => {
        if (paragraph) {
            setParagraph(false)
        } else {
            setParagraph(true)
        }

    }
    return (
        <div>
            <Nabvar />
            {mangaDetail && mangaDetail.id == id ?

                <Container fixed maxWidth="md">
                    <Box sx={{ position: "relative" }}>
                        <Box sx={{
                            background:
                                'linear-gradient(180deg, rgba(25,42,69,1) 0%, rgba(255,255,255,0) 100%)',
                            width: "100%",
                            height: "100%",
                        }}
                            position="absolute">
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {
                                    user.wishList.includes(mangaDetail.id) ?
                                        null
                                        :
                                        <Button onClick={handleAddWishlist}>+ Deseados</Button>
                                }
                                {
                                    user.favorites.includes(mangaDetail.id) ?
                                        null
                                        :
                                        fav ?
                                            <Button onClick={handleFav}><FavoriteIcon sx={{ color: 'red' }} /></Button>
                                            : <Button onClick={handleFav}><FavoriteBorderIcon sx={{ color: 'red' }} /></Button>
                                }
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: { xs: '4%', md: '6%' }, ml: '2rem', color: "white", height: 'max-content' }}>
                                <Typography variant="h5" sx={{ fontSize: { xs: "1.2rem", md: "1.6rem" }, mt: '1rem' }} component="div">{mangaDetail.title}</Typography>
                                <Typography variant="subtitle1" sx={{ mb: { xs: "0.5rem", md: "0.7rem" }, fontSize: { xs: "0.8rem", md: "1.2rem" } }}>{mangaDetail.genre.map(g => g).join(', ')}</Typography>
                                {
                                    paragraph ?
                                        <Typography variant="body2" sx={{ textAlign: 'left', width: "90%", fontSize: { xs: "0.6rem", md: "1rem", lineHeight: '1.5rem' } }}>{mangaDetail.synopsis}</Typography>
                                        :
                                        <Typography noWrap="false" variant="body2" sx={{ textAlign: 'left', width: "90%", fontSize: { xs: "0.6rem", md: "1rem" } }}>{mangaDetail.synopsis}</Typography>
                                }
                                {
                                    mangaDetail.synopsis.length >= 104 ?
                                        paragraph ?
                                            <KeyboardArrowUpIcon onClick={handleParagraph} sx={{
                                                color: '#357DED', width: '2rem',
                                                height: '2rem'
                                            }} />
                                            :
                                            <KeyboardArrowDownIcon onClick={handleParagraph} sx={{
                                                color: '#357DED', width: '2rem',
                                                height: '2rem'
                                            }} />
                                        : null
                                }
                            </Box>

                            {/* <Box
                                sx={{
                                    display: 'flex', justifyContent: 'flex-end', mt: '0.5rem', mr: '1rem'
                                }}
                            >
                                <Rating
                                    name="simple-controlled"
                                    value={valueManga}
                                    onChange={(event, newValue) => {
                                        setValueManga(newValue);
                                    }}
                                />

                            </Box> */}
                        </Box>
                        {
                            paragraph ?
                                <Box sx={{ overflow: 'hidden', height: { xs: '40rem', sm: '28rem', md: '35rem' } }}>
                                    <img
                                        component="img"
                                        height="contain"
                                        width="auto"
                                        src={'data:image/jpeg;base64,' + buffer}
                                        alt={mangaDetail?.title}
                                    />
                                </Box>
                                :
                                <Box sx={{ overflow: 'hidden', height: { xs: '10rem', sm: '12rem', md: '18rem' } }}>
                                    <img
                                        component="img"
                                        height="contain"
                                        width="auto"
                                        src={'data:image/jpeg;base64,' + buffer}
                                        alt={mangaDetail?.title}
                                    />
                                </Box>
                        }
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '1rem' }}>
                        <a href="#bottom"><Button sx={{ fontSize: { xs: '0.7rem', md: '1rem' }, color: '#357DED' }}>Ir al último <ArrowDropDownIcon /></Button></a>
                        {
                            user && user.creatorMode && mangaDetail.authorId === user.id ?
                                <Link to={'/profile/createChapters/' + mangaDetail.id}><Button sx={{ fontSize: { xs: '0.7rem', md: '1rem' }, background: '#357DED' }} variant="contained">Agregar Capítulo</Button></Link>
                                : null
                        }
                    </Box>
                    <List sx={{ width: '100%', minWidth: "25rem", bgcolor: 'background.paper' }}>

                        {mangaDetail.chapters?.map((chapter, index) => (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '50rem' }}>
                                {/* <Button disabled> */}
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={chapter.title} src={'data:image/jpeg;base64,' + _ArrayBufferToBase64(chapter.coverImage)} variant="square" sx={{ width: { xs: "4rem", sm: "6rem" }, height: { xs: "4rem", sm: "6rem" }, mr: "1rem" }} />
                                    </ListItemAvatar>
                                    <Box>
                                        <Typography variant="h3" sx={{ fontSize: { xs: "0.7rem", sm: "1rem" } }}>{chapter.title}</Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem" } }}>30 enero, 2022</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                            {/* <Typography variant="body2" color="text.secondary">{chapter.points}</Typography> */}
                                            <Box
                                                sx={{
                                                    display: 'flex', justifyContent: 'flex-end', mt: '0.5rem'
                                                }}
                                            >
                                                {/* <Score id={chapter.id} /> */}
                                                {/* <Rating
                                                            name="simple-controlled"
                                                            value={valueChapter}
                                                            onChange={(event, newValue) => {
                                                                setValueChapter(newValue);
                                                            }}
                                                        /> */}
                                            </Box>
                                        </Box>
                                        {
                                            user.chapters.includes(chapter.id) || mangaDetail.authorId === user.id || mangaDetail.chapters[0].id === chapter.id ?
                                                <Link to={'/reader/' + chapter.id}> <Button sx={{ width: { xs: '0.8 rem', md: '1.5rem' }, height: { xs: '1.5rem', md: '2rem' }, fontSize: { xs: '0.7rem', md: '0.8rem' }, background: '#357DED' }}
                                                    variant="contained">Leer</Button></Link> :
                                                < Button sx={{ width: { xs: '0.8 rem', md: '1.5rem' }, height: { xs: '1.5rem', md: '2rem' }, fontSize: { xs: '0.7rem', md: '0.8rem' } }} value={chapter.id} onClick={handleOpen}>Comprar</Button>
                                        }
                                    </Box>

                                </ListItem>
                            </Box>

                        ))}

                        {/* <Divider variant="inset" component="li" /> */}
                    </List>
                </Container >

                : <LinearProgress sx={{ height: '0.5rem ' }} />
            }
            <div id='bottom'></div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">¿Desea confirmar la compra?</h2>
                    <p id="parent-modal-description">
                        El valor por el capitulo es de 5 monedas
                    </p>
                    <Button onClick={handleBuyChapters}>Confirmar</Button>
                </Box>
            </Modal>
        </div >
    )
}

export default Detail
