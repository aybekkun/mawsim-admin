import { api } from "@/api";
import { TProduct, TProductList } from "./product.types";

export const ProdcutListService = {
	async getAll() {
		const { data } = await api.get<TProductList[]>("/productslist");
		return data;
	},
	async create(productName: string, type: string) {
		return api.post("/productslist", { productName, type });
	},
	async update(id: number, productName: string, type: string) {
		return api.patch(`/productslist/${id}`, { productName, type });
	},
	async delete(id: number) {
		return api.delete(`/productslist/${id}`);
	},
};

export const ProdcutService = {
	async getAll() {
		const { data } = await api.get<TProduct[]>("/products");
		return data;
	},
}