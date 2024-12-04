import { TPaginationResponse } from "@/services/types/global.types";
import { TFoodName } from "../food/food.types";

export type TMenuResponse = {
	data: TMenu[];
	meta: TPaginationResponse;
};

export type TMenu = {
	id: number;
	price: number;
	food: TFoodName;
};
