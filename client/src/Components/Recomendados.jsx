import { React } from "react"
import MangaCard from "./MangaCard";

import { ScrollMenu } from "react-horizontal-scrolling-menu";

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';

const Recomendados = ( {mangasRecientes, mangasDestacados, autoresPopulares}) => {
    const style = { display: `none`, overflow: `hidden` }
    return(
        <Stack direction='column'>
            <Stack direction="column" sx={{ my: '2rem'}}>
                <Typography variant="h5" gutterBottom component="div">Recientes</Typography>
                 <ScrollMenu style={style}>
                     <Stack direction="row" sx={{ width:'70rem'}}>
                        { 
                            // console.log('recientes', mangasRecientes)
                            mangasRecientes && mangasRecientes.data?.map((m, i) => {
                                return (
                                    <div key={i} >
                                        <MangaCard
                                            id={m.id}
                                            title={m.title}
                                            image={m.image}
                                            author={m.author?.name}
                                            genre={m.genre}
                                        />
                                    </div>
                                )
                            })
                        }
                    </Stack>
                 </ScrollMenu>
                
            </Stack>
            <Stack direction="column" sx={{ my: '2rem'}}>
                <Typography variant="h5" gutterBottom component="div">Destacados</Typography>
                <ScrollMenu style={style}>
                    <Stack direction="row" sx={{ width:'65rem'}}>
                        {
                            // console.log('destacados', mangasDestacados)
                            mangasDestacados && mangasDestacados.data?.map((m, i) => {
                                return (
                                    <Stack key={i} direction="row" spacing={2}>
                                        <MangaCard
                                            id={m.id}
                                            title={m.title}
                                            image={m.image}
                                            author={m.author?.name}
                                            genre={m.genre}
                                        />
                                    </Stack>
                                )
                            })
                        }
                    </Stack>
                </ScrollMenu>
            </Stack>
            
            <Stack direction="column" sx={{ my: '2rem'}}>
                <Typography variant="h5" gutterBottom component="div">Autores Populares</Typography>
                <ScrollMenu style={style}>
                    <Stack direction="row" sx={{ width:'65rem'}}>
                        {
                            
                        }
                    </Stack>
                </ScrollMenu>
            </Stack>
            
        </Stack>
    )
}
export default Recomendados