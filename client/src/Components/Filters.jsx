import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";

import { React, useEffect } from 'react'; // hooks
import { useDispatch, useSelector } from 'react-redux'; // hooks
import { orderMangas, filterMangasByAuthor, filterMangasByGenre, getAllMangas, paginado, getGenres, changeShow } from '../Actions';


const Filters = () => {
    const dispatch = useDispatch()
    let filters = useSelector(state => state.filters)
    let genres = useSelector(state => state.genres)
    let show = useSelector(state => state.show)

    let handleGetAll = (e) => {
        e.preventDefault()
        if(show)dispatch(changeShow())
        dispatch(getAllMangas())
    }

    let handleRecomendation = (e) => {
        e.preventDefault()
        if(!show)dispatch(changeShow())
    }

    let handleOrder = (e) => {
        e.preventDefault()
        if(show)dispatch(changeShow())
        dispatch(orderMangas(e.target.value))
        dispatch(paginado({page: 1, order: e.target.value, genre: filters.genre}))
    }

    let handleFilterAuthor = (e) => {
        e.preventDefault()
        if(show)dispatch(changeShow())
        dispatch(filterMangasByAuthor(e.target.value))
    }

    let handleFilterGenre = (e) => {
        e.preventDefault()
        if(show)dispatch(changeShow())
        dispatch(filterMangasByGenre(e.target.value))
        dispatch(paginado({page: 1, genre: e.target.value, order: filters.order}))
    }

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    const StackContainer = styled(Stack)`
        width: 100%;
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
        scrollbar-width: thin;
        ::-webkit-scrollbar {
            width: 0px;
            background: transparent; /* make scrollbar transparent */
        }
    `

    return (
            <StackContainer sx={{ backgroundColor: '#192A45' }} direction="row" justifyContent='center' alignItems="center" >
                <Button variant="contained" onClick={handleRecomendation} sx={{ color: '#357DED', px:'60px',width: '150px', height: '3.4rem', backgroundColor: '#000', my: '1rem', mx: '1rem', borderRadius: 2 }}>Para Vos</Button>
                <FormControl sx={{  backgroundColor: '#000',width: '150px', my: '1rem', mx: '1rem', borderRadius: 2, px:'60px' }}>
                    <InputLabel id="demo-simple-select-label" sx={{ color: '#357DED', width: '150px' }}>GÉNEROS POPULARES</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Géneros populares"
                        sx={{ color: '#357DED', backgroundColor: '#000' }}
                        onChange={handleFilterGenre}
                    ><MenuItem value={''} sx={{ color: '#357DED' }}>Default</MenuItem>
                        {
                            genres && genres.map((g, i) => <MenuItem key={i} value={g} sx={{ color: '#357DED' }}>{g}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{  backgroundColor: '#000', px:'60px',width: '150px', my: '1rem', mx: '1rem', borderRadius: 2 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ width: '150px',color: '#357DED' }}>AUTORES</InputLabel>
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
                <FormControl sx={{  backgroundColor: '#000', px:'60px', width: '150px', my: '1rem', mx: '1rem', borderRadius: 2 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ color: '#357DED', width: '150px' }}>ORDEN</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Autores"
                        sx={{ color: '#357DED' }}
                        onChange={handleOrder}
                    >
                        <MenuItem value={''} sx={{ color: '#357DED' }}>Default</MenuItem>
                        <MenuItem value={'asc'} sx={{ color: '#357DED' }}>A-Z</MenuItem>
                        <MenuItem value={'desc'} sx={{ color: '#357DED' }}>Z-A</MenuItem>
                        {/* <MenuItem value={'createdAt'} sx={{ color: '#357DED' }}>NUEVOS</MenuItem> */}
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleGetAll} sx={{ color: '#357DED', px:'60px', width: '150px',  height: '3.4rem', backgroundColor: '#000', my: '1rem', mx: '1rem', borderRadius: 2 }}>Todos</Button>
            </StackContainer>

    )
}

export default Filters