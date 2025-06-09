import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

// Create interceptor ID storage
let authInterceptorId: number;

// Add the interceptor
export const setupAuthInterceptor = () => {
	authInterceptorId = axios.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			const token = sessionStorage.getItem("accessToken");
			if (token && config.headers) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
	);
};

// Remove the interceptor
export const removeAuthInterceptor = () => {
	axios.interceptors.request.eject(authInterceptorId);
};
