import Signup from "./Signup.jsx";
import Login from './Login'
import Logout from './Logout'
import { useState } from "react";
import PrivateText from "./PrivateText.jsx";
import AppRoutes from "./AppRoutes.jsx";
import {BrowserRouter as Router} from "react-router-dom";
const User = ({currUser, setCurrUser}) => {
    const [show, setShow]=useState(true)
    if(currUser)
        return (
            <div>
                Hello {currUser.email}
                <Router>
                    <AppRoutes currUser={currUser}/>
                </Router>
                <PrivateText currUser={currUser}/>
                <Logout setCurrUser={setCurrUser}/>
            </div>
        )
    return (
        <div>
            { show?
                <Login setCurrUser={setCurrUser} setShow={setShow}/>
                :
                <Signup setCurrUser={setCurrUser}  setShow={setShow} />
            }
        </div>
    )
}
export default User