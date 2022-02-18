import { React } from "react"
import MangaCard from "./MangaCard";

import { ScrollMenu } from "react-horizontal-scrolling-menu";

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";

const Recomendados = ( {mangasRecientes, mangasDestacados, autoresPopulares}) => {
    const StackContainer = styled(Stack)`
        width: 70rem;
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
        scrollbar-width: thin;
        ::-webkit-scrollbar {
            width: 0px;
            background: transparent; /* make scrollbar transparent */
        }
        @media only screen and (max-width: 600px) {
            width: 30rem
          }
    `
    return(
        <Stack direction='column'>
            <Stack direction="column" sx={{ my: '2rem'}}>
                <Typography variant="h5" gutterBottom component="div">Recientes</Typography>
                     <StackContainer direction="row" sx={{ width:'70rem'}} >
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
                    </StackContainer>
                
            </Stack>
            <Stack direction="column" sx={{ my: '2rem'}}>
                <Typography variant="h5" gutterBottom component="div">Destacados</Typography>
                    <StackContainer direction="row" sx={{ width:'65rem'}} >
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
                    </StackContainer>
            </Stack>
            
            <Stack direction="column" sx={{ my: '2rem'}}>
                <Typography variant="h5" gutterBottom component="div">Autores Populares</Typography>
                    <StackContainer direction="row" sx={{ width:'65rem'}} >
                        {
                            
                        }
                    </StackContainer>
            </Stack>
            
        </Stack>
    )
}
export default Recomendados