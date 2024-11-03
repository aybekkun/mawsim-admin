import { TFood, TPaginationResponse } from "@/services/types/global.types";

export type TWaiterMenu = {
	data: TFood[];
	meta: TPaginationResponse;
};

export type TWaiterTableResponse = {

	data: {
		id: number;
		name: string;
	}[];
};

export type TCreateOrderParams = {
	cafe_table_id: number;
	is_takeaway: boolean;
	foods: {
		food_id: number;
		quantity: number;
	}[];
};

export type TOrderResponse = {
	data: TOrder[];
	meta: TPaginationResponse;
};
export type TOrderOneResponse = {
	data: TOrder;
};
export type TOrder = {
	id: number;
	price: string;
	is_takeaway: false;
	cafe_table: {
		id: number;
		name: string;
	};
	status: {
		id: number;
		name: string;
	};
	foods: {
		id: number;
		name: string;
		category: {
			id: number;
			name: string;
		};
		format: {
			id: number;
			name: string;
		};
		price: string;
		quantity: string;
	}[];
};

export type TAddOrder = {
	id: number;
	foods: {
		food_id: number; // cola
		quantity: number;
	}[];
};

export type TUpdateOrder = {
	id: number;
	cafe_table_id: number;
	foods: {
		food_id: number;
		quantity: number;
	}[];
	status_id: number;
	is_takeaway: boolean;
};
