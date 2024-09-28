export type TProductsNameResponse = {
	data: TProductsName[];
};

export type TProductsName = {
	id: number;
	name: string;
	format_id: number;
	format: {
		id: number;
		name: string;
		created_at: Date;
		updated_at: Date;
	};
};

export type TProductsResponse = {
	data: TProducts[];
};

export type TProducts = {
	id: number;
	name: string;
	format: {
		id: number;
		name: string;
	};
	stock: string | null;
};

export type TProductsOne = {
	data: {
		id: number;
		name: string;
		stock: string | null;
		format: {
			id: number;
			name: string;
		};
		expenses: {
			id: number;
			quantity: string;
			price: string;
			per_price: string;
			date: Date;
		}[];
	};
};
