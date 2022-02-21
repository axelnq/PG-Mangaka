import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const axios = require('axios')

const Score = ({id}) => {
    let [value, setValue] = React.useState(0)

    let handleRating = () => {
        axios.put(`http://localhost:3001/api/chapters/chapter/vote/${id}`, { withCredentials: true })
    }

    return (
        <Box sx={{backgroundColor:'#fffff9', borderRadius: '10%'}}>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => { setValue(newValue) }}
            />
        </Box>
    )
}

export default Score