import './App.css'
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./components/AppRoutes.jsx";
import {useState} from "react";
import User from './components/User'
import PrivateText from './components/PrivateText'

function App() {
    const [currUser, setCurrUser]=useState(null);
    return (
            <div className="App">
                <User currUser={currUser} setCurrUser={setCurrUser}/>
            </div>
    )
}

export default App
