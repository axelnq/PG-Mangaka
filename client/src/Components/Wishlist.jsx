import { React, useEffect } from 'react'
import { Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { deleteWishlistManga, getMangaDetailWishList, getWishList } from '../Actions';

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

const Wishlist = () => {
    let wishlist = useSelector(state=>state.wishlist)

    const dispatch = useDispatch()

    let handleDeleteManga = (id) => {
        dispatch(deleteWishlistManga(id))
        dispatch(getWishList())
    }

    useEffect(() => {
        dispatch(getWishList())
        wishlist.map(m => dispatch(getMangaDetailWishList(m)))
    }, [dispatch])


    return (
       <div>
           <Navbar/>
           <Container maxWidth="sm" sx={{backgroundColor:'#001B44'}}>
                <Typography variant='h3' color='#357DED'>My Wishlist</Typography>
                <List sx={{ width: '100%', color:'#fff'}} >
                    { 
                       wishlist && wishlist.data?.map((m, i) => {
                             return (
                                 <ListItem key={i} sx={{width: '100%',}}>
                                    <ListItemAvatar>
                                        <Avatar src={'data:image/jpeg;base64,' + _ArrayBufferToBase64(m.image)} variant="rounded" sx={{ width: 60, height: 60 }}/>
                                    </ListItemAvatar>
                                    <ListItemText sx={{ mx: '1rem'}}>
                                        <Typography variant='h5'>{m.title}</Typography>
                                        <Typography variant='body2'>{m.author.name}</Typography>
                                        <Typography variant='body2'>{m.genre?.join(', ')}</Typography>
                                    </ListItemText>
                                    <IconButton sx={{ mx: '1rem', color: '#fff'}} onClick={e => handleDeleteManga(m.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                 </ListItem>
                             )
                         })
                    }
                    </List>
            </Container>
       </div> 
    )
}

export default Wishlist