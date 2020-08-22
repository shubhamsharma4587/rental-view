import React, {useEffect, useState} from 'react';
import axios from "axios";
import {URL} from "../consts";

export const UserContext = React.createContext({
    id: '',
    name: '',
    email: '',
    setUser: (userDetails) => {
    }
})

export default props => {
    const [user, setUser] = useState();

    const userHandler = (userDetails) => {
        setUser(prev => ({...prev, ...userDetails}))
    }

    useEffect(() => {
        if (localStorage.getItem("user_id") && localStorage.getItem("user_id").length > 0) {
            axios({
                method: 'post',
                url: URL + '/get_user',
                data: {user_id: localStorage.getItem("user_id")}
            }).then(res => {
                if (res.status === 200)
                    userHandler(res.data)
            });
        }
    }, []);


    return (
        <UserContext.Provider value={{...user, setUser: userHandler}}>
            {props.children}
        </UserContext.Provider>
    )
}
