import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { React, useEffect } from 'react'; // hooks
import { useDispatch, useSelector } from 'react-redux'; // hooks
import { orderMangas, filterMangasByAuthor, filterMangasByGenre, getAllMangas, recomendatedMangas, paginado, getGenres } from '../Actions';
import Button from '@mui/material/Button';
import { useSelect } from '@mui/base';

const Filters = () => {
    const dispatch = useDispatch()
    let filters = useSelector(state => state.filters)
    let genres = useSelector(state => state.genres)

    let handleGetAll = (e) => {
        e.preventDefault()
        dispatch(getAllMangas())
    }

    let handleRecomendation = (e) => {
        e.preventDefault()
        dispatch(recomendatedMangas())
    }

    let handleOrder = (e) => {
        e.preventDefault()
        dispatch(orderMangas(e.target.value))
        dispatch(paginado({page: 1, order: e.target.value, genre: filters.genre}))
    }

    let handleFilterAuthor = (e) => {
        e.preventDefault()
        dispatch(filterMangasByAuthor(e.target.value))
    }

    let handleFilterGenre = (e) => {
        e.preventDefault()
        dispatch(filterMangasByGenre(e.target.value))
        dispatch(paginado({page: 1, genre: e.target.value, order: filters.order}))
    }

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    return (
        <div>
            <Box sx={{ backgroundColor: '#192A45' }}>
                <Button variant="contained" onClick={handleRecomendation} sx={{ color: '#357DED', width: '15%', height: '3.4rem', backgroundColor: '#000', my: '1rem', mx: '2rem', borderRadius: 2 }}>Recomendaciones</Button>
                <FormControl sx={{ width: '15%', backgroundColor: '#000', my: '1rem', mx: '2rem', borderRadius: 2 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ color: '#357DED' }}>GÉNEROS POPULARES</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Géneros populares"
                        sx={{ color: '#357DED', backgroundColor: '#000' }}
                        onChange={handleFilterGenre}
                    >
                        {
                            genres && genres.map((g, i) => <MenuItem key={i} value={g} sx={{ color: '#357DED' }}>{g}</MenuItem>)
                        }
                        {/* <MenuItem value={''} sx={{ color: '#357DED' }}></MenuItem>
                        <MenuItem value={'Action'} sx={{ color: '#357DED' }}>ACCIÓN</MenuItem>
                        <MenuItem value={'Comedy'} sx={{ color: '#357DED' }}>COMEDIA</MenuItem>
                        <MenuItem value={'Supernatural'} sx={{ color: '#357DED' }}>SUPERNATURAL</MenuItem>
                        <MenuItem value={'Drama'} sx={{ color: '#357DED' }}>DRAMA</MenuItem>
                        <MenuItem value={'Romance'} sx={{ color: '#357DED' }}>ROMANCE</MenuItem>
                        <MenuItem value={'Sci-Fi'} sx={{ color: '#357DED' }}>SCI-FI</MenuItem>
                        <MenuItem value={'Slice of Life'} sx={{ color: '#357DED' }}>SLICE OF LIFE</MenuItem>
                        <MenuItem value={'Sports'} sx={{ color: '#357DED' }}>DEPORTE</MenuItem>
                        <MenuItem value={'Mystery'} sx={{ color: '#357DED' }}>MISTERIO</MenuItem>
                        <MenuItem value={'Ecchi'} sx={{ color: '#357DED' }}>ECCHI</MenuItem>
                        <MenuItem value={'Fantasy'} sx={{ color: '#357DED' }}>FANTASIA</MenuItem>
                        <MenuItem value={'Adventure'} sx={{ color: '#357DED' }}>AVENTURA</MenuItem> */}
                    </Select>
                </FormControl>
                <FormControl sx={{ width: '15%', backgroundColor: '#000', my: '1rem', mx: '2rem', borderRadius: 2 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ color: '#357DED' }}>AUTORES</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Autores"
                        sx={{ color: '#357DED' }}
                        onChange={handleFilterAuthor}
                    >
                        <MenuItem value={''} sx={{ color: '#357DED' }}></MenuItem>
                        <MenuItem value={'Admin'} sx={{ color: '#357DED' }}>ADMIN</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ width: '15%', backgroundColor: '#000', my: '1rem', mx: '2rem', borderRadius: 2 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ color: '#357DED' }}>ORDEN</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Autores"
                        sx={{ color: '#357DED' }}
                        onChange={handleOrder}
                    >
                        <MenuItem value={''} sx={{ color: '#357DED' }}></MenuItem>
                        <MenuItem value={'asc'} sx={{ color: '#357DED' }}>A-Z</MenuItem>
                        <MenuItem value={'desc'} sx={{ color: '#357DED' }}>Z-A</MenuItem>
                        {/* <MenuItem value={'createdAt'} sx={{ color: '#357DED' }}>NUEVOS</MenuItem> */}
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleGetAll} sx={{ color: '#357DED', width: '15%', height: '3.4rem', backgroundColor: '#000', my: '1rem', mx: '2rem', borderRadius: 2 }}>Todos</Button>
            </Box>
        </div>

    )
}

export default Filters