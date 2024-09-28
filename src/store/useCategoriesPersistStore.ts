import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../api";

interface CategoriesState {
	categories: {
		id: number;
		name: string;
	}[];

	fetchCatergories: () => Promise<void>;
}
interface CategoriesResponse {
	data: {
		id: number;
		name: string;
	}[];
}
export const useCategoriesPersistStore = create(
	persist<CategoriesState>(
		(set) => ({
			categories: [
				{
					id: 1,
					name: "еда",
				},
				{
					id: 2,
					name: "напитки",
				},
			],
			fetchCatergories: async () => {
				try {
					const { data } = await api.get<CategoriesResponse>("/admin/categories");
					set({ categories: data.data });
				} catch (error) {
					console.log(error);
				}
			},
		}),
		{ name: "categories" }
	)
);
