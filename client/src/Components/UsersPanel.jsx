import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, Select, MenuItem } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'other',
        headerName: 'Other',
        width: 110,
        editable: true,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, other: 6 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, other: 6 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, other: 6 },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150, other: 6 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, other: 6 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, other: 6 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, other: 6 },
];

export default function DataGridDemo() {
    const [funcion, setFuncion] = React.useState('');

    const handleFuncionChange = (event) => {
        setFuncion(event.target.value);
    };

    rows.map(r => r.other = (<FormControl sx={{ m: 1, minWidth: 80 }}>
        <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={funcion}
            onChange={handleFuncionChange}
            autoWidth
        >
            <MenuItem value={'usuario'}>Usuario</MenuItem>
            <MenuItem value={'creador'}>Creador</MenuItem>
        </Select>
    </FormControl>))

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
                sx={{ width: "50rem" }}
            />
        </div>
    );
}
