import React, {useEffect, useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from "axios";
import {URL} from "../../consts";


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Customers() {
    const classes = useStyles();
    const [customers, setCustomers] = useState([]);
    useEffect(()=> {
        axios({
            method: 'get',
            url: URL + '/customers',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        }).then(res => {
            setCustomers(prev => [...prev, ...res.data]);
        })
    }, [])
    return (
        <React.Fragment>
            <Title>Customers</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>S. No.</TableCell>
                        <TableCell>Customer Id</TableCell>
                        <TableCell>Customer Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((row, index) => (
                        <TableRow key={row.customer_id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.customer_id}</TableCell>
                            <TableCell>{row.customer_name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}