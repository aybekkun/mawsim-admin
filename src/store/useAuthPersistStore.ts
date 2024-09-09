import {create} from "zustand";
import { persist, devtools } from "zustand/middleware";
import { api } from "../api";
import { IAuthLogin, IAuthRegister, IAuthResponse } from "../services/auth/auth.types";

interface AuthState {
	user: IAuthResponse["data"] | null;
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
				signOut: () => set({ isAuth: false, token: null }),
				fetchCheckAuthMe: async () => {
					try {
						const { data } = await api.get("/auth_me");
						set({ isAuth: true, user: data });
					} catch (e) {
						console.log(e);
						set({ isAuth: false, token: null, user: null });
					}
				},
				fetchRegister: async (params) => {
					try {
						const { data } = await api.post<IAuthResponse>("/register", params);
						const token = data.token;
						window.localStorage.setItem("token", token);
						set({ isAuth: true, token: data.token, user: data.data });
					} catch (error) {
						console.log(error);
						set({ isAuth: false, token: null, user: null });
					}
				},
				fetchLogin: async (params) => {
					try {
						const { data } = await api.post<IAuthResponse>("/auth", params);
						const token = data.token;
						window.localStorage.setItem("token", token);
						set({ isAuth: true, token: data.token, user: data.data });
					} catch (error) {
						console.log(error);
						set({ isAuth: false, token: null, user: null });
					}
				},
			}),
			{ name: "auth" }
		),
		{ name: "auth" }
	)
);
