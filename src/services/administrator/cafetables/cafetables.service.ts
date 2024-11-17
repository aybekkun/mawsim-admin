import { api } from "@/api";
import { TCafeTablesResponse } from "./cafetables.types";

export const CafeTablesService = {
	async getAll() {
		const { data } = await api.get<TCafeTablesResponse>("/admin/cafe-tables");
		return data;
	},
	async update(id: number, name: string) {
		return await api.put(`/admin/cafe-tables/${id}`, { name });
	},
	async delete(id: number) {
		return await api.delete(`/admin/cafe-tables/${id}`);
	},
	async create(name: string) {
		return await api.post(`/admin/cafe-tables`, { name });
	},
};
