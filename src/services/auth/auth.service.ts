import { api } from "@/api";
import { IAuthGetAllResponse } from "./auth.types";

export const AuthService = {
	async getAll() {
		const { data } = await api.get<IAuthGetAllResponse>("/admin/users");
		return data;
	},
	async create(name: string, phone: string, password: string) {
		const { data } = await api.post(`/admin/users`, { name, phone, password, role_id: 6 });
		return data;
	},
	async update(id: number, name: string, phone: string, password: string, role_id: number) {
		const { data } = await api.put(`/admin/users/${id}`, { name, phone, password, role_id });
		return data;
	},
	async delete(id: number) {
		const { data } = await api.delete(`/admin/users/${id}`);
		return data;
	},
};
