import React from "react";
import ManagerPaths from "../Paths/ManagerPaths";
import ManagerGeneral from "../Pages/Manager/ManagerDashboard/ManagerGeneral";
import ListUser from "../Pages/Manager/ListUser/ListUser";
import ListCV from "../Pages/Manager/ListCV/ListCV";
import ListRestaurant from "../Pages/Manager/ListRestaurant/ListRestaurant";

const ManagerRoute=[
    {path: ManagerPaths.GENERAL, element: <ManagerGeneral/>},
    {path: ManagerPaths.LIST_USER, element: <ListUser/>},
    {path: ManagerPaths.LIST_CV, element: <ListCV/>},
    {path: ManagerPaths.LIST_RES, element: <ListRestaurant/>}
]

export default ManagerRoute