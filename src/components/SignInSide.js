import React, {useState, useContext, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import {UserContext} from '../context/user-context';
import {URL} from '../consts';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        position: 'inherit',
        top: '0px',
        left: '-240px',
        width: 'calc(100% + 240px)',
        zIndex: '10001',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInSide(props) {
    const classes = useStyles();
    const setUerDetails = useContext(UserContext).setUser;

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        isLoading: false,
        error: ''
    })

    const handleSubmit = async event => {
        event.preventDefault();

        try {

            axios({
                method: 'post',
                url: URL + '/login',
                data: {user: {email: user.email, password: user.password}},
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*'
                }
            }).then(res => {
                console.log("Login success", res.data);
                setUerDetails(res.data);
                localStorage.setItem('user_id', res.data.user_id);
                localStorage.setItem('email', res.data.email)
                localStorage.setItem('auth', true);
                // let { from } = props.location.state || { from: { pathname: '/dashboard' } } // retrieves the URL set on the PrivateRoute component above
                // props.history.push(from);

                window.location.href = '/dashboard'
                // props.history.push("/dashboard");

            })
                .catch(error => {
                    if (error.response && error.response.status !== 200) {
                        setUser(prev => ({
                            ...prev,
                            isLoading: false,
                            error: error.response.data.error
                        }))
                        alert(error.response.data.error);
                    }
                })
        } catch (e) {
            alert("Some thing went Wrong")
            setUser({...user, isLoading: false})
        }
    };

    useEffect(() => {
        if (localStorage.getItem('auth'))
            props.history.push("/dashboard");
    }, [])

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={user.email}
                            onChange={e => setUser({...user, email: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={user.password}
                            onChange={e => setUser({...user, password: e.target.value})}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}