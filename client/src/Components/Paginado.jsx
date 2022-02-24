import { React, useState } from 'react'
import { paginado } from '../Actions'
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';


const Paginado = ({ total }) => {
    const dispatch = useDispatch()
    let [page, setPage] = useState(1)
    let filter = useSelector(state => state.filters)

    let handlePaginado = (e) => {
        e.preventDefault()
        setPage(e.target.textContent)
        console.log(filter)
        dispatch(paginado({ page: e.target.textContent, genre: filter.genre, order: filter.order, tag: filter.tag }))
    }

    return (
        <div>
            <Pagination count={total} hidePrevButton hideNextButton page={page} onClick={handlePaginado} sx={{ width: 300, display: 'flex', justifyContent: 'center', mb: '2rem' }} />
        </div>
    )
}

export default Paginado