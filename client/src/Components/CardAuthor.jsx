import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


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


export default function CardAuthor({image, name}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          sx={{borderRadius:'50%'}}
          component="img"
          height="140"
          image={'data:image/jpeg;base64,' + _ArrayBufferToBase64(image)}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}