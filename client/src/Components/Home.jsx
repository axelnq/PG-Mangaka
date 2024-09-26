import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//components
import Filters from './Filters';
import MangaCard from './MangaCard';
import Navbar from './Navbar';
import Banner from './Banner';
import Paginado from './Paginado'
//actions
import { getAllMangas, popularAuthors, getPopularMangas, getRecentMangas } from '../Actions'
import { useEffect } from 'react';
//mui
import { Container } from '@mui/material';
import Recomendados from './Recomendados';

const Home = () => {
    const dispatch = useDispatch();

    const allMangas = useSelector((state) => state.allMangas)
    const recentMangas = useSelector(state => state.recentMangas)
    const popularMangas = useSelector(state=>state.popularMangas)
    const authors = useSelector(state => state.authors)
    const show = useSelector(state=>state.show)

    useEffect(() => {
        dispatch(getAllMangas())
        dispatch(getRecentMangas())
        dispatch(getPopularMangas())
        dispatch(popularAuthors())
    }, [dispatch])

    


    return (
        <div>
            <Navbar/>
            <Banner/>
            <Filters />
            {   
                show ?
                <Container fixed sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <Recomendados mangasRecientes={recentMangas} mangasDestacados={popularMangas} autoresPopulares={authors}/>
                </Container> 
            :
                <div>
                    <Paginado total={allMangas.total}/>
                    <Container fixed sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                 
                    {
                        allMangas.data?.map((m, i) => {
                            //console.log(m)
                            return (
                                <div key={i}>
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
                    </Container>
                </div>
                
            }
            
            
            
        </div>
    )
}

export default Home