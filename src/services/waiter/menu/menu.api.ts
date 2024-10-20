import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { TGetParams } from "@/services/types/global.types";
import { WaiterMenuService, WaiterTableService } from "./menu.service";

export const useGetAllWaiterMenuQuery = (params: TGetParams) => {
	return useQuery({
		queryKey: ["menu", ...Object.values(params)],
		queryFn: () => WaiterMenuService.getAll(params),
		placeholderData: keepPreviousData,
	});
};

export const useGetAllWaiterTableQuery = (params: TGetParams) => {
	return useQuery({
		queryKey: ["table", ...Object.values(params)],
		queryFn: () => WaiterTableService.getAll(params),
		placeholderData: keepPreviousData,
	});
};

