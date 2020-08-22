import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from "axios";
import {URL} from "../../consts";
import {Link} from 'react-router-dom';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Reports() {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    useEffect(()=> {
        axios({
            method: 'get',
            url: URL + '/products',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        }).then(res => {
            setProducts(prev => [...prev, ...res.data]);
        })
    }, [])
    return (
        <React.Fragment>
            <Title>Inventory Summary Report</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>S. No.</TableCell>
                        <TableCell>Item Id</TableCell>
                        <TableCell>Item Name</TableCell>
                        <TableCell>Available Quantity</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((row, index) => (
                        <TableRow key={row.product_id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.product_id}</TableCell>
                            <TableCell>{row.product_title}</TableCell>
                            <TableCell>{row.quantity_total-row.quantity_booked}</TableCell>
                            <TableCell><Link to={`/detail_report/${row.product_id}`} className="detail-report">Detail Report</Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}