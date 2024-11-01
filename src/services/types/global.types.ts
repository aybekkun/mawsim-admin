export type TPaginationLink = {
	url: string | null;
	label: string;
	active: boolean;
};
export type TPaginationResponse = {
	current_page: number;
	from: number | null;
	last_page: number;
	links: TPaginationLink[];
	path: string;
	per_page: number;
	to: number | null;
	total: number;
};

export type TGetParams = {
	page?: number;
	search?: string;
	date?: string;
	limit?: number;
	sort_price?: "asc" | "desc";
	status_id?: number;
	is_takeaway?: number;
	role_id?: number | string;
};

export type TFood = {
	id: number;
	price: number;
	food: {
		id: number;
		name: string;
		stock: number;
		images: {
			id: number;
			image_url: string;
		}[];
		format: TFormat;
		category: TCategory;
	};
	quantity: string;
};

export type TCategory = {
	id: number;
	name: string;
};

export type TFormat = {
	id: number;
	name: string;
};
