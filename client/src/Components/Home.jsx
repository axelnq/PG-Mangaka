import { React } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
//components
import Filters from './Filters';
import MangaCard from './MangaCard';
// import Navbar from './Navbar';
// import Banner from './Banner';
//actions
import { getAllMangas } from '../Actions'
import { useEffect } from 'react';
//mui
import { Container } from '@mui/material';

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllMangas())
    }, [dispatch])

    const allMangas = useSelector((state) => state.allMangas)

    return (
        <div>
            <h1>Estas en Home 👍!</h1>
            <Link to='/create'>
                <button>Anda a Crear tu Manga 😎</button>
            </Link>
            <Filters />
            <Container fixed sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                {
                    allMangas.data?.map(m => {
                        console.log(m.authors)
                        return (
                            <div>
                                <MangaCard
                                    id={m.id}
                                    title={m.title}
                                    image={m.images[0]}
                                    author={m.author.name}
                                    genre={m.genre}
                                />
                            </div>
                        )
                    })
                }
            </Container>
        </div>
    )
}

export default Home