import { TPaginationResponse } from "../types/global.types";

export type TDirectorSalaryResponse = {
	data: TDirectorUser[];
	meta: TPaginationResponse;
};

export type TDirectorParams = {
	id?: number;
	page?: number;
	limit?: number;
	from?: string;
	to?: string;
	role_id?: number | string;
	search?: string;
	expense_limit?: number;
	category_id?: number;
	enabled?: boolean;
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
