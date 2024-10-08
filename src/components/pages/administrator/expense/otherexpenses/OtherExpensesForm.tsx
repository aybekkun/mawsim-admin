import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formOtherExpenseSchema } from "@/config/formSchema";
import {
	useCreateOtherExpenseMutation,
	useUpdateOtherExpenseMutation,
} from "@/services/administrator/expense/expense.api";
import { TOtherExpense } from "@/services/administrator/expense/expense.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface OtherExpensesFormProps {
	type?: "create" | "edit";
	obj?: TOtherExpense;
	open?: boolean;
	setOpen?: (open: boolean) => void;
}

const OtherExpensesForm: FC<OtherExpensesFormProps> = ({
	type = "create",
	obj = undefined,
	open = false,
	setOpen = () => undefined,
}) => {
	const { mutate: createExpense, isPending: isCreating, isSuccess: isCreated } = useCreateOtherExpenseMutation();
	const { mutate: updateExpense, isPending: isUpdating, isSuccess: isUpdated } = useUpdateOtherExpenseMutation();
	const form = useForm<z.infer<typeof formOtherExpenseSchema>>({
		resolver: zodResolver(formOtherExpenseSchema),
		defaultValues: {
			amount: "",
			comment: "",
		},
	});
	useEffect(() => {
		if (isCreated || isUpdated) {
			form.reset();
			setOpen(false);
		}
	}, [isCreated, isUpdated]);

	useEffect(() => {
		if (type === "edit" && obj) {
			form.setValue("amount", obj?.amount);
			form.setValue("comment", obj?.comment);
		}
		return () => {
			form.reset();
		};
	}, [open]);

	async function onSubmit(values: z.infer<typeof formOtherExpenseSchema>) {
		if (type === "create") {
			await createExpense({
				amount: Number(values.amount),
				comment: values.comment.replace(/ +/g, " ").trim(),
			});
		} else if (obj && window.confirm("Вы действительно хотите изменить расход?")) {
			await updateExpense({
				id: obj.id,
				amount: Number(values.amount),
				comment: values.comment.replace(/ +/g, " ").trim(),
			});
		}
	}
	return (
		<MyDialog
			open={open}
			title={type === "create" ? "Создание расхода" : "Редактирование расхода"}
			onOpenChange={(open) => setOpen(open)}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="comment"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Расход</FormLabel>
								<FormControl>
									<Input placeholder="Название расхода" {...field} />
								</FormControl>
								<FormDescription>Уборка, ремонт и тд</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Расход</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Название расхода" {...field} />
								</FormControl>
								<FormDescription>Сколько вы потратили</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isCreating || isUpdating} type="submit">
						{type === "create" ? "Добавить" : "Изменить"}
					</Button>
				</form>
			</Form>
		</MyDialog>
	);
};

export default OtherExpensesForm;
