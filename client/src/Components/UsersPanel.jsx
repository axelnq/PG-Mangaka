import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    DataGrid
} from '@mui/x-data-grid';
// import { FormControl, Select, MenuItem, Button } from '@mui/material';
import { getAllMangas, getAllUsers, mangasToDb, setActive, setAdmin } from '../Actions';

export default function DataGridDemo() {
    //get users
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(dispatch(getAllUsers()), 1500)
    }, [dispatch])
    const allUsers = useSelector((state) => state.allUsers)
    const loggedUser = useSelector((state) => state.user)

    // const [funcion, setFuncion] = React.useState('');

    // const handleFuncionChange = (event) => {
    //     alert(event.target.value)
    // };

    // const apiRef = useGridApiRef();

    // const pageSize = gridPageSizeSelector(
    //     apiRef.current.state,
    //     apiRef.current.instanceId,
    // );

    // console.log(pageSize)

    const columns = [
        {
            field: 'username',
            headerName: 'Username',
            width: 150,
            editable: false,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 230,
            editable: false,
        },
        {
            field: 'coins',
            headerName: 'Coins',
            width: 100,
            editable: false,
        },
        {
            field: 'creador',
            headerName: 'Función',
            description: 'Es usuario o creador.',
            sortable: true,
            width: 160
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
        allUsers?.map(user => ({
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            coins: user.coins,
            creador: user.creatorMode ? 'Creador' : 'Usuario',
            estado: user.active ? 'Activo' : 'Inactivo',
            rol: user.role === 'SUPERADMIN' ? 'Super Admin' : user.role === 'ADMIN' ? 'Admin' : 'Usuario'
            // <Select
            //     labelId="demo-simple-select-autowidth-label"
            //     id="demo-simple-select-autowidth"
            //     onChange={handleFuncionChange}
            //     autoWidth
            // >
            //     <MenuItem value={'usuario'}>Usuario</MenuItem>
            //     <MenuItem value={'creador'}>Creador</MenuItem>
            // </Select>
        }))
    ]

    if (loggedUser.role === 'SUPERADMIN') {
        columns.push(
            {
                field: 'rol',
                headerName: 'Rol',
                description: 'Usuario, Admin o Super Admin.',
                sortable: true,
                width: 160,
                type: "singleSelect",
                editable: true,
                valueOptions: [
                    "Usuario",
                    "Admin",
                    "Super Admin",
                ]
            }
        )
        rows.push(
            allUsers?.map(user => ({
                rol: user.role === 'SUPERADMIN' ? 'Super Admin' : user.role === 'ADMIN' ? 'Admin' : 'Usuario'
            }))
        )
    }

    let [data, setData] = useState('')
    console.log(data)
    if (data.field === 'estado') {
        let user = allUsers.find(user => user.id === data.id)
        let row = rows[0].find(row => row.id === data.id)
        row.estado = data.value;
        dispatch(setActive(user.username));
    }
    if (data.field === 'rol') {
        let user = allUsers.find(user => user.id === data.id)
        let row = rows[0].find(row => row.id === data.id)
        row.rol = data.value;
        dispatch(setAdmin(user.username));
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            {allUsers && loggedUser.role !== 'USER' ?
                <DataGrid
                    rows={rows[0]}
                    // onCellDoubleClick={event => { console.log(event) }}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    // checkboxSelection
                    disableSelectionOnClick
                    onCellEditCommit={event => { setData(event) }}
                    sx={{ width: "50rem" }}
                />
                : <div>No tiene permisos</div>}
        </div>
    );
}
