import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TDirectorParams } from "./director.types";
import { DirectorExpenseService, DirectorSalaryService, OrderStatsService, WarehouseService } from "./director.service";

export const useGetAllDirectorSalaryQuery = (params: TDirectorParams) => {
	return useQuery({
		queryKey: ["director salary", ...Object.values(params)],
		queryFn: () => DirectorSalaryService.getAll(params),
	});
};

export const useDetailSalaryQuery = (params: TDirectorParams, enabled: boolean) => {
	return useQuery({
		queryKey: ["director salary detail", ...Object.values(params)],
		queryFn: () => DirectorSalaryService.getOne(params),
		enabled: enabled,
	});
};

export const useGetProductsExpenseQuery = (params: TDirectorParams) => {
	return useQuery({
		queryKey: ["director products", ...Object.values(params)],
		queryFn: () => DirectorExpenseService.getAllProducts(params),
		placeholderData: keepPreviousData,
	});
};

export const useDetailProductsExpenseQuery = (params: TDirectorParams, enabled: boolean) => {
	return useQuery({
		queryKey: ["director products detail", ...Object.values(params)],
		queryFn: () => DirectorExpenseService.getOneProducts(params),
		placeholderData: keepPreviousData,
		enabled: enabled,
	});
};

export const useGetFoodExpenseQuery = (params: TDirectorParams) => {
	return useQuery({
		queryKey: ["director food", ...Object.values(params)],
		queryFn: () => DirectorExpenseService.getAllFood(params),
		placeholderData: keepPreviousData,
	});
};

export const useDetailFoodExpenseQuery = (params: TDirectorParams, enabled: boolean) => {
	return useQuery({
		queryKey: ["director food detail", ...Object.values(params)],
		queryFn: () => DirectorExpenseService.getOneFood(params),
		placeholderData: keepPreviousData,
		enabled: enabled,
	});
};

export const useGetAllOtherExpenseQuery = (params: TDirectorParams) => {
	return useQuery({
		queryKey: ["director other", ...Object.values(params)],
		queryFn: () => DirectorExpenseService.getAllOther(params),
		placeholderData: keepPreviousData,
	});
};

export const useGetAllWarehouseProductsQuery = (params: TDirectorParams) => {
	return useQuery({
		queryKey: ["director warehouse products", ...Object.values(params)],
		queryFn: () => WarehouseService.getProducts(params),
		placeholderData: keepPreviousData,
	});
};

export const useGetAllWarehouseFoodQuery = (params: TDirectorParams) => {
	return useQuery({
		queryKey: ["director warehouse food", ...Object.values(params)],
		queryFn: () => WarehouseService.getFood(params),
		placeholderData: keepPreviousData,
	});
};

export const useGetOrderStatsQuery = (params: TDirectorParams) => {
	return useQuery({
		queryKey: ["director order stats", ...Object.values(params)],
		queryFn: () => OrderStatsService.getAll(params),
		placeholderData: keepPreviousData,
	});
};
