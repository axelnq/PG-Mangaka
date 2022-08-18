import { Link } from 'react-router-dom'
import { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const _ArrayBufferToBase64 = (buffer) => {
    //console.log(buffer)
    var binary = '';
    var byte = new Uint8Array(buffer.data);
    var length = byte.byteLength;

    for(var i = 0; i < length ;i++) {
        binary += String.fromCharCode(byte[i])
    }
    return window.btoa(binary)
}


const MangaCard = ({ id, title, author, image, genre }) => {
    let buffer = _ArrayBufferToBase64 (image)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const [flag, setFlag] = useState(false)

    function handleLogin(e) {
        e.preventDefault();
        if(user) navigate('/detail/'+id)
        else{
            setFlag(true)
            setTimeout(() => setFlag(false), 5000)
            }
    };
    
    return (
        <div>
            <Link to={'/detail/' + id} onClick={handleLogin} >
                <div>
                    <Card sx={{ width: "14rem", maxHeight: "20rem", borderRadius: "1.7rem", mx: "2rem", my: "1rem" }}>
                        <CardMedia
                            component="img"
                            height="200"
                            sx={{ width: "100%" }}
                            src={'data:image/jpeg;base64,' + buffer}
                            alt={title}
                        />
                        <CardContent sx={{ py: "0.5rem", }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', pb: "1rem" }}>
                                <Typography gutterBottom variant="h6" sx={{ fontSize: "1rem" }} component="div">
                                    {title}
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: "0.8rem" }} color="text.secondary">
                                    {author}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ fontSize: "0.6rem" }} color="text.secondary">
                                {genre.join(', ')}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </Link>
            { flag ? <Alert severity="error">Debes estar logueado para acceder</Alert> : null}
        </div >
    )
}

export default MangaCard;