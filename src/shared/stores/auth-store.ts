import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserProfile = {
	email: string;
	firstName: string;
	lastName: string;
	roleName: string;
	image: string;
};

type AuthStore = {
	user: UserProfile | null;
	setUser: (user: UserProfile | null) => void;
	clearUser: () => void;
};

// export const useAuthStore = create<AuthStore>((set, _get) => ({
// 	user: null,
// 	setUser: (user) => set({ user }),
// }));

export const useAuthStore = create<AuthStore>()(
	persist(
		(set, _get) => ({
			user: null,
			setUser: (user) => set({ user }),
			clearUser: () => {
				// Clear both Zustand state and localStorage
				set({ user: null });
				localStorage.removeItem("auth-storage");
			},
		}),
		{
			name: "auth-storage",
			// Only store non-sensitive data
			partialize: (state) => ({
				user: state.user
					? {
							email: state.user.email,
							firstName: state.user.firstName,
							lastName: state.user.lastName,
							roleName: state.user.roleName,
							image: state.user.image,
						}
					: null,
			}),
		},
	),
);
