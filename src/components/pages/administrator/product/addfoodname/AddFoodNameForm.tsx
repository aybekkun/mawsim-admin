import { FC, useEffect } from "react";
import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formFoodNameSchema } from "@/config/formSchema";
import { useCreateFoodNameMutation, useUpdateFoodNameMutation } from "@/services/administrator/food/food.api";
import { TFoodName } from "@/services/administrator/food/food.types";
interface AddFoodNameFormProps {
	type?: "create" | "edit";
	obj?: TFoodName;
	open?: boolean;
	setOpen?: (open: boolean) => void;
}

const AddFoodNameForm: FC<AddFoodNameFormProps> = ({
	open = false,
	setOpen = () => undefined,
	type = "create",
	obj = undefined,
}) => {
	const { mutate: createName, isPending: isCreating, isSuccess: isCreated } = useCreateFoodNameMutation();
	const { mutate: updateName, isPending: isUpdating, isSuccess: isUpdated } = useUpdateFoodNameMutation();
	const form = useForm<z.infer<typeof formFoodNameSchema>>({
		resolver: zodResolver(formFoodNameSchema),
		defaultValues: {
			name: "",
			format_id: "3",
			category_id: "1",
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
			form.setValue("name", obj.name);
			form.setValue("format_id", String(obj.format.id) as "1" | "2" | "3");
		}
		return () => {
			form.reset();
		};
	}, [open]);
	async function onSubmit(values: z.infer<typeof formFoodNameSchema>) {
		if (type === "create") {
			await createName({
				name: values.name.replace(/ +/g, " ").trim(),
				format_id: Number(values.format_id),
				category_id: Number(values.category_id),
			});
		} else if (obj && window.confirm("Вы действительно хотите изменить продукт?")) {
			await updateName({
				id: obj.id,
				name: values.name.replace(/ +/g, " ").trim(),
				format_id: Number(values.format_id),
                category_id: Number(values.category_id),
			});
		}
	}
	return (
		<MyDialog title="Добавить продукт" open={open} onOpenChange={(val) => setOpen(val)}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Продукт</FormLabel>
								<FormControl>
									<Input placeholder="Название продукта" {...field} />
								</FormControl>
								<FormDescription>Картошка, мука и тд</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="format_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Тип</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="1">кг</SelectItem>
										<SelectItem value="2">литр</SelectItem>
										<SelectItem value="3">штук</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription>кг, литр, штука</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="category_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Тип</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="1">еда</SelectItem>
										<SelectItem value="2">напитки</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription>еда, напитки</FormDescription>
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

export default AddFoodNameForm;
