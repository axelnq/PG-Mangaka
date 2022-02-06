import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { postManga, getAllMangas } from '../Actions/index';


export default function CreateForm() {
  const dispatch = useDispatch();
  const generos = useSelector((state) => state.allMangas);

  const [input, setInput] = useState({
    title: '',
    synopsis: '',
    images: [],
    genres: [],
  

  });

  function handleChange(e){
    console.log(e.target.value)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    }); 
  }
  
  function handleSelect(e) {
    console.log(e.target.value)
    setInput({
        ...input,
        genres: [...input.genres, e.target.value],

    });
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    
    const {title, synopsis,images,genres} = input;
    
    if (title === undefined || title.length < 3) {
      return alert ('titulo invalido')
    } else if(synopsis === undefined || synopsis.length < 30) {
      return alert ('synpsis minima 30 caracteres')
    } else if (images === undefined) {
      return alert('ingrese imagen valida')
    } else if (genres === undefined) {
      return alert('seleccione genero')
    }

    //id de autor jarcodeado para poder crear manga,cambiar el id cada vez que se cree una nueva manga"
    input.authorId =  "f93e8fcd-fc26-44b4-9999-01ea6935854b"
    dispatch(postManga(input));
    alert('Manga creada');
    setInput({
      title:'',
      synopsis:'',
      images:[],
      genres:[],
    });

  }
  function handleDelete(el) {
    setInput({
      ...input,
        genre: input.genre.filter((generos) => generos !== el),
      });
  }
  
  useEffect(() =>{
    dispatch(getAllMangas());
  },[dispatch])

  return (
    <Box
      paddingTop={'8%'}
      sx={{ display: 'flex' }}
      sx={{ mt: '15%' }}
      sx={{ md: { xs: '20%', md: '40%', lg: '100%' } }}>
      <div>
        <FormControl onSubmit={(e) => handleSubmit(e)}
          sx={{
            width: 300,
            height: 400,
            borderRadius: '5px',
            backgroundColor: '#192A45',
            color: '#357DED',
          }}>
          <h1 >CREA TU MANGA</h1>
          <label>TITLE :</label>
          <div>
            <input
              type="text"
              value={input.title}
              name="title"
            onChange={(e) => handleChange(e)}

            />
          </div>
          <Box sx={{ mt: '1rem' }}>
            <label >SYNOPSIS :</label>
            <div>
              <input
                type="text"
                value={input.synopsis}
                name="synopsis"
              onChange={(e) => handleChange(e)}
              />

            </div>
          </Box>
          <Box sx={{ mt: '1rem' }}>
            <label>IMAGEN :</label>
            <div>
              <input
                type='text'
                value={input.images}
                name="images"
              onChange={(e) => handleChange(e)}
              />
            </div>
          </Box>
          <Box sx={{ mt: '1rem' }}>
            <label>GENERO :</label>
            <div>
              <select  onChange={(e) => handleSelect(e)}>
                <option value="Action">Acción</option>
                <option value="Adventure">Aventura</option>
                <option value="Comedy">Comedia</option>
                <option value="Drama">Drama</option>
                <option value="Ecchi">Ecchi</option>
                <option value="Fantasy">Fantasía</option>
                <option value="Mistery">Misterio</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Ciencia Ficción</option>
                <option value="Slice of Life">Historia de Vida</option>
                <option value="Supernatural">Sobrenatural</option>
                <option value="Sports">Deporte</option>
              </select>
            </div>
          </Box>
          <div>
            <Box sx={{ width: '100%', py: '1rem' }}>
              <Button onClick={(e) => handleSubmit(e)} size="small"  variant="contained">Crear Manga</Button></Box>
            <Box sx={{ width: '100%', py: '0.2rem' }}>
              <NavLink to="/">
              <Button>Home</Button>
              </NavLink>
              </Box>
          </div>
        </FormControl>
      </div>
    </Box>
  )
}

