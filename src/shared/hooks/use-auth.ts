import { env } from "@/app/env";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import {
	removeAuthInterceptor,
	setupAuthInterceptor,
} from "../helper/auth-interceptor";

interface LoginCredentials {
	email: string;
	password: string;
}

interface AuthResponse {
	message: string;
	data: string;
}

interface UserProfile {
	email: string;
	firstName: string;
	lastName: string;
	roleId: string;
	roleName: string;
}

interface ProfileResponse {
	message: string;
	data: UserProfile;
}

export const useAuth = () => {
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [isSigningOut, setIsSigningOut] = useState(false);
	const [isFetchingProfile, setIsFetchingProfile] = useState(false);
	const [user, setUser] = useState<UserProfile | null>(null);

	const URL = env.NEXT_PUBLIC_BACKEND_URL;

	const fetchProfile = async () => {
		try {
			setIsFetchingProfile(true);
			const response = await axios.get<ProfileResponse>(
				`${URL}/api/auth/profile`,
				{
					withCredentials: true,
				},
			);

			setUser(response.data.data);
			return response.data.data;
		} catch (error) {
			setUser(null);
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
				{
					withCredentials: true,
				},
			);

			const accessToken = response.data.data;
			sessionStorage.setItem("accessToken", accessToken);

			setupAuthInterceptor();

			await fetchProfile();
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 401) {
				toast.error("Invalid email or password");
			} else {
				toast.error("An error occurred during sign in");
			}
			throw error;
		} finally {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			setIsSigningIn(false);
		}
	};

	const signOut = async () => {
		try {
			setIsSigningOut(true);
			await axios.post(
				`${URL}/api/auth/signout`,
				{},
				{
					withCredentials: true,
				},
			);

			sessionStorage.removeItem("accessToken");
			setUser(null);
			removeAuthInterceptor();
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 401) {
				sessionStorage.removeItem("accessToken");
				setUser(null);
			} else {
				toast.error("Error signing out");
			}
		} finally {
			setIsSigningOut(false);
		}
	};

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
