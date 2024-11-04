import { TOtherExpense } from "./../administrator/expense/expense.types";
import { TPaginationResponse } from "../types/global.types";

export type TDirectorSalaryResponse = {
	data: TDirectorUser[];
	meta: TPaginationResponse;
};

export type TDirectorParams = {
	sort_amount?: "asc" | "desc";
	sort_date?: "asc" | "desc";
	id?: number;
	page?: number;
	limit?: number;
	from?: string;
	to?: string;
	role_id?: number | string;
	search?: string;
	expense_limit?: number;
	category_id?: number;
	format_id?: number;
};

export type TDirectorUser = {
	id: number;
	name: string;
	phone: string;
	total_amount: 0 | string;
	role: {
		id: number;
		name: string;
	};
	salaries: {
		id: number;
		amount: string;
		date: string;
		category: {
			id: number;
			name: string;
		};
	}[];
};

export type TDetailSalaryResponse = {
	data: TDirectorUser;
};

export type TProductsExpenseResponse = {
	data: TProductsExpense[];
	meta: TPaginationResponse;
};

export type TProductsDetailExpenseResponse = {
	data: TProductsExpense;
};
export type TProductsExpense = {
	id: number;
	name: string;
	stock: string;
	format: {
		id: number;
		name: string;
	};
	expenses: {
		id: number;
		quantity: string;
		per_price: string;
		price: string;
		date: string;
	}[];
};

export type TFoodExpenseResponse = {
	data: TFoodExpense[];
	meta: TPaginationResponse;
};

export type TFoodDetailExpenseResponse = {
	data: TFoodExpense;
};
export type TFoodExpense = {
	id: number;
	name: string;
	stock: string;
	format: {
		id: number;
		name: string;
	};
	category: {
		id: number;
		name: string;
	};
	expenses: {
		id: number;
		quantity: string;
		per_price: string;
		price: string;
		date: string;
	}[];
};

export type TOtherExpenseResponse = {
	data: TOtherExpense[];
	meta: TPaginationResponse;
};

export type TWareHouseResponse = {
	data: TFoodExpense[];
	meta: TPaginationResponse;
};

export type TOrderStatsResponse = {
	data: TOrderStats[];
	meta: TPaginationResponse;
};

export type TOrderStats = {
	year: number;
	month: string;
	total_orders: number;
	total_income: string;
};
