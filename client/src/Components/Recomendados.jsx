import { React } from "react"
import MangaCard from "./MangaCard";

import { ScrollMenu } from "react-horizontal-scrolling-menu";

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const Recomendados = ( {mangasRecientes, mangasDestacados, autoresPopulares}) => {
    const style = { width: '70rem', overflowX: 'scroll', scrollbarColor: 'rebeccapurple green', scrollbarWidth: 'thin' }
    return(
        <Stack direction='column'>
            <Stack direction="column" sx={{ my: '2rem'}}>
                <Typography variant="h5" gutterBottom component="div">Recientes</Typography>
                     <Stack direction="row" sx={{ width:'70rem'}} style={style}>
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
                
            </Stack>
            <Stack direction="column" sx={{ my: '2rem'}}>
                <Typography variant="h5" gutterBottom component="div">Destacados</Typography>
                    <Stack direction="row" sx={{ width:'65rem'}} style={style}>
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
            </Stack>
            
            <Stack direction="column" sx={{ my: '2rem'}}>
                <Typography variant="h5" gutterBottom component="div">Autores Populares</Typography>
                    <Stack direction="row" sx={{ width:'65rem'}} style={style}>
                        {
                            
                        }
                    </Stack>
            </Stack>
            
        </Stack>
    )
}
export default Recomendados