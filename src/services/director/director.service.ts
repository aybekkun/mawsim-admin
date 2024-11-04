import { api } from "@/api";
import {
	TDetailSalaryResponse,
	TDirectorParams,
	TDirectorSalaryResponse,
	TFoodDetailExpenseResponse,
	TFoodExpenseResponse,
	TOrderStatsResponse,
	TOtherExpenseResponse,
	TProductsDetailExpenseResponse,
	TProductsExpenseResponse,
	TWareHouseResponse,
} from "./director.types";
import { get } from "http";

export const DirectorSalaryService = {
	async getAll(params: TDirectorParams) {
		const { from, to, ...obj } = params;
		const date = from && to ? `?date[]=${from}&date[]=${to}` : "";
		const { data } = await api.get<TDirectorSalaryResponse>(`/dashboard/salaries${date}`, {
			params: {
				...obj,
			},
		});
		return data;
	},
	async getOne(params: TDirectorParams) {
		const { from, to, id, ...obj } = params;
		const date = from && to ? `?date[]=${from}&date[]=${to}` : "";
		const { data } = await api.get<TDetailSalaryResponse>(`/dashboard/salaries/${id}${date}`, {
			params: {
				...obj,
			},
		});
		return data;
	},
};

export const DirectorExpenseService = {
	async getAllProducts(params: TDirectorParams) {
		const { data } = await api.get<TProductsExpenseResponse>(`/dashboard/expenses/products`, {
			params,
		});
		return data;
	},
	async getOneProducts(params: TDirectorParams) {
		const { from, to, id, ...obj } = params;
		const date = from && to ? `?date[]=${from}&date[]=${to}` : "";
		const { data } = await api.get<TProductsDetailExpenseResponse>(`/dashboard/expenses/products/${id}${date}`, {
			params: {
				...obj,
			},
		});
		return data;
	},
	async getAllFood(params: TDirectorParams) {
		const { data } = await api.get<TFoodExpenseResponse>(`/dashboard/expenses/food-items`, {
			params,
		});
		return data;
	},
	async getOneFood(params: TDirectorParams) {
		const { from, to, id, ...obj } = params;
		const date = from && to ? `?date[]=${from}&date[]=${to}` : "";
		const { data } = await api.get<TFoodDetailExpenseResponse>(`/dashboard/expenses/food-items/${id}${date}`, {
			params: {
				...obj,
			},
		});
		return data;
	},
	async getAllOther(params: TDirectorParams) {
		const { from, to, ...obj } = params;
		const date = from && to ? `?date[]=${from}&date[]=${to}` : "";
		const { data } = await api.get<TOtherExpenseResponse>(`/dashboard/expenses/others${date}`, {
			params: {
				...obj,
			},
		});
		return data;
	},
};

export const WarehouseService = {
	async getProducts(params: TDirectorParams) {
		const { data } = await api.get<TWareHouseResponse>(`/dashboard/warehouses/products`, {
			params,
		});
		return data;
	},
	async getFood(params: TDirectorParams) {
		const { data } = await api.get<TWareHouseResponse>(`/dashboard/warehouses/food-items`, {
			params,
		});
		return data;
	},
};

export const OrderStatsService = {
	async getAll(params: TDirectorParams) {
		const { from, to, ...obj } = params;
		const date = from && to ? `?date[]=${from}&date[]=${to}` : "";
		const { data } = await api.get<TOrderStatsResponse>(`/dashboard/orders/statistics${date}`, {
			params: {
				...obj,
			},
		});
		return data;
	},
};
