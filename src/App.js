import React from 'react';
import './App.css';
import Routes from './Routes';
import Navbar from "./components/Dashboard/Navbar";
import SignInSide from './components/SignInSide';

function App() {
    return (
        <div className="App">
            {localStorage.getItem('auth') && <Navbar/>}
            <Routes/>
        </div>
    );
}

export default App;
