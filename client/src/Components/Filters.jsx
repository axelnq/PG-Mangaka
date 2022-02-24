import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import Container from '@mui/material/Container'

import { React, useEffect, useState, useRef } from 'react'; // hooks
import { useDispatch, useSelector } from 'react-redux'; // hooks
import { orderMangas, filterMangasByAuthor, filterMangasByGenre, getAllMangas, paginado, getGenres, changeShow } from '../Actions';


const Filters = () => {
    const dispatch = useDispatch()
    let filters = useSelector(state => state.filters)
    let genres = useSelector(state => state.genres)
    let orders = ['Default', 'asc', 'desc']
    let authors = ['Default', 'Admin']
    let show = useSelector(state => state.show)

    let handleGetAll = (e) => {
        e.preventDefault()
        if (show) dispatch(changeShow())
        dispatch(getAllMangas())
    }

    let handleRecomendation = (e) => {
        e.preventDefault()
        if (!show) dispatch(changeShow())
    }

    let handleOrder = (option) => {
        if (show) dispatch(changeShow())
        dispatch(orderMangas({ order: option, tag: 'title' }))
        dispatch(paginado({ page: 1, order: option, genre: filters.genre, tag: 'title' }))
    }

    let handleFilterAuthor = (option) => {
        if (show) dispatch(changeShow())
        dispatch(filterMangasByAuthor(option))
    }

    let handleFilterGenre = (option) => {
        if (show) dispatch(changeShow())
        dispatch(filterMangasByGenre(option))
        dispatch(paginado({ page: 1, genre: option, order: filters.order }))
    }

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    const [openGenre, setOpenGenre] = useState(false);
    const [openAuthor, setOpenAuthor] = useState(false)
    const [openOrder, setOpenOrder] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1);


    const handleClickFilterGenre = (event, index, option) => {
        setSelectedIndex(index);
        setOpenGenre(false);
        handleFilterGenre(option)
    };

    const handleClickOrder = (event, index, option) => {
        console.log(event)
        setSelectedIndex(index)
        setOpenOrder(false)
        handleOrder(option)
    }

    const handleClickFilterAuthors = (event, index, option) => {
        setSelectedIndex(index)
        setOpenAuthor(false)
        handleFilterAuthor(option)
    }

    const handleClose = (event) => {
        setOpenGenre(false);
        setOpenOrder(false)
        setOpenAuthor(false)
    };

    const StackContainer = styled(Stack)`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        overflow-x: scroll;
        scrollbar-width: thin;
        ::-webkit-scrollbar {
            width: 0px;
            background: transparent; /* make scrollbar transparent */
        }
    `

    const ContainerStyled = styled(Stack)`
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin-top: .8rem;
        margin: .8rem 1rem 0;
        overflox-x: scroll;
        scrollbar-width: thin;
        z-index: 1;
        ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
        }
    `

    return (
        <StackContainer sx={{ backgroundColor: '#192A45' }}  >
            <ContainerStyled>
                <Button
                    variant="outlined"
                    size='medium'
                    sx={{ backgroundColor: '#357DED', color: '#fff' }}
                    onClick={handleRecomendation}
                >
                    Para Vos
                </Button>
            </ContainerStyled>

            {/* GENEROS */}
            <ContainerStyled>
                <ButtonGroup variant="contained" aria-label="split button">
                    <Button >{genres[selectedIndex]}</Button>
                    <Button
                        size="small"
                        aria-controls={openGenre ? 'split-button-menu' : undefined}
                        aria-expanded={openGenre ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={e => setOpenGenre(true)}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                {
                    openGenre ?
                        <Paper sx={{ position: "absolute", mt: '2rem' }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {genres.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            value={option}
                                            onClick={(event) => handleClickFilterGenre(event, index, option)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper> : null
                }
            </ContainerStyled>

            {/* AUTORES */}
            <ContainerStyled>
                <ButtonGroup variant="contained" aria-label="split button">
                    <Button >{authors[selectedIndex]}</Button>
                    <Button
                        size="small"
                        aria-controls={openAuthor ? 'split-button-menu' : undefined}
                        aria-expanded={openAuthor ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={e => setOpenAuthor(true)}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                {
                    openAuthor ?
                        <Paper sx={{ position: "absolute", mt: '2rem' }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {authors.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            value={option}
                                            onClick={(event) => handleClickFilterAuthors(event, index, option)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper> : null
                }
            </ContainerStyled>
            <ContainerStyled>
                <ButtonGroup variant="contained" aria-label="split button">
                    <Button >{orders[selectedIndex]}</Button>
                    <Button
                        size="small"
                        aria-controls={openOrder ? 'split-button-menu' : undefined}
                        aria-expanded={openOrder ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={e => setOpenOrder(true)}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                {
                    openOrder ?
                        <Paper sx={{ position: "absolute", mt: '2rem' }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {orders.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            value={option}
                                            onClick={(event) => handleClickOrder(event, index, option)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper> : null
                }
            </ContainerStyled>
            <ContainerStyled>
                <Button
                    variant="outlined"
                    size='medium'
                    sx={{ backgroundColor: '#357DED', color: '#fff' }}
                    onClick={handleGetAll}
                >
                    Todos
                </Button>
            </ContainerStyled>

        </StackContainer>
    )
}

export default Filters