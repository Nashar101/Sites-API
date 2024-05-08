import React from "react";
import {Route, Routes} from "react-router-dom";
import SitesList from "../features/sites/SitesList.jsx";
import Login from "../features/login/Login.jsx";
const AppRoutes=({currUser})=>{
    return (
        <div>
        <Routes>
            <Route path="/sites" element={<SitesList/>} currUser={currUser}/>
        </Routes>
        </div>
    )
}
export default AppRoutes