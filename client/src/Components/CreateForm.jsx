import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { postManga, FILTRO_GENERO, filterMangasByGenre, getAllMangas } from '../Actions/index';


export default function CreateForm() {
  // const dispatch = useDispatch();
  // const history = useNavigate();
  // const generos = useSelector((state) => state.allMangas);

  const [input, setInput] = useState({
    title: '',
    synopsis: '',
    image: '',
    genre: [],

  })

  // function handleChange(e){
  //   setInput({
  //     ...input,
  //     [e.target.name]: e.target.value,
  //   });

  //   function handleSelect(e) {
  //     setInput({
  //         ...input,
  //         genre: [...input.genre, e.target.value],
  //     });
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const {title, synopsis,image,genre} = input;

  //   if(title === undefined || title.length < 3) {
  //     return alert ('titulo invalido')
  //   }else if(synopsis === undefined || synopsis.length < 30) {
  //     return alert ('synpsis minima 30 caracteres')
  //   }else if (image === undefined) {
  //     return alert('ingrese imagen valida')
  //   }else if (genre === undefined) {
  //     return alert('seleccione genero')
  //   }
  // }

  // dispatch(postManga(input));
  // alert('Manga creada');
  // setInput({
  //   title:'',
  //   synopsis:'',
  //   image:'',
  //   genre:[],
  // });
  // history.push('/home')


  //  }

  //   function handleDelete(el) {
  //     setInput({
  //         ...input,
  //         genre: input.genre.filter((generos) => generos !== el),
  //     });
  // }

  // useEffect(() =>{
  //   dispatch(filterMangasByGenre());
  // },[dispatch])





  return (
    <Box
      paddingTop={'8%'}
      sx={{ display: 'flex' }}
      sx={{ mt: '15%' }}
      sx={{ md: { xs: '20%', md: '40%', lg: '100%' } }}>
      <div>
        <FormControl
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
              // value={input.title}
              name="title"
            // onChange={(e) => handleChange(e)}

            />
          </div>
          <Box sx={{ mt: '1rem' }}>
            <label >SYNOPSIS :</label>
            <div>
              <input
                type="text"
                // value={input.synopsis}
                name="synposis"
              // onChange={(e) => handleChange(e)}
              />

            </div>
          </Box>
          <Box sx={{ mt: '1rem' }}>
            <label>IMAGEN :</label>
            <div>
              <input
                type="text"
                // value={input.image}
                name="image"
              // onChange={(e) => handleChange(e)}
              />
            </div>
          </Box>
          <Box sx={{ mt: '1rem' }}>
            <label>GENERO :</label>
            <div>
              <select >
                <option value="Action">Acción</option>
                <option value="Adventure">Aventura</option>
                <option value="Comedy">Comedia</option>
                <option value="Drama">Drama</option>
                <option value="Fantasy">Fantasía</option>
                <option value="Romance">Romance</option>
                {/* genre:
                            {generos.map((el) => (
                                <option key={el.id} value={el.name}>
                                    {el.name}
                                </option>
                            ))} */}
              </select>
            </div>
          </Box>
          <div>
            <Box sx={{ width: '100%', py: '1rem' }}>
              <Button type="submit" size="small" className='btnCreate' variant="contained">Crear Manga</Button></Box>
            <Box sx={{ width: '100%', py: '0.2rem' }}>
              <Button size="small" variant="contained" href="/home">
                Home
              </Button>  </Box>
          </div>
        </FormControl>
      </div>
    </Box>
  )
}

