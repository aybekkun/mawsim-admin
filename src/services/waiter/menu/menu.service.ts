import { api } from "@/api";
import { TGetParams } from "@/services/types/global.types";
import {
	TAddOrder,
	TCreateOrderParams,
	TOrderResponse,
	TUpdateOrder,
	TWaiterMenu,
	TWaiterTableResponse,
} from "./menu.types";
import { uptime } from "process";

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
	async update(params: TUpdateOrder) {
		const { id, ...obj } = params;
		const { data } = await api.put<TWaiterTableResponse>(`/officiant/orders/${id}`, {
			...obj,
		});
		return data;
	},
	async addOrder(values: TAddOrder) {
		const { id, ...obj } = values;
		const { data } = await api.put<TWaiterTableResponse>(`/officiant/append-order/${id}`, { ...obj });
		return data;
	},
	async delete(id: number) {
		return await api.delete(`/officiant/orders/${id}`);
	},
};

export const OrderService = {
	async update(id: number, status_id: number) {
		return api.put(`/order/status/${id}`, { status_id });
	},
};
