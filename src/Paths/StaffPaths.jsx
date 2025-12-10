const GENERAL = {
	HOME: "/home",
};

const USER = {
	PROFILE: "/profile",
};

const RESTAURANT = {
	MY_RES: "/my-restaurants",
	RES_DETAIL: "/restaurant/:restaurantId",
	RES_TABLE: "/restaurant/:restaurantId/table",
	RES_MENU: "/restaurant/:restaurantId/menu",
	RES_MAP: "/map",
	STAFF_ORDER: "/restaurant/:restaurantId/:bookTableId/menu",
	TABLE_HISTORY: "/booking-history",
};

export default {
	...USER,
	...GENERAL,
	...RESTAURANT,
};
