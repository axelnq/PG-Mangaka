import React from 'react';
import { useState } from 'react';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';


const CreateForm = () => {

  const [input,setInput] = useState({
    title: '',
    synopsis:'',
    image:'',
    genre:'',
  })

  function handleChange(e) {
    setInput({
        ...input,
        [e.target.name]: e.target.value,
    });
}

// function handleSelect(e) {
//     setInput({
//         ...input,
//         genre: [...input.genre, e.target.value],
//     });
// }

// function handleSubmit(e) {
//     e.preventDefault();

//     const { name,  synopsis,image , genre } = input;
        
    return (
        <Box 
        paddingTop={'8%'}
        sx={{ display: 'flex' }}
        sx={{mt:'15%'}}
        sx={{md:{xs:'20%', md:'40%', lg:'100%' }}}>
        <div>
      <FormControl 
      sx={{ width: 300,
        height: 400,
        borderRadius:'5px',
        backgroundColor: '#192A45',
        color:'#357DED',
      }}>
      <h1 >CREA TU MANGA</h1>
                        <label>TITLE :</label>
                        <div>
                        <input
                            type="text"
                            value={input.title}
                            name="title"
                            // placeholder='TITLE'
                            onChange={(e) => handleChange(e)}
                        />
                        </div>
                        <Box sx={{mt:'1rem'}}>
                        <label >SYNOPSIS :</label>
                        <div>
                        <input
                            type="text"
                            value={input.synopsis}
                            name="synposis"
                            // placeholder='SYNOPSIS'
                            onChange={(e) => handleChange(e)}
                        />
                       
                        </div>
                        </Box>
                        <Box sx={{mt:'1rem'}}>
                        <label>IMAGEN :</label>
                        <div>
                        <input
                            type="text"
                            value={input.image}
                            name="image"
                            // placeholder='IMAGEN'
                            onChange={(e) => handleChange(e)}
                       />
                       </div>
                       </Box>
                       <Box sx={{mt:'1rem'}}>
                        <label>GENERO :</label>
                        <div>
                        <input
                            type="text"
                            value={input.genre}
                            name="genre"
                            // placeholder='GENERO'
                            // onChange={(e) => handleSelect(e)}
                        />
                        </div>
                        </Box>
                        <div>
                  <Box sx={{width:'100%', py:'1rem'}}>
                    <Button  type="submit" size="small" className='btnCreate' variant="contained">Crear Manga</Button></Box>
                      <Box sx={{width:'100%', py:'0.2rem'}}>
                    <Button  size="small" variant="contained" href="/home">
                    Home
                    </Button>  </Box>
                   </div>                     
        </FormControl>
        </div>
        </Box>
    )
}

export default CreateForm;