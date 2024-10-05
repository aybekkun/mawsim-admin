
export type TFoodNameResponse = {
	data: TFoodName[];
};

export type TFoodName = {
	id: number;
	name: string;
	description: string;
	category: {
		id: number;
		name: string;
	};
	format: {
		id: number;
		name: string;
	};
	images: {
		id: number;
		image_url: string;
	}[];
};

export type TFoodResponse = {
	data: TFood[];
};

export type TFood = {
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
	stock: string | null;
};

export type TFoodOne = {
	data: {
		id: number;
		name: string;
		stock: string | null;
		format: {
			id: number;
			name: string;
		};
		expense: {
			id: number;
			quantity: string;
			price: string;
			per_price: string;
			date: Date;
		}[];
	};
};
