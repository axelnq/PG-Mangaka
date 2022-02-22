import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { postChapters } from '../Actions/index';
import Navbar from './Navbar';



export default function CreateChapters() {
  const dispatch = useDispatch();
  const chapters = useSelector((state) => state.allChapters);
  const { id } = useParams()


  const [input, setInput] = useState({
    title: '',
    mangaId: Number,
    chapters: [],
    coverImages: [],
    price: Number,


  });

  function handleChangeFile(e) {
    console.log(e.target.files)
    setInput({
      ...input,
      coverImages: e.target.files[0],


    });
  }


  function handleChangeFileChapters(e) {
    console.log(e.target.files)
    let files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files[i]);
    }
    console.log(files, "files")
    setInput({
      ...input,
      chapters: files,


    });
  }

  function handleSubmit(e) {
    //Debe enviar un dispatch para post chapters de tipo FormData
    e.preventDefault();

    const { title, chapters, coverImages, price } = input;

    // if (title === undefined || title.length < 3) {
    //   return alert('titulo invalido')
    // } else if (chapters === undefined) {
    //   return alert('ingrese imagen valida')
    // } else if (coverImages === undefined) {
    //   return alert('ingrese imagen valida')
    // } else if (price === undefined) {
    //   return alert('')
    // }


    const formData = new FormData();
    formData.append('title', input.title);
    console.log(input.title)
    formData.append('mangaId', id);
    console.log(input.mangaId)
    formData.append('portada', input.coverImages);
    console.log(input.coverImages)
    input.chapters.forEach((file) => {
      formData.append('chapters', file);
    });
    console.log(input.chapters)

    formData.append('price', 5);
    console.log(input.price)


    dispatch(postChapters(formData));
    alert('Capitulo creado');
    setInput({
      title: '',
      mangaId: Number,
      chapters: [],
      coverImages: [],
      price: Number,

    });
  }

  function handleChange(e) {
    console.log(e.target.value)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }



  return (
    <Fragment>
      <Navbar />
      <Box
        paddingTop={'2%'}
        sx={{ display: 'flex' }}
        sx={{ mt: '15%' }}
        sx={{ md: { xs: '20%', md: '40%', lg: '100%' } }}>
        <div>
          <FormControl onSubmit={(e) => handleSubmit(e)}
            sx={{
              width: 600,
              height: 'auto',
              borderRadius: '5px',
              backgroundColor: '#192A45',
              borderColor: '#192A45',
              color: '#357DED',
            }}>
            <h1 >CREA TU CAPITULO</h1>
            <label>TITLE :</label>
            <div>
              <input style={{width: 32 +'rem', justifyContent:'center',backgroundColor:'white',textAlign:'center',height: 2 +'rem'}}
                type="text"
                value={input.title}
                name="title"
                onChange={(e) => handleChange(e)}

              />
            </div>

            <Box sx={{ mt: '1rem' }}>
              <label>PORTADA :</label>
              <div>

                <input style={{width: 32 +'rem', justifyContent:'center',backgroundColor:'white',textAlign:'center',height: 2 +'rem'}}
                onChange={(e) => handleChangeFile(e)} accept="image/*" id="portada" type="file" />




              </div>
              <label>CAPITULO :</label>
              <div>


                <input 
                style={{width: 32 +'rem', justifyContent:'center',backgroundColor:'white',textAlign:'center',height: 2 +'rem'}}onChange={(e) => handleChangeFileChapters(e)} accept="image/*" id="chapters" multiple type="file" />




              </div>
            </Box>
            <div>
              <Box sx={{ width: '100%', py: '1rem' }}>
                <Button onClick={(e) => handleSubmit(e)} variant="contained">Crear Capitulo</Button></Box>
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





