import { toast } from "@/hooks/use-toast";
import { ProdcutListService } from "@/services/administrator/product/product.service";
import { TProductList } from "@/services/administrator/product/product.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useProducts = () => {
	const queryData = useQuery({
		queryKey: ["products"],
		queryFn: () => ProdcutListService.getAll(),
	});
	const { mutate: create, isPending: isCreating } = useMutation({
		mutationFn: (data: Omit<TProductList, "id">) => ProdcutListService.create(data.productName, data.type),
		onSuccess: () => {
			queryData.refetch();
			toast({ title: "Create product", description: "create was successful", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Create product", description: error.message, variant: "destructive", duration: 500 });
		},
	});
	const { mutate: remove } = useMutation({
		mutationFn: (id: number) => ProdcutListService.delete(id),
		onSuccess: () => {
			queryData.refetch();
			toast({ title: "Delete product", description: "Delete was successful", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Delete product", description: error.message, variant: "destructive", duration: 500 });
		},
	});
	const { mutate: update } = useMutation({
		mutationFn: (data: TProductList) => ProdcutListService.update(data.id, data.productName, data.type),
		onSuccess: () => {
			queryData.refetch();
			toast({ title: "Update product", description: "Update was successful", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Update product", description: error.message, variant: "destructive", duration: 500 });
		},
	});
	return useMemo(
		() => ({
			queryData,
			create,
			remove,
			update,
			isCreating,
		}),
		[queryData, create, remove, update]
	);
};
