import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { FormControl } from "@mui/material";
import { Fragment } from "react";
import { Button } from "@mui/material";
import { Input,Select} from "@mui/material";



export default function CheckoutForm() {
    const [coins,setCoins] = useState(undefined);
    const [input,setInput] = useState({cbu:'',extract:0,titularName:''});
    const [flag,setFlag] = useState(false);

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
      console.log(input,'inputhandle')
      axios.post('http://localhost:3001/api/coins/sell',input,{withCredentials:true})
      setInput ({cbu:'',extract:0,titularName:''})
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
          <Box sx={{ mt: '1rem' }}>
            <label>NOMBRE COMPLETO:</label>
            <div>
            <Input sx={{width :'32rem',justifyContent:'center',backgroundColor:'white'}}
              type="text"
              value={input.titularName}
              name="titularName"
            onChange={(e) => handleChange(e)}

            />
              </div> 
          </Box>
          <Box sx={{ mt: '1rem' }}>
            <label>CBU:</label>
            <div>
            <Input sx={{width :'32rem',justifyContent:'center',backgroundColor:'white'}}
              type="text"
              value={input.cbu}
              name="cbu"
            onChange={(e) => handleChange(e)}
            />
          </div> 
          </Box>         
          <Box sx={{ mt: '1rem' }}>
            <label>COINS:</label>
            <div>
           { flag ?                    
                    (coins >= 1000) ? (
                    <Select sx={{width :'32rem',justifyContent:'center',backgroundColor:'white'}} name="extract" onChange={handleChange} value={input.extract}>
                    <option value="0">0</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    </Select>) : 
                    (coins >= 500) ? (
                    <Select name="extract" onChange={handleChange} value={input.extract}>
                    <option value="0">0</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="500">500</option>
                    </Select>
                   ) : 
                   (coins >= 200) ? (<Select name="extract" onChange={handleChange} value={input.extract}>
                   <option value="0">0</option>
                   <option value="10">10</option>
                   <option value="50">50</option>
                   <option value="100">100</option>
                   <option value="200">200</option>
                   </Select>) :
                   (coins >= 100) ? (
                   <Select name="extract" onChange={handleChange} value={input.extract}>
                   <option value="0">0</option>
                   <option value="10">10</option>
                   <option value="50">50</option>
                   <option value="100">100</option>
                   </Select>) : 
                   (coins >= 50) ? (
                   <Select name="extract" onChange={handleChange} value={input.extract}>
                   <option value="0">0</option>
                   <option value="10">10</option>
                   <option value="50">50</option>
                   </Select>) : 
                   (coins >= 10) ? (<Select name="extract" onChange={handleChange} value={input.extract}>
                   <option value="0">0</option>
                   <option value="10">10</option>
                   </Select>) : (<Select name="extract" onChange={handleChange} value={input.extract}>
                    <option value="0">0</option>
                    </Select>) : null}
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
            
             


            
             


