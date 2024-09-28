import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProdcutsNameService, ProductsService } from "./product.service";
import { toast } from "../../../hooks/use-toast";

export const useGetAllProductsNameQuery = () => {
	return useQuery({
		queryKey: ["productsname"],
		queryFn: () => ProdcutsNameService.getAll(),
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

export const useGetAllProductsQuery = () => {
	return useQuery({
		queryKey: ["products"],
		queryFn: () => ProductsService.getAll(),
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
