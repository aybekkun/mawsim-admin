import { api } from "@/api";
import { TGetParams } from "@/services/types/global.types";
import { TCreateOrderParams, TOrderResponse, TWaiterMenu, TWaiterTableResponse } from "./menu.types";

export const WaiterMenuService = {
	async getAll(params: TGetParams) {
		const { data } = await api.get<TWaiterMenu>("/officiant/menu", {
			params,
		});
		return data;
	},
};

export const WaiterTableService = {
	async getAll(params: TGetParams) {
		const { data } = await api.get<TWaiterTableResponse>("/officiant/cafe-tables", {
			params,
		});
		return data;
	},
};

export const WaiterOrderService = {
	async getOne(id: number) {
		const { data } = await api.get<TOrderResponse>(`/officiant/orders/${id}`);
		return data;
	},
	async getAll(params: TGetParams) {
		const { data } = await api.get<TOrderResponse>("/officiant/orders", {
			params,
		});
		return data;
	},
	async create(params: TCreateOrderParams) {
		const { data } = await api.post<TWaiterTableResponse>("/officiant/orders", {
			...params,
			status_id: 1,
			is_takeaway: false,
		});
		return data;
	},
	async delete(id: number) {
		return await api.delete(`/officiant/orders/${id}`);
	}
};

export const OrderService = {
	async update(id: number, status_id: number) {
		return api.put(`/order/status/${id}`, { status_id });
	},
};
