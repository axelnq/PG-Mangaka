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
// components
import Nabvar from './Navbar'
import Score from './Score'

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
                                <Button onClick={handleAddWishlist}>+ Wishlist</Button>
                                {
                                    fav ?
                                        <Button onClick={handleFav}><FavoriteIcon sx={{ color: 'red' }} /></Button>
                                        : <Button onClick={handleFav}><FavoriteBorderIcon sx={{ color: 'red' }} /></Button>
                                }
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: { xs: '4%', md: '6%' }, ml: '1rem', color: "white" }}>
                                <Typography variant="h5" sx={{ fontSize: { xs: "1.2rem", md: "1.6rem" }, mt: '1rem' }} component="div">{mangaDetail.title}</Typography>
                                <Typography variant="subtitle1" sx={{ mb: { xs: "0.5rem", md: "0.7rem" }, fontSize: { xs: "0.8rem", md: "1.2rem" } }}>Genre</Typography>
                                <Typography noWrap="false" variant="body2" sx={{ textAlign: 'left', width: "90%", fontSize: { xs: "0.6rem", md: "1rem" } }}>{mangaDetail.synopsis}</Typography>
                            </Box>

                            <Box
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

                            </Box>
                        </Box>
                        <Box sx={{ overflow: 'hidden', height: { xs: '10rem', md: '15rem' } }}>
                            <img
                                component="img"
                                height="auto"
                                width="auto"
                                src={'data:image/jpeg;base64,' + buffer}
                                alt={mangaDetail?.title}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '1rem' }}>
                        <a href="#bottom"><Button>Ir al último <ArrowDropDownIcon /></Button></a>
                        <Link to={'/createChapters/' + mangaDetail.id}><Button variant="contained">Agregar Capítulo</Button></Link></Box>
                    <List sx={{ width: '100%', minWidth: "22.5rem", bgcolor: 'background.paper' }}>

                        {mangaDetail.chapters?.map((chapter, index) => (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '50rem' }}>
                                {/* <Button disabled> */}
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={chapter.title} src={'data:image/jpeg;base64,' + _ArrayBufferToBase64(chapter.coverImage)} variant="square" sx={{ width: "6rem", height: "6rem", mr: "1rem" }} />
                                    </ListItemAvatar>
                                    <Box>
                                        <ListItemText
                                            primary={chapter.title}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography variant="body2" color="text.secondary">30 enero, 2022</Typography>
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
                                                </React.Fragment>
                                            }
                                        />
                                        {
                                            user.chapters.includes(chapter.id) ?
                                                <Link to={'/reader/' + chapter.id}> <Button
                                                    variant="contained">Leer</Button></Link> :
                                                <Button value={chapter.id} onClick={handleOpen}>Comprar</Button>
                                        }
                                    </Box>

                                </ListItem>
                            </Box>

                        ))}

                        {/* <Divider variant="inset" component="li" /> */}
                    </List>
                </Container>

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
