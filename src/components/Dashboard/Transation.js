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
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Transations(props) {
    const classes = useStyles();
    const [transations, setTransations] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [newTransation, setNewTransation] = useState({
        customer_id: null,
        product_id: null,
        transation_type: 'OUT',
        quantity: null,
        transation_id_parent: null
    })

    useEffect(()=> {
        axios({
            method: 'get',
            url: URL + '/transations',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        }).then(res => {
            setTransations(prev => [...prev, ...res.data]);
        })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: URL + '/transations',
            data: newTransation,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        }).then(res => {
            console.log("successfully submitted");
            setTransations(prev => [...prev, ...res.data ]);
            setOpen(false);
        }).catch(error => {
            console.log('error', error.response.data);
            alert('something went wrong');
            props.history.push("/transations");
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    }

    const handleChange = (event) => {
        setNewTransation({...newTransation, transation_type: event.target.value});
    };

    const dateformat = (datetime) =>{
        let d = new Date(datetime);
        return `${d.getFullYear()}-${ ("0" + d.getMonth()).slice(-2)}-${ ("0" + d.getDate()).slice(-2)} ${ ("0" + d.getHours()).slice(-2)}:${ ("0" + d.getMinutes()).slice(-2)}:${ ("0" + d.getSeconds()).slice(-2)}`
    }
    return (
        <React.Fragment>
            <Title>Transations</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>S. No.</TableCell>
                        <TableCell>Transations Id</TableCell>
                        <TableCell>Transations Date</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Product Title</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell align="right">Transation Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transations.map((row, index) => (
                        <TableRow key={row.transation_id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.transation_id}</TableCell>
                            <TableCell>{dateformat(row.transation_date_time)}</TableCell>
                            <TableCell>{row.customer.customer_name}</TableCell>
                            <TableCell>{row.product.product_title}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                            <TableCell align="center">{row.transation_type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className='add-transation-btn'>
                <IconButton aria-label="add" color="primary" onClick={handleClickOpen}>
                    <AddCircleOutlineIcon fontSize='large' />
                </IconButton>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <form onSubmit={event => handleSubmit(event)}>
                    <DialogTitle id="form-dialog-title">Add New Transation</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Customer ID"
                            type="text"
                            value={newTransation.customer_id}
                            onChange={e => setNewTransation({...newTransation, customer_id: e.target.value})}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Product ID"
                            type="text"
                            value={newTransation.product_id}
                            onChange={e => setNewTransation({...newTransation, product_id: e.target.value})}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Quantity"
                            type="text"
                            value={newTransation.quantity}
                            onChange={e => setNewTransation({...newTransation, quantity: e.target.value})}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Parent Transation ID (*if item come back to inventory )"
                            type="text"
                            value={newTransation.transation_id_parent}
                            onChange={e => setNewTransation({...newTransation, transation_id_parent: e.target.value})}
                            fullWidth
                        />
                        <FormControl component="fieldset" style={{marginTop: '30px'}}>
                            <FormLabel component="legend">Transation Type</FormLabel>
                            <RadioGroup aria-label="gender" name="transation_type" value={newTransation.transation_type} onChange={handleChange}>
                                <FormControlLabel value="OUT" control={<Radio />} label="OUT" />
                                <FormControlLabel value="IN" control={<Radio />} label="IN" />
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" className={classes.btnWoOutline}>
                            Cancel
                        </Button>
                        <Button type='submit' color="primary"
                                className={classes.btnWoOutline}>
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </React.Fragment>
    );
}