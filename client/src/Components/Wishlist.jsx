import { React, useEffect } from 'react'
import { Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, getMangaDetailWishList } from '../Actions';

const Wishlist = () => {
    let user = useSelector(state => state.user)
    let wishlist = useSelector(state=>state.wishlist)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserInfo(user.username))
        user.wishList.map(m => dispatch(getMangaDetailWishList(m)))
    }, [])

    return (
       <div>
           <Navbar/>
           <Container maxWidth="sm" sx={{backgroundColor:'#001B44'}}>
                <Typography variant='h3' color='#357DED'>My Wishlist</Typography>
                <List sx={{ width: '100%', color:'#fff'}} >
                    { 
                       wishlist && wishlist.map((m, i) => {
                             return (
                                 <ListItem key={i} sx={{width: '100%',}}>
                                    <ListItemAvatar>
                                        <Avatar src='' variant="rounded" sx={{ width: 60, height: 60 }}/>
                                    </ListItemAvatar>
                                    <ListItemText sx={{ mx: '1rem'}}>
                                        <Typography variant='h5'>{m.data.title}</Typography>
                                        <Typography variant='body2'>{m.data.author.name}</Typography>
                                        <Typography variant='body2'>{m.genre?.join(', ')}</Typography>
                                    </ListItemText>
                                    <IconButton sx={{ mx: '1rem', color: '#fff'}}>
                                        <DeleteIcon/>
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