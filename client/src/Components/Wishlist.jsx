import { React, useEffect } from 'react'
import { Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, getMangaDetailWishList } from '../Actions';

const Wishlist = () => {
    let user = useSelector(state => state.user)
    let userInfo = useSelector(state=> state.userInfo)
    let {wishlist} = useSelector(state=>state)

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getUserInfo(user.username))
        // dispatch(getMangaDetailWishList())
    }, [dispatch])

    return (
       <div>
           <Navbar/>
           <Container maxWidth="sm" sx={{backgroundColor:'#001B44'}}>
                <Typography variant='h3' color='#357DED'>My Wishlist</Typography>
                <List sx={{ width: '100%', color:'#fff'}}>
                    {
                        userInfo.wishList && userInfo.wishList.map(m => { dispatch(getMangaDetailWishList(m))})
                    }
                    {   wishlist && wishlist.map(m => {
                             return (
                                 <ListItem key={m} sx={{width: '100%',}}>
                                     <ListItemAvatar sx={{ mx: '1rem'}}>
                                     <Avatar src='' variant="rounded" sx={{ width: 65, height: 65 }}/>
                                     </ListItemAvatar>
                                     <ListItemText sx={{mx: '1rem'}}>
                                         <Typography variant='h5'>One Piece</Typography>
                                         <Typography variant='body2'>Eiichirō Oda</Typography>
                                         <Typography variant='body2'>Action, Adventure</Typography>
                                     </ListItemText>
                                     <IconButton sx={{mx: '2rem', color:'#fff'}}>
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