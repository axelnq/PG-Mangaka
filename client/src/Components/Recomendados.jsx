import { React } from "react"
import MangaCard from "./MangaCard";
import CardAuthor from "./CardAuthor"

import { Typography, LinearProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";

const Recomendados = ( {mangasRecientes, mangasDestacados, autoresPopulares}) => {
    const StackContainer = styled(Stack)`
        width: 100%;
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
        scrollbar-width: thin;
        ::-webkit-scrollbar {
            width: 0px;
            background: transparent; /* make scrollbar transparent */
        }@media only screen and (max-width: 400px) {
            width: 100%
        }
        
    `
    return(
        <Stack direction='column' sx={{width: '100%'}}> 
            <Typography variant="h5" gutterBottom component="div" sx={{my:'1rem'}}>Recientes</Typography>
            <StackContainer direction="column" sx={{ my: '1rem'}} id='recientes'>
                     <Stack direction="row"  >
                        { 
                            mangasRecientes.data ? mangasRecientes.data?.map((m, i) => {
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
                            }) : 
                            <LinearProgress sx={{ height: '0.5rem ' }}/>
                        }
                    </Stack>
                
            </StackContainer> 
            <Typography variant="h5" gutterBottom component="div" sx={{my:'1rem'}}>Destacados</Typography>
            <StackContainer direction="column" sx={{ my: '1rem'}} id='destacados'>
               
                    <Stack direction="row" sx={{ width:'70rem'}} >
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
            </StackContainer>
            <Typography variant="h5" gutterBottom component="div" sx={{my:'1rem'}}>Autores Populares</Typography>
            <StackContainer direction="column" sx={{ my: '1rem'}}>
                
                    <Stack direction="row" sx={{ width:'70rem'}} >
                        {
                            autoresPopulares.data && autoresPopulares.data.map(m => {
                                
                                return (
                                    <div key={m.id}>
                                       <CardAuthor image={m.avatar} name={m.name} id={m.id}/> 
                                    </div>
                                )
                            })
                        }
                    </Stack>
            </StackContainer>
            
        </Stack>
    )
}
export default Recomendados