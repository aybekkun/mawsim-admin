import { api } from "@/api";
import { TMenuResponse } from "./menu.types";

export const MenuService = {
	async getAll() {
		const { data } = await api.get<TMenuResponse>("/admin/menu");
		return data;
	},
	async getOne(id: number) {
		const { data } = await api.get<TMenuResponse>("/admin/menu/" + id);
		return data;
	},
	async create(food_id: number, price: number) {
		return api.post("/admin/menu", { food_id, price });
	},
	async update(id: number, price: number) {
		return api.put(`/admin/menu/${id}`, { price });
	},
	async delete(id: number) {
		return api.delete(`/admin/menu/${id}`);
	},
};
