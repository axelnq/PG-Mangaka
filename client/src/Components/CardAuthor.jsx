import React from 'react';
import { Link } from 'react-router-dom'

import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material';


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
        <div>
          <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: "flex-end" }}>

            <CardMedia
              sx={{ borderRadius: '50%' }}
              component="img"
              height="140"
              image={'data:image/jpeg;base64,' + _ArrayBufferToBase64(image)}
              alt="author"
            />

            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>

          </Box>
        </div>
      </Link>
      
    </div>


        
  );
}