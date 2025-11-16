import React from "react";
import StaffPaths from "../Paths/StaffPaths";
import Profile from "../Pages/Profile/Profile";
import Home from "../Pages/Home/Home";
import RestaurantDetail from "../Pages/Staff/Restaurant/RestaurantDetail";
import Table from "../Pages/Staff/Restaurant/Table";

const StaffRoutes=[
    {path: '/', element: <Home/> },
    {path: StaffPaths.PROFILE, element: <Profile/> },
    {path: StaffPaths.HOME, element: <Home/> },
    {path: StaffPaths.RES_DETAIL, element: <RestaurantDetail/> },
    {path: StaffPaths.RES_TABLE, element: <Table/> }
]

export default StaffRoutes