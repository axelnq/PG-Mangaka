import { React } from 'react'
import { Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Navbar from './Navbar'
import { useSelector } from 'react-redux';

const Wishlist = () => {
    let wishlist = useSelector(state=> state.wishlist)
    return (
       <div>
           <Navbar/>
           <Container maxWidth="sm" sx={{backgroundColor:'#001B44'}}>
                <Typography variant='h3' color='#357DED'>My Wishlist</Typography>
                <List sx={{ width: '100%', color:'#fff'}}>
                    {/* {
                        wishlist && wishlist.map(m, i => {
                            return (
                                <ListItem key={i} sx={{width: '100%',}}>
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
                    } */}
                        
                    </List>
            </Container>
       </div> 
    )
}

export default Wishlist