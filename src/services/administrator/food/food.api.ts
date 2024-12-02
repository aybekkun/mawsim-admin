import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FoodNameService, FoodService } from "./food.service";
import { AxiosError } from "axios";
import { TGetParams } from "@/services/types/global.types";

export const useGetAllFoodNameQuery = () => {
	return useQuery({
		queryKey: ["foodname"],
		queryFn: () => FoodNameService.getAll(),
	});
};

export const useCreateFoodNameMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (fd: FormData) => FoodNameService.create(fd),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["foodname"] });
			toast({ title: "Добавлено", description: "Проудукт был успешно добавлен", duration: 500 });
		},
		onError: (error: AxiosError<any, any>) => {
			const errorMessage = error.response?.data?.message || "An unexpected error occurred";
			toast({ title: "Create", description: errorMessage, variant: "destructive", duration: 1500 });
		},
	});
};

export const useDeleteFoodNameMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => FoodNameService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["foodname"] });
			toast({ title: "Удалено", description: "Проудукт был успешно удален", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Delete product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useUpdateFoodNameMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { id: number; name: string; description: string; format_id: number; category_id: number }) =>
			FoodNameService.update(data.id, data.name, data.description, data.format_id, data.category_id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["foodname"] });
			toast({ title: "Обнвалено", description: "Проудукт был успешно обнавлен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Update product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useGetAllFoodQuery = (params: TGetParams) => {
	return useQuery({
		queryKey: ["food all", ...Object.values(params)],
		queryFn: () => FoodService.getAll(params),
	});
};

export const useGetOneFoodQuery = (id: number) => {
	return useQuery({
		queryKey: ["food", id],
		queryFn: () => FoodService.getOne(id),
	});
};

export const useCreateFoodMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { quantity: number; price: number; food_id: number }) =>
			FoodService.create(data.food_id, data.quantity, data.price),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["food"] });
			toast({ title: "Добавлено", description: "Проудукт был успешно добавлен", duration: 500 });
		},
		onError: (error: AxiosError<any, any>) => {
			const errorMessage = error.response?.data?.message || "An unexpected error occurred";
			toast({ title: "Create", description: errorMessage, variant: "destructive", duration: 1500 });
		},
	});
};
