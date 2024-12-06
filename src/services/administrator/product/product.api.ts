import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProdcutsNameService, ProductsService, RawMaterialsService } from "./product.service";
import { toast } from "../../../hooks/use-toast";
import { AxiosError } from "axios";
import { TGetParams } from "@/services/types/global.types";

export const useGetAllProductsNameQuery = (params: TGetParams) => {
	return useQuery({
		queryKey: ["productsname", ...Object.values(params)],
		queryFn: () => ProdcutsNameService.getAll(params),
	});
};

export const useCreateProductsNameMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { name: string; format_id: number }) => ProdcutsNameService.create(data.name, data.format_id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["productsname"] });
			toast({ title: "Добавлено", description: "Проудукт был успешно добавлен", duration: 500 });
		},
	});
};

export const useDeleteProductsNameMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => ProdcutsNameService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["productsname"] });
			toast({ title: "Удалено", description: "Проудукт был успешно удален", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Delete product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useUpdateProductsNameMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { id: number; name: string; format_id: number }) =>
			ProdcutsNameService.update(data.id, data.name, data.format_id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["productsname"] });
			toast({ title: "Обнвалено", description: "Проудукт был успешно обнавлен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Update product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useGetAllProductsQuery = (params: TGetParams) => {
	return useQuery({
		queryKey: ["products", ...Object.values(params)],
		queryFn: () => ProductsService.getAll(params),
	});
};

export const useGetOneProductsQuery = (id: number) => {
	return useQuery({
		queryKey: ["products", id],
		queryFn: () => ProductsService.getOne(id),
	});
};

export const useCreateProductsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { quantity: number; price: number; product_id: number }) =>
			ProductsService.create(data.product_id, data.quantity, data.price),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast({ title: "Добавлено", description: "Проудукт был успешно добавлен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Create product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useGetAllRawMaterialsExpenseQuery = (page: number = 1) => {
	return useQuery({
		queryKey: ["rawmaterials", page],
		queryFn: () => RawMaterialsService.getAll(page),
		placeholderData: keepPreviousData,
	});
};

export const useCreateRawMaterialsExpenseMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { product_id: number; quantity: number }) =>
			RawMaterialsService.create(data.product_id, data.quantity),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["rawmaterials"] });
			toast({ title: "Добавлено расход", description: "Сырье был успешно доавлен", duration: 500 });
		},
		onError: (error: AxiosError<any, any>) => {
			const errorMessage = error.response?.data?.error || "An unexpected error occurred";
			toast({ title: "Create", description: errorMessage, variant: "destructive", duration: 1500 });
		},
	});
};

export const useUpdateRawMaterialsExpenseMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { product_id: number; quantity: number }) =>
			RawMaterialsService.create(data.product_id, data.quantity),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["rawmaterials"] });
			toast({ title: "Добавлено расход", description: "Сырье был успешно доавлен", duration: 500 });
		},
		onError: (error: AxiosError<any, any>) => {
			const errorMessage = error.response?.data?.error || "An unexpected error occurred";
			toast({ title: "Create", description: errorMessage, variant: "destructive", duration: 1500 });
		},
	});
};
export const useDeleteRawMaterialsExpenseMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => RawMaterialsService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["rawmaterials"] });
			toast({ title: "Удалено", description: "Сырье был успешно удален", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Delete product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};


export const useUpdateProductExpenseMutation = () => { 
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { id: number; quantity: number; price: number; expense_id: number }) =>
			ProductsService.updateExpense(data.id, data.price, data.quantity, data.expense_id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast({ title: "Добавлено", description: "Проудукт был успешно изменен", duration: 500 });
		},
		onError: (error: AxiosError<any, any>) => {
			const errorMessage = error.response?.data?.message || "An unexpected error occurred";
			toast({ title: "Create", description: errorMessage, variant: "destructive", duration: 1500 });
		},
	});
};
