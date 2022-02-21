import React from 'react';

import { Container, Box, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Link } from '@mui/material';


export default function AuthorMangas({image, title}) {
    


    return(
        <div>
            <Container fixed maxWidth="md">
                <List sx={{ width: '100%', minWidth: "22.5rem", bgcolor: 'background.paper' }}>

                    <Box >

                        <Divider variant="inset" component="li" />
                        <ListItem >
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={image} variant="square" sx={{ width: "6rem", height: "6rem", mr: "1rem" }} />
                            </ListItemAvatar>
                            
                                <ListItemText primary={title} />
                            
                        </ListItem>
                        <Divider variant="inset" component="li" />

                    </Box>

                </List>
            </Container>
        </div >
    );
}