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
	foods: {
		food_id: number;
		quantity: number;
	}[];
};
