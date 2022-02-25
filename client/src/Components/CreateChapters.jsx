import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { postChapters } from '../Actions/index';
import { Input } from '@mui/material';

function validate(input) {
  const error = {};
  const { title, chapters, coverImage } = input;
  error.title = title.length > 3 && isNaN(title) ? null : 'Ingrese titulo, sólo letras';  
  error.chapters = chapters.length > 0 && chapters.length <= 10 ? null : 'Ingrese hasta 10 capitulos';
  error.coverImage = coverImage ? null : 'Ingrese portada';

  return error;
}

export default function CreateChapters() {
  const dispatch = useDispatch();
  const { id } = useParams()
  const [error, setError] = useState({})

  const [input, setInput] = useState({
    title: '',
    chapters: [],
    coverImage: null,
  });

  function handleChangeFile(e) {
    setInput({
      ...input,
      coverImage: e.target.files[0],
    });
  }

  function handleChangeFileChapters(e) {
    const files = Array.from(e.target.files);
    setInput({
      ...input,
      chapters: files,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { title, chapters, coverImage } = input;
    const error = validate(input);

    if (error.title || error.chapters || error.coverImage) {
      setError(error);
      return;
    } 

    const formData = new FormData();
    formData.append('title', title);
    formData.append('mangaId', id);
    formData.append('portada', coverImage);
    formData.append('price', 5);
    chapters.forEach((file) => {
      formData.append('chapters', file);
    });

    dispatch(postChapters(formData));
    alert('Capitulo creado');
    setInput({
      title: '',
      chapters: [],
      coverImage: null,
    });
    setError({});
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Fragment>
      <Box
        paddingTop={'2%'}
        sx={{ display: 'flex' }}
        sx={{ mt: '15%' }}
        sx={{ md: { xs: '20%', md: '40%', lg: '100%' } }}>
        <div>
          <FormControl 
            onSubmit={(e) => handleSubmit(e)}
            sx = {{
              width: '45.5em',
              height: 'auto',
              borderRadius: '0.313em',
              backgroundColor: '#192A45',
              borderColor: '#192A45',
              color: '#357DED',
            }}>
            <h1>CREA TU CAPITULO</h1>
            <div>
              <FormControl>
                <Input 
                  placeholder = 'TITLE' 
                  sx = {{ 
                    width: '32rem', 
                    justifyContent:'center',
                    backgroundColor:'white',
                    textAlign:'center',
                    height: '2rem',
                    padding: '0.5rem'
                  }}
                  type = "text"
                  value = {input.title}
                  name = "title"
                  onChange = {(e) => handleChange(e)}
                  />
                {error.title && <p className='error'>{error.title}</p>}
              </FormControl>
            </div>
            <Box sx={{ mt: '2rem' }}>
              <div>
                  <label htmlFor="contained-button-file">
                    <FormControl>
                      <Button 
                        sx={{width :'32rem',justifyContent:'center'}} 
                        variant="contained" 
                        component="span">
                          <Input 
                            onChange={(e) => handleChangeFile (e)} 
                            sx={{display:'none'}} 
                            accept="image/*" 
                            id="contained-button-file" 
                            multiple type="file" 
                          />
                          Cargar Portada
                      </Button>
                    </FormControl>
                    {error.coverImage && <p className='error'>{error.coverImage}</p>}
                  </label>
              </div>
              <Box sx={{ mt: '2rem' }}> 
                <div>
                  <label htmlFor="chapters">
                    <FormControl>
                      <Button 
                        sx = {{width :'32rem',justifyContent:'center'}} 
                        variant="contained" 
                        component="span">
                          <Input 
                            type="file" 
                            inputProps = {{ multiple: true }} 
                            onChange = {(e) => handleChangeFileChapters(e)}
                            sx={{ display: 'none' }} 
                            accept="image/*" 
                            id='chapters' 
                          />
                          Cargar Capitulo
                      </Button>
                    </FormControl>
                    {error.chapters && <p className='error'>{error.chapters}</p>}
                  </label>
                </div> 
              </Box>
              <div>
                <Box sx={{ width: '100%', py: '2rem' }}>
                  <Button  
                    sx={{ 
                      width: '32rem', 
                      justifyContent:'center',
                      textAlign:'center',
                      height: '2rem'
                    }}
                    onClick={(e) => handleSubmit(e)} 
                    variant="contained">
                      Crear Capitulo
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
            </Box>
          </FormControl>
        </div>
      </Box>
    </Fragment>
  )
}
