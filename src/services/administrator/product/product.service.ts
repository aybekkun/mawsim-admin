import { api } from "@/api";
import {  TProductsNameResponse, TProductsOne, TProductsResponse } from "./product.types";

export const ProdcutsNameService = {
	async getAll() {
		const { data } = await api.get<TProductsNameResponse>("/admin/products");
		return data;
	},

	async create(name: string, format_id: number) {
		return api.post("/admin/products", { name, format_id });
	},
	async update(id: number, name: string, format_id: number) {
		return api.put(`/admin/products/${id}`, { name, format_id });
	},
	async delete(id: number) {
		return api.delete(`/admin/products/${id}`);
	},
};

export const ProductsService = {
	async getAll() {
		const { data } = await api.get<TProductsResponse>("/admin/warehouses/products");
		return data;
	},
	async getOne(id: number) {
		const { data } = await api.get<TProductsOne>("/admin/warehouses/products/" + id);
		return data;
	},
	async create(product_id: number, quantity: number, price: number) {
		return api.post("/admin/warehouses/products", { product_id, price, quantity, warehouse_id: 2, expense_id: 2 });
	},
	async update(id: number, name: string, format_id: number) {
		return api.put(`/admin/warehouses/products/${id}`, { name, format_id });
	},
};
