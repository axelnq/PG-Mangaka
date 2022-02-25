import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Select, MenuItem, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { postManga, getAllMangas } from '../Actions/index';


function validate(input) {
  const error = {};
  const { title, synopsis, image, genres } = input;

  error.title = title.length > 3 && isNaN(title) ? null : 'Ingrese titulo,sólo letras';
  error.image = image ? null : 'Ingrese imagen';
  error.synopsis = synopsis && synopsis.length > 30 ? null : 'Minimo 30 caracteres';
  error.genres = genres.length > 0 && genres[0] != "Generos" ? null : 'Ingrese genero';

  return error;
}

export default function CreateForm() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const [error, setError] = useState({})

  const [input, setInput] = useState({
    title: '',
    synopsis: '',
    image: null,
    genres: ["Generos"],
  });

  function handleChangeFile(e) {
    setInput({
      ...input,
      image: e.target.files[0],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { title, synopsis, image, genres } = input;
    const error = validate(input);

    if (error.title || error.genres || error.synopsis || error.image) {
      setError(error);
      return;
    }

    const formData = new FormData();
    formData.append('authorId', user.id);
    formData.append('title', title);
    formData.append('synopsis', synopsis);
    formData.append('genres', genres);
    formData.append('images', image);

    dispatch(postManga(formData));
    alert('Manga creada');
    setInput({
      title: '',
      synopsis: '',
      genres: ["Generos"],
      image: null,
    });
    setError({})
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      genres: [e.target.value],
    });
  }

  useEffect(() => {
    dispatch(getAllMangas());
  }, [dispatch])

  return (
    <Box
      paddingTop={'2%'}
      sx={{ display: 'flex' }}
      sx={{ mt: '15%' }}
      sx={{ md: { xs: '20%', md: '40%', lg: '100%' } }}
    >
      <div>
        <FormControl
          onSubmit={(e) => handleSubmit(e)}
          sx={{
            width: '37.5em',
            height: 'auto',
            borderRadius: '0.313em',
            backgroundColor: '#192A45',
            borderColor: '#192A45',
            color: '#357DED',
          }}>
          <h1 >CREA TU MANGA</h1>
          <Box>
            <div>
              <FormControl>
                <Input
                  placeholder='TITLE'
                  sx={{ 
                    width: '32rem', 
                    justifyContent: 'center', 
                    backgroundColor: 'white',
                     p: '0.5rem' }}
                  type="text"
                  value={input.title}
                  name="title"
                  onChange={(e) => handleChange(e)}
                />
                {error.title && <p className='error'>{error.title}</p>}
              </FormControl>
            </div>
          </Box>

          <Box sx={{ mt: '2rem' }}>
            <div>
              <label htmlFor="contained-button-file">
                <FormControl>
                  <Button
                    sx={{ 
                      width: '32rem',
                       justifyContent: 'center'
                       }}
                    variant="contained"
                    component="span">
                    <Input
                      onChange={(e) => handleChangeFile(e)}
                      sx={{ display: 'none' }}
                      accept="image/*"
                      name="images"
                      id="contained-button-file"
                      multiple type="file"
                    />
                    Cargar Imagen
                  </Button>
                </FormControl>
                {error.image && <p className='error'>{error.image}</p>}
              </label>
            </div>
          </Box>

          <Box sx={{ mt: '2rem' }}>
            <div>
              <TextField
                placeholder='SYNOPSIS'
                id="filled-multiline-flexible"
                multiline
                sx={{
                   width: '32rem', 
                   justifyContent: 'center',
                    backgroundColor: 'white'
                   }}
                name="synopsis"
                value={input.synopsis}
                onChange={(e) => handleChange(e)}
                variant="filled"
              />
              {error.synopsis && <p className='error'>{error.synopsis}</p>}
            </div>
          </Box>

          <Box sx={{ mt: '2rem' }}>
            <div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ 
                  width: '32rem',
                   justifyContent: 'center',
                    backgroundColor: 'white'
                   }}
                value={input.genres}
                name='genres'
                label="genres"
                onChange={(e) => handleSelect(e)}>
                <MenuItem value="Generos">Selecciona una opción</MenuItem>
                <MenuItem value="Drama">Drama</MenuItem>
                <MenuItem value="Romance">Romance</MenuItem>
                <MenuItem value="Adventure">Adventure</MenuItem>
                <MenuItem value="Comedy">Comedy</MenuItem>
                <MenuItem value="Fantasy">Fantasy</MenuItem>
                <MenuItem value="Supernatural">Supernatural</MenuItem>
                <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
                <MenuItem value="Action">Action</MenuItem>
                <MenuItem value="Slice of Life">Slice of Life</MenuItem>
                <MenuItem value="Ecchi">Ecchi</MenuItem>
                <MenuItem value="Sport">Sport</MenuItem>
                <MenuItem value="Mistery">Mistery</MenuItem>
              </Select>
              {error.genres && <p className='error'>{error.genres}</p>}
            </div>
          </Box>

          <div>
            {input.genre?.map((genre, i) => <p key={i}>{genre}</p>)}
          </div>

          <div>
            <Box sx={{ width: '100%', py: '2rem' }}>
              <Button
                sx={{ width: '32rem', justifyContent: 'center' }}
                onClick={(e) => handleSubmit(e)}
                variant="contained">
                Crear Manga
              </Button>
            </Box>
            <Box sx={{ width: '100%', py: '0.2rem' }}>
              <NavLink to="/">
                <Button>
                  Home
                </Button>
              </NavLink>
            </Box>
          </div>
        </FormControl>
      </div>
    </Box>
  )
}



