import { React, useState } from 'react'
import { paginado } from '../Actions'
import { useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';


const Paginado = ({total}) => {
    const dispatch = useDispatch()
    let [page, setPage] = useState(1)

    let handlePaginado = (e) => {
        e.preventDefault()
        setPage(e.target.textContent)
        dispatch(paginado(page))
    }
    
    return (
        <div>
            <Pagination count={total} onClick={handlePaginado} sx={{ mx: "auto", width: 300}}/>
        </div>
    )
}

export default Paginado