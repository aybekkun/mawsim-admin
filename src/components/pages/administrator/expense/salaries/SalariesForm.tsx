import MyDialog from "@/components/shared/MyDialog/MyDialog";
import SearchableSelect from "@/components/shared/SearchableSelect/SearchableSelect";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formSalaryExpenseSchema } from "@/config/formSchema";
import {
	useCreateSalaryMutation,
	useUpdateSalaryMutation,
} from "@/services/administrator/expense/expense.api";
import {  TSalaryExpense } from "@/services/administrator/expense/expense.types";
import { useGetAllUsersQuery } from "@/services/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SalariesFormProps {
	type?: "create" | "edit";
	obj?: TSalaryExpense;
	open?: boolean;
	setOpen?: (open: boolean) => void;
}

const SalariesForm: FC<SalariesFormProps> = ({
	type = "create",
	obj = undefined,
	open = false,
	setOpen = () => undefined,
}) => {
	const { data } = useGetAllUsersQuery();
	const transformData = data?.data.map((item) => ({ id: item.id, value: item.name, label: item.name }));

	const { mutate: createSalary, isPending: isCreating, isSuccess: isCreated } = useCreateSalaryMutation();
	const { mutate: updateSalary, isPending: isUpdating, isSuccess: isUpdated } = useUpdateSalaryMutation();
	const form = useForm<z.infer<typeof formSalaryExpenseSchema>>({
		resolver: zodResolver(formSalaryExpenseSchema),
		defaultValues: {
			user_id: 0,
			amount: "",
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
			form.setValue("user_id", Number(obj?.user.id));
			form.setValue("amount", obj?.amount);
		}
		return () => {
			form.reset();
		};
	}, [open]);
	async function onSubmit(values: z.infer<typeof formSalaryExpenseSchema>) {
		if (type === "create") {
			await createSalary({
				user_id: Number(values.user_id),
				amount: Number(values.amount.replace(/\s+/g, "")),
			});
		} else if (obj && window.confirm("Вы действительно хотите изменить зарплату?")) {
			await updateSalary({
				id: obj.id,
				user_id: Number(values.user_id),
				amount: Number(values.amount.replace(/\s+/g, "")),
			});
		}
	}

	return (
		<MyDialog
			open={open}
			title={type === "create" ? "Зарплата" : "Редактирование зарплаты"}
			onOpenChange={(open) => setOpen(open)}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div>
						<Label>Пользователь</Label>
						<SearchableSelect
							defaultValue={Number(form.getValues("user_id"))}
							items={transformData || []}
							setItem={(id) => {
								form.setValue("user_id", id);
							}}
						/>
					</div>
					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Расход</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Сумма" {...field} />
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

export default SalariesForm;
