import { React, useState } from 'react'
import { paginado } from '../Actions'
import { useDispatch } from 'react-redux';

const Paginado = ({total}) => {
    const dispatch = useDispatch()
    let [page, setPage] = useState(1)

    let handlePaginadoAtras = (e) => {
        e.preventDefault()
        if(page > 1) {
           setPage(page-1)
            dispatch(paginado(page)) 
        }
    }
    let handlePaginadoSiguiente = (e) => {
        e.preventDefault()
        if(page < total) {
            setPage(page+1)
            dispatch(paginado(page))
        }
        
    }
    
    return (
        <div>
            <button onClick={handlePaginadoAtras}>Atras</button>
            <p>{page}</p>
            <button onClick={handlePaginadoSiguiente}>Siguiente</button>
        </div>
    )
}

export default Paginado