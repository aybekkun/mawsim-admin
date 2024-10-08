import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "./auth.service";
import { toast } from "@/hooks/use-toast";

export const useGetAllUsersQuery = () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: () => AuthService.getAll(),
	});
};

export const useUpdateUserMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			name,
			phone,
			password,
			role_id,
		}: {
			id: number;
			name: string;
			phone: string;
			password: string;
			role_id: number;
		}) => AuthService.update(id, name, phone, password, role_id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast({ title: "Обнвалено", description: "Пользователь был успешно обнавлен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Update user", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useCreateeUserMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ name, phone, password }: { name: string; phone: string; password: string }) =>
			AuthService.create(name, phone, password),
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
			toast({ title: "Добавлен", description: "Пользователь был успешно удален", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Delete user", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};
