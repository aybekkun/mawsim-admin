import { TPaginationResponse } from "@/services/types/global.types";

export type TOtherExpenseResponse = {
	data: TOtherExpense[];
	meta: TPaginationResponse;
};

export type TOtherExpense = {
	id: number;
	amount: string;
	comment: string;
	date: Date;
	expense: {
		id: number;
		name: string;
		created_at: Date;
		updated_at: Date;
	};
};

export type TSalaryResponse = {
	data: TSalaryExpense[];
	meta: TPaginationResponse;
};

export type TSalaryExpense = {
	id: number;
	amount: string;
	date: Date;
	expense: {
		id: number;
		name: string;
	};
	user: {
		id: number;
		name: string;
		phone: string;
	};
};
