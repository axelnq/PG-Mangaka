import { React } from 'react'
import { Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import Navbar from './Navbar'
import { useSelector } from 'react-redux';

const Biblioteca = () => {
    let user = useSelector(state => state.user)

    return (
       <div>
           <Navbar/>
           <Container maxWidth="sm" sx={{backgroundColor:'#001B44'}}>
                <Typography variant='h3' color='#357DED'>Biblioteca</Typography>
                <List sx={{ width: '100%', maxWidth: 360, color:'#fff'}}>
                    {
                        user.library && user.library.map(m => {
                            return (
                             <ListItem key={m}>
                                <ListItemAvatar>
                                    <Avatar src='' variant="rounded" sx={{ width: 60, height: 60 }}/>
                                </ListItemAvatar>
                                <ListItemText sx={{ mx: '1rem'}}>
                                    <Typography variant='h5'>One Piece</Typography>
                                    <Typography variant='body2'>Eiichirō Oda</Typography>
                                    <Typography variant='body2'>Action, Adventure</Typography>
                                </ListItemText>
                            </ListItem>
                            )
                        })
                    }
                       
                    </List>
            </Container>
       </div> 
    )
}

export default Biblioteca