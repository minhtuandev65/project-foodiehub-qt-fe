import React from "react";
import StaffPaths from "../Paths/StaffPaths";
import Profile from "../Pages/Profile/Profile";
import Home from "../Pages/Home/Home";

const StaffRoutes=[
    {path: StaffPaths.PROFILE, element: <Profile/> },
    {path: StaffPaths.HOME, element: <Home/> }
]

export default StaffRoutes