import React from "react";
import StaffPaths from "../Paths/StaffPaths";
import Profile from "../Pages/Profile/Profile";
import Home from "../Pages/Home/Home";
import RestaurantDetail from "../Pages/Staff/Restaurant/RestaurantDetail";
import Table from "../Pages/Staff/Restaurant/Table";
import Map from "../Pages/Map/Map";
import Menu from "../Pages/Staff/Restaurant/Menu";
import ListTable from "../Pages/Staff/Restaurant/ListTable";
import MenuStaff from "../Pages/Staff/Restaurant/MenuStaff";
import BookingHistory from "../Pages/Staff/BookingHistory/BookingHistory";


const StaffRoutes = [
	{ path: "/", element: <Home /> },
	{ path: StaffPaths.PROFILE, element: <Profile /> },
	{ path: StaffPaths.HOME, element: <Home /> },
	{ path: StaffPaths.RES_DETAIL, element: <RestaurantDetail /> },
	{ path: StaffPaths.RES_TABLE, element: <Table /> },
	{ path: StaffPaths.RES_MENU, element: <Menu /> },
	{ path: StaffPaths.RES_MAP, element: <Map /> },
	{ path: StaffPaths.MY_RES, element: <ListTable /> },
	{ path: StaffPaths.STAFF_ORDER, element: <MenuStaff /> },
	{ path: StaffPaths.TABLE_HISTORY, element: <BookingHistory /> },

];

export default StaffRoutes;
