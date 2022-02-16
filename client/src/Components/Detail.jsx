import React from 'react';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
//actions
import { getMangaDetail } from '../Actions'
//mui
import { Container, Box, List, ListItem, LinearProgress, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Rating } from '@mui/material';
// components
import Nabvar from './Navbar'

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

const Detail = () => {
    const { id } = useParams()
    console.log(id)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => dispatch(getMangaDetail(id)), 1500)
    }, [dispatch, id])

    const mangaDetail = useSelector((state) => state.mangaDetail.data)
    console.log(mangaDetail)
    let buffer;
    if (mangaDetail && mangaDetail.id == id) {
        buffer = _ArrayBufferToBase64(mangaDetail.image)
    }
    const [valueManga, setValueManga] = React.useState(0);
    const [valueChapter, setValueChapter] = React.useState(0);

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
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: { xs: '4%', md: '10%' }, ml: '1rem', color: "white" }}>
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
                                alt={mangaDetail.title}
                            />
                        </Box>
                    </Box>
                    <List sx={{ width: '100%', minWidth: "22.5rem", bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={mangaDetail.title} src={'data:image/jpeg;base64,' + buffer} variant="square" sx={{ width: "6rem", height: "6rem", mr: "1rem" }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={mangaDetail.chapters[0]?.title}
                                secondary={
                                    <React.Fragment>
                                        <Typography variant="body2" color="text.secondary">30 enero, 2022</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                            <Typography variant="body2" color="text.secondary">Score: 87%</Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex', justifyContent: 'flex-end', mt: '0.5rem'
                                                }}
                                            >
                                                <Rating
                                                    name="simple-controlled"
                                                    value={valueChapter}
                                                    onChange={(event, newValue) => {
                                                        setValueChapter(newValue);
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={mangaDetail.title} src={'data:image/jpeg;base64,' + buffer} variant="square" sx={{ width: "6rem", height: "6rem", mr: "1rem" }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={mangaDetail.chapters[1]?.title}
                                secondary={
                                    <React.Fragment>
                                        <Typography variant="body2" color="text.secondary">30 enero, 2022</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                            <Typography variant="body2" color="text.secondary">Score: 87%</Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex', justifyContent: 'flex-end', mt: '0.5rem'
                                                }}
                                            >
                                                <Rating
                                                    name="simple-controlled"
                                                    value={valueChapter}
                                                    onChange={(event, newValue) => {
                                                        setValueChapter(newValue);
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </Container>

                : <LinearProgress sx={{ height: '0.5rem ' }} />
            }
        </div >
    )
}

export default Detail
