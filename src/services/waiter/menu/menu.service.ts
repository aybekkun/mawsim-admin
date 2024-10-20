import { api } from "@/api";
import { TGetParams } from "@/services/types/global.types";
import { TCreateOrderParams, TWaiterMenu, TWaiterTableResponse } from "./menu.types";

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
	async create(params: TCreateOrderParams) {
		const { data } = await api.post<TWaiterTableResponse>("/officiant/orders", {
			params,
			status_id: 1,
			is_takeaway: false,
		});
		return data;
	},
};
