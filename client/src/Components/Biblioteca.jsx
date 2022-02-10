import { React } from 'react'
import { Container, Typography, List, ListItem, ListItemAvatar, Avatar, ImageIcon, ListItemText } from '@mui/material';
import Navbar from './Navbar'

const Biblioteca = () => {
    return (
       <div>
           <Navbar/>
           <Container maxWidth="sm" sx={{backgroundColor:'#001B44'}}>
                <Typography variant='h3' color='#357DED'>Biblioteca</Typography>
                <List sx={{ width: '100%', maxWidth: 360, color:'#fff'}}>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar src='' variant="rounded" sx={{ width: 60, height: 60 }}/>
                            </ListItemAvatar>
                            <ListItemText sx={{ mx: '1rem'}}>
                                <Typography variant='h5'>One Piece</Typography>
                                <Typography variant='body2'>Eiichirō Oda</Typography>
                                <Typography variant='body2'>Action, Adventure</Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
            </Container>
       </div> 
    )
}

export default Biblioteca