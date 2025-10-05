import React from "react";
import ManagerGeneral from "../Pages/Manager/ManagerDashboard/ManagerGeneral";
import ListUser from "../Pages/Manager/ListUser/ListUser";
import ListCV from "../Pages/Manager/ListCV/ListCV";
import ListRestaurant from "../Pages/Admin/ListRestaurant/ListRestaurant";
import AdminPaths from "../Paths/AdminPaths";

const AdminRoute=[
    {path: AdminPaths.GENERAL, element: <ManagerGeneral/>},
    {path: AdminPaths.LIST_USER, element: <ListUser/>},
    {path: AdminPaths.LIST_CV, element: <ListCV/>},
    {path: AdminPaths.LIST_RES, element: <ListRestaurant/>}
]

export default AdminRoute