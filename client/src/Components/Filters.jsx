import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl'
import { styled } from "@mui/material/styles";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';

import { React, useEffect, useState, useRef } from 'react'; // hooks
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

    let handleFilterGenre = (option) => {
        if(show)dispatch(changeShow())
        dispatch(filterMangasByGenre(option))
        dispatch(paginado({page: 1, genre:option, order: filters.order}))
    }



    useEffect(() => {
        dispatch(getGenres())
    }, [])
    
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1);

    
      const handleClickFilterGenre = (event, index, option) => {
        setSelectedIndex(index);
        setOpen(false);
        handleFilterGenre(option)
      };
    
      const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
    
      const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
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
        }@media only screen and (max-width: 400px) {
            width: 100%
        }
    `
    const Buttons = styled(Button)`
        margin: 1rem;
        padding: 1rem;
        background-color:#357DED;
        color:#fff;
    `
    const SelectContainer = styled(FormControl)`
        margin: 1rem;
        background-color: #357DED;
        border-radius:10%;
        heigth: 1rem;
        label {
            color:#fff;
            padding: 0 1rem;
        } 
        div {
            
            margin: 0 1.5rem;
            padding: 0 1.5rem;
            
            div {

            }
            input {
            }
        }
    `

    return (
            <StackContainer sx={{ backgroundColor: '#192A45' }}  >
                <Buttons 
                    variant="outlined"
                    onClick={handleRecomendation} 
                >
                    Para Vos
                </Buttons>
                {/* GENEROS */}
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button >{genres[selectedIndex]}</Button>
                    <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    >
                    <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                        transformOrigin:
                            placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
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
                        </Paper>
                    </Grow>
                    )}
                </Popper>
                {/* AUTORES */}
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button >Admin</Button>
                    <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    >
                    <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                        transformOrigin:
                            placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu">
                                <MenuItem
                                value=''
                                onClick={(event) => handleFilterAuthor(event)}
                                >''
                                </MenuItem>
                                <MenuItem
                                value='Admin'
                                onClick={(event) => handleFilterAuthor(event)}
                                >'Admin'
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
                {/* <SelectContainer sx={{mx:'1rem'}} variant="standard">
                    <InputLabel 
                       id="demo-customized-select-label"
                    >
                        AUTORES
                    </InputLabel>
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        label="Autores"
                        onChange={handleFilterAuthor}
                    >
                        <MenuItem value={''} ></MenuItem>
                        <MenuItem value={'Admin'} >ADMIN</MenuItem>
                    </Select>
                </SelectContainer> */}
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button >Admin</Button>
                    <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    >
                    <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                        transformOrigin:
                            placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu">
                                <MenuItem
                                value=''
                                onClick={(event) => handleOrder(event)}
                                >''
                                </MenuItem>
                                <MenuItem
                                value='Admin'
                                onClick={(event) => handleOrder(event)}
                                >'A-Z'
                                </MenuItem>
                                <MenuItem
                                value='Admin'
                                onClick={(event) => handleOrder(event)}
                                >'Z-A'
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
                {/* <SelectContainer sx={{mx:'1rem'}} variant="standard">
                    <InputLabel 
                        id="demo-customized-select-label"
                    >
                        ORDEN
                    </InputLabel>
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        label="Autores"
                        onChange={handleOrder}
                    >
                        <MenuItem value={''} >Default</MenuItem>
                        <MenuItem value={'asc'} >A-Z</MenuItem>
                        <MenuItem value={'desc'} >Z-A</MenuItem>
                    </Select>
                </SelectContainer> */}
                <Buttons 
                    variant="outlined"
                    onClick={handleGetAll} 
                >
                    Todos
                </Buttons>
            </StackContainer>

    )
}

export default Filters