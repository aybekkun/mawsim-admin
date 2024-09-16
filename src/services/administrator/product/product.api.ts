import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProdcutListService, ProductService } from "./product.service";
import { toast } from "../../../hooks/use-toast";

export const useGetAllProductsListQuery = () => {
	return useQuery({
		queryKey: ["productslist"],
		queryFn: () => ProdcutListService.getAll(),
	});
};

export const useCreateProductsListMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { productName: string; type: string }) => ProdcutListService.create(data.productName, data.type),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["productslist"] });
			toast({ title: "Добавлено", description: "Проудукт был успешно добавлен", duration: 500 });
		},
	});
};

export const useDeleteProductsListMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => ProdcutListService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["productslist"] });
			toast({ title: "Удалено", description: "Проудукт был успешно удален", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Delete product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useUpdateProductsListMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { id: number; productName: string; type: string }) =>
			ProdcutListService.update(data.id, data.productName, data.type),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["productslist"] });
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
		queryFn: () => ProductService.getAll(),
	});
};
