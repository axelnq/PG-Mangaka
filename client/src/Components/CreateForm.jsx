import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button ,Select,MenuItem , Input} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { postManga, getAllMangas, getGenres } from '../Actions/index';
import Navbar from './Navbar';


export default function CreateForm() {
  const dispatch = useDispatch();
  const generos = useSelector((state) => state.allMangas);
  const genres = useSelector(state => state.genres)
  const user = useSelector(state => state.user)

  const [input, setInput] = useState({
    title: '',
    synopsis: '',
    images: [],
    genres: [],
  

  });

  function handleChangeFile(e) {
    console.log(e.target.files)
    setInput({
        ...input,
        images: e.target.files[0],
    });
}

function handleSubmit(e) {
    //Debe enviar un dispatch para post manga de tipo FormData
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


    const formData = new FormData();
    formData.append('authorId', user.id);
    formData.append('title', input.title);
    formData.append('synopsis', input.synopsis);
    formData.append('genres', input.genres);

    formData.append('images', input.images);

    console.log(formData.get('images'));
    dispatch(postManga(formData));
    alert('Manga creada');
    setInput({
        title: '',
        synopsis: '',
        genres: [],
        images: [],
    });
}

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
  

  
  useEffect(() =>{
    dispatch(getAllMangas());
    dispatch(getGenres())
  },[dispatch])

  return ( 
    <Fragment>
    <Navbar/>
    <Box
      paddingTop={'2%'}
      sx={{ display: 'flex' }}
      sx={{ mt: '15%' }}
      sx={{ md: { xs: '20%', md: '40%', lg: '100%' } }}>
      <div>
        <FormControl onSubmit={(e) => handleSubmit(e)}
          sx={{
            width: 300,
            height:'auto',
            borderRadius: '5px',
            backgroundColor: '#192A45',
            borderColor:'#192A45',
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
            <label>IMAGEN :</label>
            <div>
                <label htmlFor="contained-button-file">
                  <Input onChange={(e) => handleChangeFile (e)} sx={{display:'none'}} accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button onClick={(e) => handleChangeFile (e)} variant="contained" component="span">
                          Cargar
                    </Button>
                      </label>
                  <Box sx={{ mt: '1rem' }}>
            <label >SYNOPSIS :</label>
            <div>
            <TextField
          id="filled-multiline-flexible"
          multiline
          sx={{ backgroundColor: 'white' }}
          name="synopsis"
          value={input.synopsis}
          onChange={(e) => handleChange(e)}
          variant="filled"
        />
        </div>
            </Box>
            </div>
          </Box>
          <Box sx={{ mt: '1rem' }}>
            <label>GENERO :</label>
            <div>
                <Select
                    labelId="demo-simple-select-label"
                      id="demo-simple-select"
                        sx={{ width: '8rem',height:'1.5em',backgroundColor:'white' }}
                        value={input.genres}
                          name='genres'
                          label="genres"
                            onChange={(e) => handleSelect(e)}
                              >
                      {
                        genres && genres.map((g, i) => <MenuItem  key={i} value={g}>{g}</MenuItem>)
                      } 
  
                </Select>
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
    </Fragment>
  )
}
            
             

