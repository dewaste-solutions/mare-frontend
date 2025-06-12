import { env } from "@/app/env";
import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

// Request interceptor ID for cleanup
let requestInterceptorId: number;
let responseInterceptorId: number;

interface RetryConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

const SKIP_REFRESH_URLS = [
	"/api/auth/signin",
	"/api/auth/signout",
	"/api/auth/renew-access-token",
];

type RefreshTokenResponse = {
	message: string;
	data: string;
};

type QueueItem = {
	resolve: (token: string) => void;
	reject: (error: Error) => void;
};

// Track refresh state and failed requests
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
	// biome-ignore lint/complexity/noForEach: <explanation>
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else if (token) {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

export const AUTH_EVENTS = {
	SESSION_EXPIRED: "auth:session_expired",
} as const;

export const setupAuthInterceptor = () => {
	// Setup request interceptor to automatically add access token in headers
	requestInterceptorId = axios.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			const token = localStorage.getItem("accessToken");
			if (token && config.headers) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
	);

	responseInterceptorId = axios.interceptors.response.use(
		(response) => response,
		async (error: AxiosError) => {
			const originalRequest = error.config as RetryConfig;
			const requestUrl = originalRequest.url || "";
			const urlPath = new URL(requestUrl).pathname;

			// Skip token refresh for auth endpoints
			if (SKIP_REFRESH_URLS.some((url) => urlPath.includes(url))) {
				return Promise.reject(error);
			}

			// If not 401 or already retried, reject
			if (error.response?.status !== 401 || originalRequest._retry) {
				window.dispatchEvent(new Event(AUTH_EVENTS.SESSION_EXPIRED));
				return Promise.reject(error);
			}

			// If already refreshing, queue the request
			if (isRefreshing) {
				return new Promise<string>((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				}).then((token) => {
					if (originalRequest.headers) {
						originalRequest.headers.Authorization = `Bearer ${token}`;
					}
					return axios(originalRequest);
				});
			}

			// Start refresh process
			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const response = await axios.post<RefreshTokenResponse>(
					`${env.NEXT_PUBLIC_BACKEND_URL}/api/auth/renew-access-token`,
					{},
					{ withCredentials: true },
				);

				const newToken = response.data.data;
				localStorage.setItem("accessToken", newToken);

				// Update request header
				if (originalRequest.headers) {
					originalRequest.headers.Authorization = `Bearer ${newToken}`;
				}

				// Process queued requests
				processQueue(null, newToken);

				// Retry original request
				return axios(originalRequest);
			} catch (refreshError) {
				const error = refreshError as Error;
				processQueue(error, null);
				localStorage.removeItem("accessToken");

				window.dispatchEvent(new Event(AUTH_EVENTS.SESSION_EXPIRED));

				return Promise.reject(error);
			} finally {
				isRefreshing = false;
			}
		},
	);
};

export const removeAuthInterceptor = () => {
	axios.interceptors.request.eject(requestInterceptorId);
	axios.interceptors.response.eject(responseInterceptorId);
};
