import React from 'react';
import { Link } from 'react-router-dom'


import Typography from '@mui/material/Typography';
import {Box, Avatar} from '@mui/material';


const _ArrayBufferToBase64 = (buffer) => {
  //console.log(buffer)
  if(buffer === undefined) return '';
  var binary = '';
  var byte = new Uint8Array(buffer.data);
  var length = byte.byteLength;

  for(var i = 0; i < length ;i++) {
      binary += String.fromCharCode(byte[i])
  }
  return window.btoa(binary)
}


export default function CardAuthor({image, name, id}) {
  
  return (
    
    <div>
      <Link to={'/author/' + id} >
        
          <Box sx={{ display: 'flex', flexDirection:'column', alignItems: "center" }}>

            {/* <CardMedia
              sx={{ borderRadius: '50%' }}
              component="img"
              height="140rem"
              width='80rem'
              image={'data:image/jpeg;base64,' + _ArrayBufferToBase64(image)}
              alt="author"
            /> */}
            <Avatar
              src={'data:image/jpeg;base64,' + _ArrayBufferToBase64(image)}
              alt="author"
              sx={{ width: 140, height: 140 }}
            />
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>

          </Box>
        
      </Link>
      
    </div>


        
  );
}