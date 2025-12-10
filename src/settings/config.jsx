export const API_URL_DEV = import.meta.env.VITE_API_BASE_URL;
export const API_URL_PRODUCTION = import.meta.env.VITE_API_URL_PRODUCTION;
// window.API_BASE_URL = API_BASE_URL; // nếu muốn gắn global

export const ROLE = {
	ADMIN: 1,
	MANAGER: 2,
	STAFF: 3,
	USER: 4,
};
export const GENDER = {
	MALE: 1,
	FEMALE: 2,
};
export const RESTAURANT_STATUS = {
	ACCEPT: 1,
	PENDING: 2,
	REJECT: 2,
};
