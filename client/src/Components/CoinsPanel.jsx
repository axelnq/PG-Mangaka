import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function createData(cantidad, fecha) {
    return { cantidad, fecha };
}

export default function CoinsPanel(props) {
    let GetProps = null;
    if (props.BuyOrders) {
        GetProps = props.BuyOrders;
    } else if (props.SellOrders) {
        GetProps = props.SellOrders;
    }

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
                    {GetProps !== null && GetProps === props.BuyOrders ?
                        GetProps.map((row) => (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {row.value}
                                </TableCell>
                                <TableCell align="center">{row.createdAt.substr(0, 10)}</TableCell>
                            </TableRow>
                        ))
                        : GetProps.map((row) => (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {row.value}
                                </TableCell>
                                <TableCell align="center">{row.createdAt.substr(0, 10)}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}
