import { TFoodName } from "../food/food.types";

export type TMenuResponse = {
	data: TMenu[];
};

export type TMenu = {
	id: number;
	price: number;
	food: TFoodName;
};
