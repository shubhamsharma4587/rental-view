import React, {useContext, useEffect} from 'react'
import {UserContext} from '../context/user-context';
import {clearSession} from "./Utils";

function Logout(props) {
    const setUerDetails = useContext(UserContext).setUser;

    useEffect(() => {
        clearSession(props)
        setUerDetails({id: '', name: '', email: ''});
    }, [])


    return (
        <div></div>
    )
}

export default Logout
