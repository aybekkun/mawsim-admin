import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MenuService } from "./menu.service";

export const useGetAllMenuQuery = () => {
	return useQuery({
		queryKey: ["menu"],
		queryFn: () => MenuService.getAll(),
	});
};

export const useCreateMenuMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { food_id: number; price: number }) => MenuService.create(data.food_id, data.price),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["menu"] });
			toast({ title: "Добавлено", description: "Меню был успешно добавлен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Create menu", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useDeleteMenuMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => MenuService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["menu"] });
			toast({ title: "Удалено", description: "Меню был успешно удален", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Delete menu", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useUpdateMenuMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { id: number; price: number }) => MenuService.update(data.id, data.price),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["menu"] });
			toast({ title: "Обнвалено", description: "Меню был успешно обнавлен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Update menu", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};
