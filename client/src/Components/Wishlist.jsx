import { React, useEffect, useState } from 'react'
import { Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { deleteWishlistManga, getMangaDetailWishList, getWishList } from '../Actions';


const Wishlist = () => {
    let wishlist = useSelector(state=>state.wishlist)
    let [id, setId] = useState({ mangaId: 0 })

    const dispatch = useDispatch()

    let handleDeleteManga = (e, mangaId) => {
        setId({ mangaId: mangaId })
        if(id !== { mangaId: 0}) {
            dispatch(deleteWishlistManga(id))
            dispatch(getWishList())
        }
    }

    useEffect(() => {
        dispatch(getWishList())
        wishlist.map(m => dispatch(getMangaDetailWishList(m)))
    }, [])


    return (
       <div>
           <Navbar/>
           <Container maxWidth="sm" sx={{backgroundColor:'#001B44'}}>
                <Typography variant='h3' color='#357DED'>My Wishlist</Typography>
                <List sx={{ width: '100%', color:'#fff'}} >
                    { 
                       wishlist && wishlist.data?.map((m, i) => {
                           console.log(m)
                             return (
                                 <ListItem key={i} sx={{width: '100%',}}>
                                    <ListItemAvatar>
                                        <Avatar src='' variant="rounded" sx={{ width: 60, height: 60 }}/>
                                    </ListItemAvatar>
                                    <ListItemText sx={{ mx: '1rem'}}>
                                        <Typography variant='h5'>{m.title}</Typography>
                                        <Typography variant='body2'>{m.author.name}</Typography>
                                        <Typography variant='body2'>{m.genre?.join(', ')}</Typography>
                                    </ListItemText>
                                    <IconButton sx={{ mx: '1rem', color: '#fff'}} onClick={e => handleDeleteManga(e, m.id)}>
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