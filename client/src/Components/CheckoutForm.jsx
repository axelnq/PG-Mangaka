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

function validate(input) {
  const error = {};
  const { name, cbu, value } = input;
  
  error.name = name.length > 3 && isNaN(name) ? null : 'Ingrese nombre del titular de la cuenta';  
  error.cbu = cbu && cbu.length === 22 && !isNaN(cbu) ? null: 'El cbu debe tener 22 digitos';
  error.value = value > 0 ? null : 'Las monedas a extraer deben ser mayores a 0';

  return error;
}

export default function CheckoutForm() {
  const [coins, setCoins] = useState(0);
  const [input, setInput] = useState({cbu:'', value: 0, name:''});
  const [flag, setFlag] = useState(false);
  const [coinOptions, _] = useState([0, 10, 50, 100, 200, 500, 1000]);
  const [error, setError] = useState({})

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/profile/coins", { withCredentials: true })
      .then(data => {
        setCoins(data.data.coins);
        if (!flag) {
          setFlag(true)
        }
        console.log(data)
      })
      .catch(error => console.log(error.response))
  }, [flag])

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const error = validate(input);
    console.log(input)
    console.log(error)
    if (error.name || error.cbu || error.value) {
      setError(error);
      return;
    }

    axios.post('http://localhost:3001/api/coins/sell', input ,{ withCredentials:true })
    alert('Su solicitud esta siendo procesada');
    setInput ({ cbu:'', value: 0, name:''})
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
          <FormControl 
            onSubmit={(e) => handleSubmit(e)} 
            sx={{
              width: 600,
              height:'auto',
              borderRadius: '5px',
              backgroundColor: '#192A45',
              borderColor:'#192A45',
              color: '#357DED',
            }}>
            <Box sx={{ m: '10px', borderRadius: '10px', border: '2px solid white' }}>
              <h1 >RETIRA TUS MONEDAS</h1> 
              <h3>( 1 moneda = $ 7 ) </h3>
              <h3>Monedas Disponibles: {coins}</h3>
            </Box>
            <Box sx={{ mt: '2rem' }}>
              <div>
                <FormControl>
                  <Input 
                    placeholder = 'NOMBRE TITULAR DE LA CUENTA' 
                    sx = {{ 
                      width :'32rem',
                      justifyContent:'center',
                      backgroundColor:'white'
                    }}
                    type = "text"
                    value = {input.name}
                    name = "name"
                    onChange = {(e) => handleChange(e)}
                  />
                  {error.name && <p className='error'>{error.name}</p>}
                </FormControl>
              </div> 
            </Box>
            <Box sx={{ mt: '2rem' }}>
              <div>
                <Input 
                  placeholder = 'CBU' 
                  sx = {{ 
                    width :'32rem',
                    justifyContent:'center',
                    backgroundColor:'white',
                    textAlign: 'center'
                  }}
                  type = "text"
                  value={input.cbu}
                  name = "cbu"
                  onChange = {(e) => handleChange(e)}
                />
                {error.cbu && <p className='error'>{error.cbu}</p>}
              </div> 
            </Box>         
            <Box sx={{ mt: '2rem' }}>
              <div>
                { flag ?                    
                        <select 
                          style = {{
                            width: 32 +'rem', 
                            justifyContent:'center',
                            backgroundColor:'white',
                            textAlign:'center',
                            height: 2 +'rem'
                          }} 
                          name="value" 
                          onChange = {handleChange} 
                          value={input.value}>
                          {coinOptions.map(c => {
                              if (c <= coins) {
                                return <option key={c} value={c}> {c} </option>
                              }
                            })
                          }
                        </select>
                      : null
                    }
                    {error.value && <p className='error'>{error.value}</p>}
              </div> 
            </Box>
            <div>
              <Box sx = {{ width: '100%', py: '1rem' }}>
                <Button 
                  onClick={(e) => handleSubmit(e)} 
                  size="small" 
                  variant="contained">
                    Enviar
                </Button>
              </Box>
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
