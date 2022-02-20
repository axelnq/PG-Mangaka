import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { postCheckout} from "../Actions";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { FormControl } from "@mui/material";
import { Fragment } from "react";
import { Button } from "@mui/material";


export default function CheckoutForm() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [input,setInput] = useState({
    coins:Number,
    id:Number,
    cbu:'',
    alias:'',
  })

  function handleSubmit(e) {
    //Debe enviar un dispatch para post manga de tipo FormData
    e.preventDefault();

        const {coins,id,cbu,alias} = input;
    
    // if (coins === undefined ) {
    //   return alert ('coins')
    // } else if(id === undefined) {
    //   return alert ('id')
    // } else if (cbu === undefined) {
    //   return alert('cbu')
    // } else if (alias === undefined) {
    //   return alert('alias')
    // }


    const formData = new FormData();
    formData.append('coins', input.coins);
    formData.append('id', input.id);
    formData.append('cbu', input.cbu);
    formData.append('alias', input.alias);

    console.log(formData.get('cbu'));
    dispatch(postCheckout(formData));
    alert('Suceso creado');
    setInput({
        coins: '',
        id: '',
        cbu: '',
        alias: '',
    });
}

  function handleChange(e){
    console.log(e.target.value)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    }); 
  }
  
 

  
  // useEffect(() =>{
  //   dispatch(getUserInfo());
  // },[dispatch])

  return ( 
    <Fragment>
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
          <h1 >RETIRA TUS MONEDAS</h1>
          <label>ALIAS:</label>
          <div>
            <input
              type="text"
              value={input.coins}
              name="coins"
            onChange={(e) => handleChange(e)}

            />
          </div>
          
          <Box sx={{ mt: '1rem' }}>
            <label>CBU:</label>
            <div>
            <input
              type="text"
              value={input.cbu}
              name="cbu"
            onChange={(e) => handleChange(e)}

            />
          </div> 
          </Box>
          <div>
            <Box sx={{ width: '100%', py: '1rem' }}>
              <Button onClick={(e) => handleSubmit(e)} size="small"  variant="contained">Enviar</Button></Box>
            <Box sx={{ width: '100%', py: '0.2rem' }}>
              </Box>
          </div>
        </FormControl>
      </div>
    </Box>
    </Fragment>
  )
}
            
             


            
             


