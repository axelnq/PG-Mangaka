import React from 'react';
import { Link } from 'react-router-dom'

import { Container, Box, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@mui/material';


export default function AuthorMangas({image, title, id}) {
    


    return(
        <div>
            <Container fixed maxWidth="md">
                <List sx={{ width: '100%', minWidth: "22.5rem", bgcolor: 'background.paper' }}>

                    <Box >

                        <Divider variant="inset" component="li" sx={{ borderColor: "#1850AB" }} />
                        <ListItem >
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={image} variant="square" sx={{ width: "6rem", height: "6rem", mr: "1rem" }} />
                            </ListItemAvatar>
                            <Link to={'/detail/' + id}>
                                <ListItemText primary={title} />
                            </Link>
                            
                        </ListItem>
                        <Divider variant="inset" component="li" sx={{ borderColor: "#1850AB" }}/>

                    </Box>

                </List>
            </Container>
        </div >
    );
}