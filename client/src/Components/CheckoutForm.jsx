import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { FormControl } from "@mui/material";
import { Fragment } from "react";
import { Button } from "@mui/material";
import { Input} from "@mui/material";
import { useNavigate } from 'react-router-dom';






export default function CheckoutForm() {
    const [coins,setCoins] = useState(undefined);
    const [input,setInput] = useState({cbu:'',value:0,name:''});
    const [flag,setFlag] = useState(false);
    const navigate = useNavigate()

    useEffect( () =>{
      axios.get("http://localhost:3001/api/profile/coins",{withCredentials:true})
      .then(data => {setCoins(data.data.coins);
      if(!flag ){
      setFlag(true)
      }console.log(data)
      })
      .catch(error => console.log(error.response))
    },[flag])


    function handleChange(e){
      console.log(e.target.value)
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    function handleSubmit(e){
      e.preventDefault();
      const {name,cbu} = input;
      if(name.length < 3) {
        return alert('nombre invalido')
      }else if (cbu.length !==  22) {
        return alert('cbu incorrecto')
      }
      console.log(input,'inputhandle')
      axios.post('http://localhost:3001/api/coins/sell',input,{withCredentials:true})
      setInput ({cbu:'',value:0,name:''})
    
      navigate('/')
     
    }

   
    
  


  return ( 
    <Fragment>
    <Box
      paddingTop={'2%'}
      sx={{ display: 'flex' }}
      sx={{ mt: '15%' }}
      sx={{ md: { xs: '20%', md: '40%', lg: '100%' } }}>
      {(flag ) ? (
      <div>
        <FormControl   onSubmit={(e) => handleSubmit(e)} 
          sx={{
            width: 600,
            height:'auto',
            borderRadius: '5px',
            backgroundColor: '#192A45',
            borderColor:'#192A45',
            color: '#357DED',
          }}>
          <h1 >RETIRA TUS MONEDAS</h1> 
          <h3>( 1 moneda = $ 7 ) </h3>
          <h3>Monedas Disponibles: {coins}</h3>
          <Box sx={{ mt: '2rem' }}>
            <div>
            <Input placeholder='NOMBRE TITULAR DE LA CUENTA' sx={{width :'32rem',justifyContent:'center',backgroundColor:'white'}}
              type="text"
              value={input.name}
              name="name"
            onChange={(e) => handleChange(e)}
            />
          </div> 
          </Box>
          <Box sx={{ mt: '2rem' }}>
            <div>
            <Input placeholder='CBU' sx={{width :'32rem',justifyContent:'center',backgroundColor:'white',textAlign: 'center'}}
              type="text"
              value={input.cbu}
              name="cbu"
            onChange={(e) => handleChange(e)}
            />
          </div> 
          </Box>         
          <Box sx={{ mt: '2rem' }}>
            <div>
           { flag ?                    
                    (coins >= 1000) ? (
                    <select style={{width: 32 +'rem', justifyContent:'center',backgroundColor:'white',textAlign:'center',height: 2 +'rem'}}  name="value" onChange={handleChange} value={input.value}>
                    <option value="0">Selecciona una opción</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    </select>) : 
                    (coins >= 500) ? (
                    <select style={{width: 32 +'rem', justifyContent:'center',backgroundColor:'white',textAlign:'center',height: 2 +'rem'}} name="value" onChange={handleChange} value={input.value}>
                     <option disabled selected>Selecciona una opción</option>
                    <option value="0">0</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="500">500</option>
                    </select>
                   ) : 
                   (coins >= 200) ? (<select name="value" onChange={handleChange} value={input.value}>
                   <option style={{width: 32 +'rem', justifyContent:'center',backgroundColor:'white',textAlign:'center',height: 2 +'rem'}} value="0">0</option>
                   <option disabled selected>Selecciona una opción</option>
                   <option value="10">10</option>
                   <option value="50">50</option>
                   <option value="100">100</option>
                   <option value="200">200</option>
                   </select>) :
                   (coins >= 100) ? (
                   <select style={{width: 32 +'rem', justifyContent:'center',backgroundColor:'white',textAlign:'center',height: 2 +'rem'}} name="value" onChange={handleChange} value={input.value}>
                    <option disabled selected>Selecciona una opción</option>
                   <option value="0">0</option>
                   <option value="10">10</option>
                   <option value="50">50</option>
                   <option value="100">100</option>
                   </select>) : 
                   (coins >= 50) ? (
                   <select style={{width: 32 +'rem', justifyContent:'center',backgroundColor:'white',textAlign:'center',height: 2 +'rem'}} name="value" onChange={handleChange} value={input.value}>
                    <option disabled selected>Selecciona una opción</option>
                   <option value="0">0</option>
                   <option value="10">10</option>
                   <option value="50">50</option>
                   </select>) : 
                   (coins >= 10) ? (<select style={{width: 32 +'rem', justifyContent:'center',backgroundColor:'white',textAlign:'center',height: 2 +'rem'}} name="value" onChange={handleChange} value={input.value}>
                   <option value="0">0</option>
                   <option value="10">10</option>
                   </select>) : (<select name="value" onChange={handleChange} value={input.value}>
                   <option disabled selected>Selecciona una opción</option>
                    <option value="0">0</option>
                    </select>) : null}
          </div> 
          </Box>
          <div>
            <Box sx={{ width: '100%', py: '1rem' }}>
              <Button  onClick={(e) => handleSubmit(e)} size="small"  variant="contained">Enviar</Button></Box>
            <Box sx={{ width: '100%', py: '0.2rem' }}>
              </Box>
      
          </div>
        </FormControl>
      </div>
      ) : (<div>cargando</div>)}
    </Box>
    </Fragment>
  )
}
            
             


            
             


