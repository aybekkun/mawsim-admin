import { FC, useEffect, useState } from "react";
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
import { useHandleFiles } from "@/hooks/useHandleFiles.hook";
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
	const { files, previews, handleFileChange, resetFiles } = useHandleFiles();
	const { mutate: createName, isPending: isCreating, isSuccess: isCreated } = useCreateFoodNameMutation();
	const { mutate: updateName, isPending: isUpdating, isSuccess: isUpdated } = useUpdateFoodNameMutation();
	const form = useForm<z.infer<typeof formFoodNameSchema>>({
		resolver: zodResolver(formFoodNameSchema),
		defaultValues: {
			name: "",
			format_id: "3",
			category_id: "1",
			image: "",
		},
	});
	const onClean = () => {
		form.reset();
		resetFiles();
	};
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
		const fd = new FormData();
		fd.append("name", values.name.replace(/ +/g, " ").trim());
		fd.append("format_id", values.format_id);
		fd.append("category_id", values.category_id);
		files.forEach((file) => {
			fd.append("image[]", file);
		});
		if (type === "create") {
			await createName(fd);
		} else if (obj && window.confirm("Вы действительно хотите изменить продукт?")) {
			await updateName({
				id: obj.id,
				name: values.name.replace(/ +/g, " ").trim(),
				format_id: Number(values.format_id),
				category_id: Number(values.category_id),
			});
		}
		resetFiles();
	}
	return (
		<MyDialog scroll={true} title="Добавить продукт" open={open} onOpenChange={(val) => setOpen(val)}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
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
					{type === "create" && (
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Тип</FormLabel>
									<Input
										placeholder="Изображение"
										multiple
										accept="image/*"
										type="file"
										{...field}
										onChange={(e) => {
											field.onChange(e);
											handleFileChange(e);
										}}
									/>
									<FormDescription>еда, напитки</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}

					{previews.length > 0 && (
						<div className="mt-4">
							<h3 className="text-lg font-semibold mb-2">Превью</h3>
							<div className="grid grid-cols-3 gap-2">
								{previews.map((preview, index) => (
									<img
										key={index}
										src={preview}
										alt={`Preview ${index + 1}`}
										className="w-full h-24 object-cover rounded"
									/>
								))}
							</div>
						</div>
					)}
					<div className="space-x-4 pb-2">
						<Button disabled={isCreating || isUpdating} type="submit">
							{type === "create" ? "Добавить" : "Изменить"}
						</Button>
						<Button variant={"destructive"} onClick={onClean}>
							Очиститить
						</Button>
					</div>
				</form>
			</Form>
		</MyDialog>
	);
};

export default AddFoodNameForm;
