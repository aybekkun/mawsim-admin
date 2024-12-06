import { TGetParams } from "./../../types/global.types";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { OrderService, WaiterMenuService, WaiterOrderService, WaiterTableService } from "./menu.service";
import { toast } from "@/hooks/use-toast";
import { TAddOrder, TCreateOrderParams, TUpdateOrder } from "./menu.types";
import { AxiosError } from "axios";

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
		onError: (error: AxiosError<any, any>) => {
			const errorMessage = error.response?.data?.error || "An unexpected error occurred";
			toast({ title: "Create", description: errorMessage, variant: "destructive", duration: 1500 });
		},
	});
};

export const useGetOneOrderQuery = (id: number) => {
	return useQuery({
		queryKey: ["order officiant", id],
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
		queryKey: ["order officiant active", ...Object.values(data)],
		queryFn: () => WaiterOrderService.getAll(data),
		placeholderData: keepPreviousData,
		staleTime: 5000,
		refetchInterval: 5000,
	});
};

export const useAddOrderMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: TAddOrder) => WaiterOrderService.addOrder(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["order officiant active"] });
			toast({ title: "Добавлено", description: "Заказ был успешно добавлен", duration: 500 });
		},
		onError: (error: AxiosError<any, any>) => {
			const errorMessage = error.response?.data?.error || "An unexpected error occurred";
			toast({ title: "Create", description: errorMessage, variant: "destructive", duration: 1500 });
		},
	});
};

export const useUpdateOrderMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (params: TUpdateOrder) => WaiterOrderService.update(params),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["order officiant active"] });
			toast({ title: "Изменено", description: "Комментарий изменен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Ошибка", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};
export const useUpdateOrderStatusMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { id: number; status_id: number }) => OrderService.update(data.id, data.status_id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["order officiant active"] });
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
