import { Link } from 'react-router-dom'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

const MangaCard = ({ id, title, author, image, genre }) => {
    return (
        <div>
            <Link to={'/detail/' + id}>
                <div>
                    <Card sx={{ width: "14rem", maxHeight: "20rem", borderRadius: "1.7rem", mx: "2rem", my: "1rem" }}>
                        <CardMedia
                            component="img"
                            height="200"
                            sx={{ width: "100%" }}
                            src={image}
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
        </div >
    )
}

export default MangaCard;