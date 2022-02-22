import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    DataGrid
} from '@mui/x-data-grid';
// import { FormControl, Select, MenuItem, Button } from '@mui/material';
import { getPanelMangas, setActiveManga } from '../Actions';

export default function MangasPanel() {
    //get users
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(dispatch(getPanelMangas()), 1500)
    }, [dispatch])
    const allMangas = useSelector((state) => state.panelMangas)
    console.log(allMangas)
    const loggedUser = useSelector((state) => state.user)

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 180,
            editable: false,
        },
        {
            field: 'author',
            headerName: 'Authors',
            width: 190,
            editable: false,
        },
        {
            field: 'chapter',
            headerName: 'Chapters',
            width: 150,
            editable: false,
        },
        {
            field: 'genre',
            headerName: 'Genres',
            width: 400,
            editable: false,
        },
        {
            field: 'rate',
            headerName: 'Rating',
            width: 150,
            editable: false,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            editable: false,
        },
        {
            field: 'estado',
            headerName: 'Estado',
            description: 'Activo o Inactivo.',
            sortable: true,
            width: 160,
            type: "singleSelect",
            editable: true,
            valueOptions: [
                "Activo",
                "Inactivo",
            ]
        },
        // { field: 'id', headerName: 'ID', width: 300 },
    ];

    let rows = [
        allMangas?.map(manga => ({
            id: manga.id,
            name: manga.title,
            author: manga.author.name,
            // author: manga.authors.map(author => author.name).join(', '),
            chapter: manga.chapter,
            genre: manga.genre,
            // genre: manga.genre.map(genre => genre.name).join(', '),
            rate: manga.rating,
            status: manga.state,
            // creador: user.creatorMode ? 'Creador' : 'Usuario',
            estado: manga.active ? 'Activo' : 'Inactivo',
            // rol: user.role === 'SUPERADMIN' ? 'Super Admin' : user.role === 'ADMIN' ? 'Admin' : 'Usuario'
        }))
    ]

    let [data, setData] = useState('')
    console.log(data)
    if (data.field === 'estado') {
        let manga = allMangas.find(manga => manga.id === data.id)
        let row = rows[0].find(row => row.id === data.id)
        dispatch(setActiveManga(manga.id));
        row.estado = data.value;
        manga.active = data.value === 'Activo' ? true : false;
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            {allMangas && loggedUser.role !== 'USER' ?
                <DataGrid
                    rows={rows[0]}
                    // onCellDoubleClick={event => { console.log(event) }}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    // checkboxSelection
                    onCellEditCommit={event => { setData(event) }}
                    sx={{ width: "50rem" }}
                />
                : <div>No tiene permisos</div>}
        </div>
    );
}
