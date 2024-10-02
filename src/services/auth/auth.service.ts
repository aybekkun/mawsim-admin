import { api } from "@/api";
import { IAuthGetAllResponse } from "./auth.types";

export const AuthService = {
	async getAll() {
		const { data } = await api.get<IAuthGetAllResponse>("/admin/users");
		return data;
	},
	async update(id: number, name: string, phone: string, password: string, role_id: number) {
		const { data } = await api.put(`/admin/users/${id}`, { name, phone, password, role_id });
		return data;
	},
};
