import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    DataGrid
} from '@mui/x-data-grid';
// import { FormControl, Select, MenuItem, Button } from '@mui/material';
import { mangasToDb, setActiveManga } from '../Actions';

export default function MangasPanel() {
    //get users
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(dispatch(mangasToDb()), 1500)
    }, [dispatch])
    const allMangas = useSelector((state) => state.mangas)
    console.log(allMangas)
    const mangas = useSelector((state) => state.allMangas)
    console.log(mangas)
    const loggedUser = useSelector((state) => state.user)

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 180,
            editable: false,
        },
        {
            field: 'authors',
            headerName: 'Authors',
            width: 190,
            editable: false,
        },
        {
            field: 'chapters',
            headerName: 'Chapters',
            width: 150,
            editable: false,
        },
        {
            field: 'genres',
            headerName: 'Genres',
            width: 400,
            editable: false,
        },
        {
            field: 'popularity',
            headerName: 'Popularity',
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
            field: 'volumes',
            headerName: 'Volumes',
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
            id: manga.mal_id,
            name: manga.title,
            authors: manga.authors.map(author => author.name).join(', '),
            chapters: manga.chapters,
            genres: manga.genres.map(genre => genre.name).join(', '),
            popularity: manga.popularity,
            status: manga.status,
            volumes: manga.volumes,
            // creador: user.creatorMode ? 'Creador' : 'Usuario',
            estado: manga.active ? 'Activo' : 'Inactivo',
            // rol: user.role === 'SUPERADMIN' ? 'Super Admin' : user.role === 'ADMIN' ? 'Admin' : 'Usuario'
        }))
    ]

    let [data, setData] = useState('')
    console.log(data)
    if (data.field === 'estado') {
        let manga = allMangas.find(manga => manga.mal_id === data.id)
        let row = rows[0].find(row => row.id === data.id)
        row.estado = data.value;
        dispatch(setActiveManga(manga.mal_id));
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
