import { TGetParams } from "./../../types/global.types";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { OrderService, WaiterMenuService, WaiterOrderService, WaiterTableService } from "./menu.service";
import { toast } from "@/hooks/use-toast";
import { TCreateOrderParams } from "./menu.types";

export const useGetAllWaiterMenuQuery = (params: TGetParams) => {
	return useQuery({
		queryKey: ["menu officiant", ...Object.values(params)],
		queryFn: () => WaiterMenuService.getAll(params),
		placeholderData: keepPreviousData,
	});
};

export const useGetAllWaiterTableQuery = (params: TGetParams) => {
	return useQuery({
		queryKey: ["table officiant", ...Object.values(params)],
		queryFn: () => WaiterTableService.getAll(params),
		placeholderData: keepPreviousData,
	});
};

export const useCreateOrderMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (params: TCreateOrderParams) => WaiterOrderService.create(params),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["menu officiant"] });
			toast({ title: "Добавлено", description: "Заказ был успешно добавлен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Ошибка", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useGetOneOrderQuery = (id: number) => {
	return useQuery({
		queryKey: ["food officiant", id],
		queryFn: () => WaiterOrderService.getOne(id),
	});
};

export const useGetAllOrderQuery = (params: TGetParams) => {
	return useQuery({
		queryKey: ["order officiant", ...Object.values(params)],
		queryFn: () => WaiterOrderService.getAll(params),
		// refetchInterval: 2000, // Повторить запрос при монтировании
		// retry: 2,
		placeholderData: keepPreviousData,
		//refetchInterval: 2000,
	});
};

export const useGetActiveOrderQuery = (data: TGetParams) => {
	return useQuery({
		queryKey: ["order officiant active"],
		queryFn: () => WaiterOrderService.getAll(data),
		placeholderData: keepPreviousData,
	});
};

export const useUpdateOrderStatusMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { id: number; status_id: number }) => OrderService.update(data.id, data.status_id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["order officiant"] });
			toast({ title: "Статус изменен", description: "Статус изменен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Ошибка", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useDeleteOrderMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => WaiterOrderService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["order officiant"] });
			toast({ title: "Заказ удален", description: "Успешно удален", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Ошибка", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};
