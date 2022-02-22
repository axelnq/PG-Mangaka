import React from 'react';
import {Link, useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Container, Box, Typography, Avatar, Input, Modal, Button, Divider, ListItem, ListItemAvatar, ListItemText, FormControl} from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import SendIcon from '@mui/icons-material/Send';

import { createComment, verComentarios } from '../Actions';


const _ArrayBufferToBase64 = (buffer) => {
    //console.log(buffer)
    if(buffer === undefined) return '';
    var binary = '';
    var byte = new Uint8Array(buffer.data);
    var length = byte.byteLength;

    for(var i = 0; i < length ;i++) {
        binary += String.fromCharCode(byte[i])
    }
    return window.btoa(binary)
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #1850AB',
    boxShadow: 15,
    p: 4,
  };


export default function Comentarios({idChapter} ) {
    

    const dispatch = useDispatch()
    const {id} = useParams()


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    const [input, setInput] = useState({
        comment:'',
        idChapter:''
    });

    useEffect(() => {
        dispatch(verComentarios(id))
        
    },[dispatch, id])

    const AllComments = useSelector(state => state.allComments)

    function handleChange(e) {
        
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        
    };

    function handleSubmit(e) {
        
        e.preventDefault();
    
        
        dispatch(createComment(input))
        setInput({
            comment:'',
            idChapter:''
        })
    
    }




    return (
        <div>
            <Container>
                <Box >
                    
                    
                        <Box  mb='1rem' sx={{display:'flex', justifyContent:"flex-end" }}>
                            <Button
                                onClick={handleOpen}
                                sx={{ 
                                    bgcolor: '#192A45',  
                                    borderRadius: '50%',        
                                    height: 4 +'rem',
                                }}
                            >
                                <AddCommentIcon color="#5A92ED" fontSize="large" />
                            </Button>
                        </Box>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                        >
                            <Box sx={style}>                           
                                <FormControl 
                                    component="form"
                                    onSubmit={e => handleSubmit(e)}
                                    width='100%'
                                >

                                    <Box  sx={{display:'flex', justifyContent:"center"}}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" >
                                        Ingresa tu Comentario
                                    </Typography>
                                    </Box>

                                    
                                        <Input
                                            id="outlined-textarea"
                                            type='text'
                                            label="Multiline Placeholder"
                                            placeholder="Placeholder"
                                            multiline
                                            rows={5}   
                                            name='comment'  
                                            value={input.comment}                                      
                                            onChange={handleChange}                                             
                                            
                                        />
                                    
                                    

                                    <Box sx={{display:'flex', justifyContent:"flex-end"}}>
                                        <Button
                                            type="submit"
                                        >
                                            <SendIcon color="#5A92ED" fontSize="large"  />
                                        </Button>
                                    </Box>
                                    
                                
                                </FormControl>
                            </Box> 
                        </Modal>

                    

                    <Box>
                        {   
                            AllComments?.map((c) => {
                                console.log(c,'c')
                                return (
                                    <div>

                                        <Divider variant="inset" sx={{ borderColor: "#1850AB" }} />
                                        <ListItem alignItems="flex-start">
            
                                            <ListItemAvatar>
                                                <Avatar 
                                                    src={'data:image/jpeg;base64,' + _ArrayBufferToBase64(c.userAvatar.avatar)}
                                                    />
                                            </ListItemAvatar>
            
                                            <ListItemText
                                                primary={c.username}
                                                
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography variant="body2" color="text.secondary"> {c.commentUser} </Typography>
            
                                                    </React.Fragment>
                                                }
                                                />
            
                                        </ListItem>
                                        <Divider variant="inset" sx={{ borderColor: "#1850AB" }} />
                                    </div>
                                )
                            })

                        }
                    
                    </Box>
                
                </Box>
            </Container>
        </div>
    )
}