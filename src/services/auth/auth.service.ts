import { api } from "@/api";
import { IAuthGetAllResponse } from "./auth.types";

export const AuthService = {
	async getAll() {
		const { data } = await api.get<IAuthGetAllResponse>("/admin/users");
		return data;
	},
};
