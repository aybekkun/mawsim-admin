import { api } from "@/api";
import { TUserResponse, TUserUpdate } from "./auth.types";
import { TGetParams } from "../types/global.types";

export const AuthService = {
	async getAll(params: TGetParams) {
		const { data } = await api.get<TUserResponse>("/admin/users", { params });
		return data;
	},
	async create(params: TUserUpdate) {
		const { data } = await api.post(`/admin/users`, { ...params });
		return data;
	},
	async update(params: TUserUpdate) {
		const { id, ...obj } = params;
		const { data } = await api.put(`/admin/users/${id}`, { ...obj });
		return data;
	},
	async delete(id: number) {
		const { data } = await api.delete(`/admin/users/${id}`);
		return data;
	},
};
