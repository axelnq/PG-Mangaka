import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { React } from 'react'; // hooks
import { useDispatch } from 'react-redux'; // hooks
import { orderMangas, filterMangasByAuthor, filterMangasByGenre } from '../Actions';

const Filters = () => {
    const dispatch = useDispatch()
    // let [order, setOrder] = useState('')
    // let [author, setAuthor] = useState('')
    // let [genre, setGenre] = useState('')

    let handleOrder = (e) => {
        e.preventDefault()
        dispatch(orderMangas(e.target.value))
    }

    let handleFilterAuthor = (e) => {
        e.preventDefault()
        dispatch(filterMangasByAuthor(e.target.value))

    }

    let handleFilterGenre = (e) => {
        e.preventDefault()
        dispatch(filterMangasByGenre(e.target.value))
    }

    return (
        // <div id='heather'>
        //     <ul class='nav'>
        //         <li>
        //         <p>Géneros populares</p>
        //         <ul>
        //             <li><a href='#comedia'>Comedia</a></li>
        //             <li><a href='#romance'>Romance</a></li>
        //             <li><a href='#aventura'>Aventura</a></li>
        //             <li><a href='#drama'>Drama</a></li>
        //             <li><a href='#supernatural'>Supernatural</a></li>
        //         </ul>
        //         </li>
        //         <li>
        //         <a href='#tendencias'>Tendencias</a>
        //         </li>
        //         <li>
        //         <p>Autores</p>
        //         <ul>
        //             <li><a href='#aster-noriko'>Aster Noriko</a></li>
        //             <li><a href='#daichi-matsuse'>Daichi Matsuse</a></li>
        //             <li><a href='#fumino-hayashi'>Fumino Hayashi</a></li>
        //             <li><a href='#gato aso'>Gato Aso</a></li>
        //             <li><a href='#katsu aki'>Katsu Aki</a></li>
        //             <li><a href='#kyo shirodaira'>Kyo Shirodaira</a></li>
        //             <li><a href='#mitsuba takanashi'>Mitsuba Takanashi</a></li>
        //         </ul>
        //         </li>
        //         <li>
        //         <p>Order</p>
        //         <ul>
        //             <li><a href='#a-z'>A-Z</a></li>
        //             <li><a href='#z-a'>Z-A</a></li>
        //             <li><a href='#nuevos-lanzamientos'>Nuevos lanzamientos</a></li>
        //         </ul>  
        //         </li>
        //     </ul>
        // </div>
        <div>
            <Box sx={{ backgroundColor: '#192A45' }}>
                <FormControl sx={{ width: '25%', backgroundColor: '#000', my: '1rem', mx: '2rem', borderRadius: 2 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ color: '#357DED' }}>Géneros populares</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Géneros populares"
                        sx={{ color: '#357DED', backgroundColor: '#000' }}
                        onChange={handleFilterGenre}
                    >
                        <MenuItem value='' sx={{ color: '#357DED' }}></MenuItem>
                        <MenuItem value={'comedy'} sx={{ color: '#357DED' }}>Comedia</MenuItem>
                        <MenuItem value={'drama'} sx={{ color: '#357DED' }}>Drama</MenuItem>
                        <MenuItem value={'romance'} sx={{ color: '#357DED' }}>Romance</MenuItem>
                        <MenuItem value={'thriller'} sx={{ color: '#357DED' }}>Thriller</MenuItem>
                        <MenuItem value={'horror'} sx={{ color: '#357DED' }}>Horror</MenuItem>
                        <MenuItem value={'fantasy'} sx={{ color: '#357DED' }}>Fantasia</MenuItem>
                        <MenuItem value={'adventure'} sx={{ color: '#357DED' }}>Aventura</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ width: '25%', backgroundColor: '#000', my: '1rem', mx: '2rem', borderRadius: 2 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ color: '#357DED' }}>Autores</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Autores"
                        sx={{ color: '#357DED' }}
                        onChange={handleFilterAuthor}
                    >
                        <MenuItem value='' sx={{ color: '#357DED' }}></MenuItem>
                        <MenuItem value={'aster-noriko'} sx={{ color: '#357DED' }}>Aster Noriko</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ width: '25%', backgroundColor: '#000', my: '1rem', mx: '2rem', borderRadius: 2 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ color: '#357DED' }}>Orden</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Autores"
                        sx={{ color: '#357DED' }}
                        onChange={handleOrder}
                    >
                        <MenuItem value='' sx={{ color: '#357DED' }}></MenuItem>
                        <MenuItem value={'asc'} sx={{ color: '#357DED' }}>A-Z</MenuItem>
                        <MenuItem value={'desc'} sx={{ color: '#357DED' }}>Z-A</MenuItem>
                        <MenuItem value={'nuevos'} sx={{ color: '#357DED' }}>Nuevos</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>

    )
}

export default Filters