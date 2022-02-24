import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const axios = require('axios')

const Score = ({id, chapter}) => {
    let handleRating = (e) => {
        axios.put(`http://localhost:3001/api/chapters/chapter/vote/${id}`,{ points: e.target.value }, { withCredentials: true })
            .then(data => console.log(chapter.points))
            .catch(error => console.log(error.response))
    }

    return (
        <Box>
            {
                (chapter.points === 0) ?
                <Rating onClick={handleRating}/>
                :
                <Rating name="read-only" value={chapter.points} readOnly />
            }
        </Box>
    )
}

export default Score