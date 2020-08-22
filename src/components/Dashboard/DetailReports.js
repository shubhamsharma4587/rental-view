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
import Typography from '@material-ui/core/Typography';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function DetailReports(props) {
    const classes = useStyles();
    const [product, setProduct] = useState([]);
    const product_id = props.match.params.id;
    useEffect(()=> {
        axios({
            method: 'get',
            url: URL + `/products/${product_id}`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        }).then(res => {
            setProduct(res.data[0]);
        })
    }, [])

    const dateformat = (datetime) => {
        let d = new Date(datetime);
        return `${d.getFullYear()}-${("0" + d.getMonth()).slice(-2)}-${("0" + d.getDate()).slice(-2)} ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}:${("0" + d.getSeconds()).slice(-2)}`
    }

    return (
        <React.Fragment>
            <Title>Detail Report</Title>
            <div style={{margin: "10px"}}>
                <Typography variant="h6" align="left" paragraph={true} gutterBottom>
                    Item Name: {product.product_title}
                </Typography>
                <Typography variant="h6" align="left" paragraph={true} gutterBottom>
                    Available Quantity: {product.quantity_total - product.quantity_booked}
                </Typography>
            </div>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>S. No.</TableCell>
                        <TableCell>Transations ID</TableCell>
                        <TableCell>Date/Time</TableCell>
                        <TableCell>Transation Type</TableCell>
                        <TableCell>Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {product.transations != null && product.transations.map((row, index) => (
                        <TableRow key={row.transation_id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.transation_id}</TableCell>
                            <TableCell>{dateformat(row.transation_date_time)}</TableCell>
                            <TableCell>{row.transation_type}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}