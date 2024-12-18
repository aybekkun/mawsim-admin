import { api } from "@/api";
import { TFoodNameResponse, TFoodOne, TFoodResponse } from "./food.types";
import { TGetParams } from "@/services/types/global.types";

export const FoodNameService = {
	async getAll(params: TGetParams) {
		const { data } = await api.get<TFoodNameResponse>("/admin/food-items", { params });
		return data;
	},
	async getOne(id: number) {
		const { data } = await api.get(`/admin/food-items/${id}`);
		return data;
	},

	async create(fd: FormData) {
		return api.post("/admin/food-items", fd, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},

	async update(
		id: number,
		name: string,
		description: string,

		format_id: number,
		category_id: number
	) {
		return api.put(`/admin/food-items/${id}`, { name, format_id, category_id, description });
	},

	async delete(id: number) {
		return api.delete(`/admin/food-items/${id}`);
	},
};

export const FoodService = {
	async getAll(params: TGetParams) {
		const { data } = await api.get<TFoodResponse>("/admin/warehouses/food-items", {
			params,
		});
		return data;
	},
	async getOne(id: number) {
		const { data } = await api.get<TFoodOne>("/admin/warehouses/food-items/" + id);
		return data;
	},
	async updateExpense(id: number, price: number, quantity: number,expense_id:number) {
		return await api.put(`/admin/warehouses/food-items/${id}`, { warehouse_id: 1, expense_id, price, quantity });
	},
	async create(food_id: number, quantity: number, price: number) {
		return await api.post("/admin/warehouses/food-items", {
			food_id,
			price,
			quantity,
			warehouse_id: 1,
			expense_id: 1,
		});
	},
	async update(id: number, name: string, format_id: number) {
		return await api.put(`/admin/warehouses/food-items/${id}`, { name, format_id });
	},
};
