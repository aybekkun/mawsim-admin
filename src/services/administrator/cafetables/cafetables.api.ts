import { toast } from "@/hooks/use-toast";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CafeTablesService } from "./cafetables.service";

export const useGetAllCafeTablesQuery = () => {
	return useQuery({
		queryKey: ["cafetables"],
		queryFn: () => CafeTablesService.getAll(),
		placeholderData: keepPreviousData,
	});
};

export const useCreatecafetablesMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { name: string }) => CafeTablesService.create(data.name),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cafetables"] });
			toast({ title: "Добавлено", description: "Стол был успешно добавлен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Delete product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useUpdateCafeTablesMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { id: number; name: string }) => CafeTablesService.update(data.id, data.name),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cafetables"] });
			toast({ title: "Изменено", description: "Стол был успешно изменен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Update product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useDeleteCafeTablesMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => CafeTablesService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cafetables"] });
			toast({ title: "Удалено", description: "Стол был успешно удален", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Delete product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};
