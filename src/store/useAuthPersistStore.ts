import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { api } from "../api";
import { IAuthLogin, IAuthRegister, IAuthResponse } from "../services/auth/auth.types";
import { toast } from "@/hooks/use-toast";

interface AuthState {
	user: IAuthResponse["data"]["user"] | null;
	isAuth: boolean;
	token: string | null;
	signOut: () => void;
	fetchCheckAuthMe: () => Promise<void>;
	fetchRegister: (params: IAuthRegister) => Promise<void>;
	fetchLogin: (params: IAuthLogin) => Promise<void>;
}

export const useAuthPersistStore = create(
	devtools(
		persist<AuthState>(
			(set) => ({
				user: null,
				isAuth: false,
				token: null,
				signOut: () => {
					set({ isAuth: false, token: null, user: null });
					window.localStorage.clear();
				},
				fetchCheckAuthMe: async () => {
					try {
						const { data } = await api.get("/auth/user");
						set({ isAuth: true, user: data.data });
					} catch (e) {
						console.log(e);
						set({ isAuth: false, token: null, user: null });
					}
				},
				fetchRegister: async (params) => {
					try {
						const { data } = await api.post<IAuthResponse>("/register", params);
						const token = data.data.token;
						window.localStorage.setItem("token", token);
						set({ isAuth: true, token: token, user: data.data.user });
					} catch (error) {
						console.log(error);
						set({ isAuth: false, token: null, user: null });
					}
				},
				fetchLogin: async (params) => {
					try {
						const { data } = await api.post<IAuthResponse>("/auth/login", params);
						const token = data.data.token;
						window.localStorage.setItem("token", token);
						set({ isAuth: true, token: token, user: data.data.user });
					} catch (error) {
						console.log(error);
						toast({
							title: "Error",
							description: "Логин или пароль не верен",
							variant: "destructive",
						});
						set({ isAuth: false, token: null, user: null });
					}
				},
			}),
			{ name: "auth" }
		),
		{ name: "auth" }
	)
);
