import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "./auth.service";
import { toast } from "@/hooks/use-toast";
import { TGetParams } from "../types/global.types";
import { TUserUpdate } from "./auth.types";

export const useGetAllUsersQuery = (params: TGetParams) => {
	return useQuery({
		queryKey: ["users", ...Object.values(params)],
		queryFn: () => AuthService.getAll(params),
	});
};

export const useUpdateUserMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (params:TUserUpdate) => AuthService.update(params),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast({ title: "Обнвалено", description: "Пользователь был успешно обнавлен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Update user", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useCreateUserMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (params: TUserUpdate) => AuthService.create(params),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast({ title: "Добавлен", description: "Пользователь был успешно добавлен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Update user", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useDeleteUserMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => AuthService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast({ title: "Удален", description: "Пользователь был успешно удален", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Delete user", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};
