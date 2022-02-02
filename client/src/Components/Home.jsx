import { React } from 'react';
import { Link } from 'react-router-dom'
import Filters from './Filters';
import Card from './MangaCard';
import Navbar from './Navbar';
import Banner from './Banner';

const Home = () => {
    return (
        <div>
            <h1>Estas en Home 👍!</h1>
            <Link to='/create'>
                <button>Anda a Crear tu Manga 😎</button>
            </Link>
            <Filters/>
            <Card/>
        </div>
    )
}

export default Home