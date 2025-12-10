import axios from "axios";
import Cookies from "js-cookie";
export const API_URL_DEV =
	import.meta.env.VITE_API_BASE_URL ?? "http://localhost:1303";
export const API_URL_PRODUCTION =
	import.meta.env.VITE_API_URL_PRODUCTION ??
	"https://foodiehub-qt-a813181fc04e.herokuapp.com";

// dùng import.meta.env.DEV thay vì MODE
const IS_DEV = Boolean(import.meta.env.DEV);

// chọn base URL: dev khi chạy dev, còn lại dùng production nếu có, nếu không fallback về dev
export const API_BASE_URL_USED = IS_DEV
	? API_URL_DEV
	: API_URL_PRODUCTION || API_URL_DEV;
const instance = axios.create({
	baseURL: API_BASE_URL_USED,
});
instance.defaults.headers.common["Content-Type"] = "multipart/form-data";

//validate response
instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status === 401) {
			Cookies.remove("access_token");
			Cookies.remove("user_id");
			// return window.location.href = '/login'
		}
		return Promise.reject(error);
	}
);

// Set the AUTH token for any request
instance.interceptors.request.use((config) => {
	const token = Cookies.get("access_token");
	config.headers.Authorization = token ? `Bearer ${token}` : "";

	// Chỉ set Content-Type nếu không phải FormData
	const isFormData = config.data instanceof FormData;

	if (!isFormData) {
		if (config.method === "put") {
			config.headers["Content-Type"] = "application/x-www-form-urlencoded";
		} else {
			config.headers["Content-Type"] = "application/json";
		}
	}

	return config;
});

export default instance;
