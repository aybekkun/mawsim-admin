import { FC, useEffect } from "react";
import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formRawNameSchema } from "@/config/formSchema";
import {
	useCreateProductsNameMutation,
	useUpdateProductsNameMutation,
} from "@/services/administrator/product/product.api";
import { TProductsName } from "@/services/administrator/product/product.types";
interface AddRawNameFormProps {
	type?: "create" | "edit";
	obj?: TProductsName;
	open?: boolean;
	setOpen?: (open: boolean) => void;
}

const AddRawNameForm: FC<AddRawNameFormProps> = ({
	open = false,
	setOpen = () => undefined,
	type = "create",
	obj = undefined,
}) => {
	const { mutate: createName, isPending: isCreating, isSuccess: isCreated } = useCreateProductsNameMutation();
	const { mutate: updateName, isPending: isUpdating, isSuccess: isUpdated } = useUpdateProductsNameMutation();
	const form = useForm<z.infer<typeof formRawNameSchema>>({
		resolver: zodResolver(formRawNameSchema),
		defaultValues: {
			name: "",
			format_id: "3",
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
	async function onSubmit(values: z.infer<typeof formRawNameSchema>) {
		if (type === "create") {
			await createName({ name: values.name.replace(/ +/g, " ").trim(), format_id: Number(values.format_id) });
		} else if (obj && window.confirm("Вы действительно хотите изменить продукт?")) {
			await updateName({
				id: obj.id,
				name: values.name.replace(/ +/g, " ").trim(),
				format_id: Number(values.format_id),
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
											<SelectValue placeholder="Select a verified email to display" />
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
					<Button disabled={isCreating || isUpdating} type="submit">
						{type === "create" ? "Добавить" : "Изменить"}
					</Button>
				</form>
			</Form>
		</MyDialog>
	);
};

export default AddRawNameForm;
