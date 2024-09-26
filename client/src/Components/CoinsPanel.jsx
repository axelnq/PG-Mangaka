import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function createData(cantidad, fecha) {
    return { cantidad, fecha };
}

const rows = [
    createData(10, '24/12/21'),
    createData(15, '31/12/21'),
    createData(5, '03/01/22'),
    createData(25, '10/01/22'),
    createData(50, '11/01/22'),
];

export default function CoinsPanel() {
    return (
        <div><TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Cantidad</TableCell>
                        <TableCell align="center">Fecha</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" component="th" scope="row">
                                {row.cantidad}
                            </TableCell>
                            <TableCell align="center">{row.fecha}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}
