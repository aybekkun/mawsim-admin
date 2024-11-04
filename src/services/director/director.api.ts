import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TDirectorParams } from "./director.types";
import { DirectorExpenseService, DirectorSalaryService } from "./director.service";

export const useGetAllDirectorSalaryQuery = (params: TDirectorParams) => {
	return useQuery({
		queryKey: ["director salary", ...Object.values(params)],
		queryFn: () => DirectorSalaryService.getAll(params),
	});
};

export const useDetailSalaryQuery = (params: TDirectorParams) => {
	return useQuery({
		queryKey: ["director salary detail", ...Object.values(params)],
		queryFn: () => DirectorSalaryService.getOne(params),
		enabled: params.enabled,
	});
};

export const useGetProductsExpenseQuery = (params: TDirectorParams) => {
	return useQuery({
		queryKey: ["director products", ...Object.values(params)],
		queryFn: () => DirectorExpenseService.getAllProducts(params),
		placeholderData: keepPreviousData,
	});
};

export const useDetailProductsExpenseQuery = (params: TDirectorParams) => {
	return useQuery({
		queryKey: ["director products detail", ...Object.values(params)],
		queryFn: () => DirectorExpenseService.getOneProducts(params),
		placeholderData: keepPreviousData,
	});
};
