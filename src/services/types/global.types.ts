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