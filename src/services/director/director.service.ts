import { api } from "@/api";
import {
	TDetailSalaryResponse,
	TDirectorParams,
	TDirectorSalaryResponse,
	TProductsDetailExpenseResponse,
	TProductsExpenseResponse,
} from "./director.types";

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
		const { data } = await api.get<TProductsExpenseResponse>(`/dashboard/warehouses/products`, {
			params,
		});
		return data;
	},
	async getOneProducts(params: TDirectorParams) {
		const { from, to, id, ...obj } = params;
		const date = from && to ? `?date[]=${from}&date[]=${to}` : "";
		const { data } = await api.get<TProductsDetailExpenseResponse>(`/dashboard/salaries/${id}${date}`, {
			params: {
				...obj,
			},
		});
		return data;
	},
	
};
