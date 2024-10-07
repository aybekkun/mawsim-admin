import { api } from "@/api";
import { TOtherExpenseResponse, TSalaryResponse } from "./expense.types";

export const OtherExpenseService = {
	async getAll(page: number = 1) {
		const { data } = await api.get<TOtherExpenseResponse>(`/admin/other-expenses?page=${page}&sort_date=desc`);
		return data;
	},
	async create(comment: string, amount: number) {
		return api.post("/admin/other-expenses", { amount, comment, expense_id: 3 });
	},
	async update(id: number, comment: string, amount: number) {
		return api.put(`/admin/other-expenses/${id}`, { amount, comment, expense_id: 3 });
	},
	async delete(id: number) {
		return api.delete(`/admin/other-expenses/${id}`);
	},
};

export const SalaryService = {
	async getAll(page: number = 1) {
		const { data } = await api.get<TSalaryResponse>(`/admin/salaries?page=${page}&date=desc`);
		return data;
	},
	async create(user_id: number, amount: number) {
		return api.post("/admin/salaries", { user_id, amount, expense_id: 4 });
	},
	async update(id: number, user_id: number, amount: number) {
		return api.put(`/admin/salaries/${id}`, { user_id, amount });
	},
	async delete(id: number) {
		return api.delete(`/admin/salaries/${id}`);
	},
};
