import { toast } from "@/hooks/use-toast";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OtherExpenseService, SalaryService } from "./expense.service";

export const useGetAllOtherExpenseQuery = (page: number = 1) => {
	return useQuery({
		queryKey: ["otherexpense", page],
		queryFn: () => OtherExpenseService.getAll(page),
		placeholderData: keepPreviousData,
	});
};

export const useCreateOtherExpenseMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { amount: number; comment: string }) => OtherExpenseService.create(data.comment, data.amount),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["otherexpense"] });
			toast({ title: "Добавлено", description: "Расход был успешно добавлен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Delete product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useUpdateOtherExpenseMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { id: number; amount: number; comment: string }) =>
			OtherExpenseService.update(data.id, data.comment, data.amount),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["otherexpense"] });
			toast({ title: "Изменено", description: "Расход был успешно изменен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Update product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useDeleteOtherExpenseMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => OtherExpenseService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["otherexpense"] });
			toast({ title: "Удалено", description: "Расход был успешно удален", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Delete product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useGetAllSalaryQuery = (page: number = 1) => {
	return useQuery({
		queryKey: ["salary", page],
		queryFn: () => SalaryService.getAll(page),
		placeholderData: keepPreviousData,
	});
};

export const useCreateSalaryMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { user_id: number; amount: number }) => SalaryService.create(data.user_id, data.amount),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["salary"] });
			toast({ title: "Добавлено", description: "Зарплата был успешно добавлен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Delete product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

export const useUpdateSalaryMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { id: number; user_id: number; amount: number }) =>
			SalaryService.update(data.id, data.user_id, data.amount),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["salary"] });
			toast({ title: "Изменено", description: "Зарплата был успешно изменен", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Update product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};
export const useDeleteSalaryMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => SalaryService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["salary"] });
			toast({ title: "Удалено", description: "Зарплата был успешно удален", duration: 500 });
		},
		onError: (error) => {
			toast({ title: "Delete product", description: error.message, variant: "destructive", duration: 1500 });
		},
	});
};

