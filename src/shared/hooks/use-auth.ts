import { env } from "@/app/env";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
	AUTH_EVENTS,
	removeAuthInterceptor,
	setupAuthInterceptor,
} from "../helper/auth-interceptor";
import { useAuthStore } from "../stores/auth-store";

type LoginCredentials = {
	email: string;
	password: string;
};

type AuthResponse = {
	message: string;
	data: string;
};

type UserProfile = {
	email: string;
	firstName: string;
	lastName: string;
	roleName: string;
	image: string;
};

type ProfileResponse = {
	message: string;
	data: UserProfile;
};

export const useAuth = () => {
	const router = useRouter();
	const { user, setUser, clearUser } = useAuthStore();
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [isSigningOut, setIsSigningOut] = useState(false);
	const [isFetchingProfile, setIsFetchingProfile] = useState(false);

	const URL = env.NEXT_PUBLIC_BACKEND_URL;

	const fetchProfile = async () => {
		try {
			setIsFetchingProfile(true);
			const response = await axios.get<ProfileResponse>(
				`${URL}/api/auth/profile`,
				{ withCredentials: true },
			);
			setUser(response.data.data);
			return response.data.data;
		} catch (error) {
			clearUser();
			throw error;
		} finally {
			setIsFetchingProfile(false);
		}
	};

	const signIn = async (credentials: LoginCredentials) => {
		try {
			setIsSigningIn(true);
			const response = await axios.post<AuthResponse>(
				`${URL}/api/auth/signin`,
				credentials,
				{ withCredentials: true },
			);

			const accessToken = response.data.data;
			localStorage.setItem("accessToken", accessToken);
			setupAuthInterceptor();

			toast.success("Successfully signed in");
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 401) {
				toast.error("Invalid email or password");
			} else {
				toast.error("An error occurred during sign in");
			}
		} finally {
			await new Promise((resolve) => setTimeout(resolve, 500));
			setIsSigningIn(false);
		}
	};

	// remove everything
	// - interceptor, user, access token from local storage
	const signOut = async () => {
		try {
			setIsSigningOut(true);
			await axios.post(
				`${URL}/api/auth/signout`,
				{},
				{ withCredentials: true },
			);
			localStorage.removeItem("accessToken");
			clearUser();
			removeAuthInterceptor();

			toast.success("Successfully signed out");
		} catch (_error) {
			toast.error("Error signing out");
		} finally {
			await new Promise((resolve) => setTimeout(resolve, 500));
			setIsSigningOut(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");

		// this statement will run only if the user logged in but no value from userState
		if (accessToken !== null && !user) {
			setupAuthInterceptor();
			const initProfile = async () => {
				try {
					await fetchProfile();
				} catch (_error) {}
			};

			initProfile();
		}
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// this function will run when auth-interceptors got 401 then try again but still failed
		const handleSessionExpired = async () => {
			toast.error("Session expired. Please login again.");
			await signOut();
			router.push("login");
		};

		window.addEventListener(AUTH_EVENTS.SESSION_EXPIRED, handleSessionExpired);

		return () => {
			// Cleanup listener when component unmounts
			window.removeEventListener(
				AUTH_EVENTS.SESSION_EXPIRED,
				handleSessionExpired,
			);
		};
	}, []);

	return {
		user,
		isSigningIn,
		isSigningOut,
		isFetchingProfile,
		signIn,
		signOut,
		fetchProfile,
	};
};
