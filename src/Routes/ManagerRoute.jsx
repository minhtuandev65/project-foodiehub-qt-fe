import React from "react";
import ManagerPaths from "../Paths/ManagerPaths";
import ManagerGeneral from "../Pages/Manager/ManagerDashboard/ManagerGeneral";
import ListUser from "../Pages/Manager/ListUser/ListUser";
import ListCV from "../Pages/Manager/ListCV/ListCV";
import ListRestaurant from "../Pages/Manager/Restaurant/ListRestaurant";
import RestaurantDetail from "../Pages/Manager/Restaurant/RestaurantDetail";
import Table from "../Pages/Manager/Table/Table";
import Menu from "../Pages/Manager/Restaurant/Menu";

const ManagerRoute = [
	{ path: ManagerPaths.GENERAL, element: <ManagerGeneral /> },
	{ path: ManagerPaths.LIST_USER, element: <ListUser /> },
	{ path: ManagerPaths.LIST_CV, element: <ListCV /> },
	{ path: ManagerPaths.LIST_RES, element: <ListRestaurant /> },
	{ path: ManagerPaths.RES_DETAIL, element: <RestaurantDetail /> },
	{ path: ManagerPaths.RES_TABLE, element: <Table /> },
	{ path: ManagerPaths.RES_MENU, element: <Menu /> },
];

export default ManagerRoute;
