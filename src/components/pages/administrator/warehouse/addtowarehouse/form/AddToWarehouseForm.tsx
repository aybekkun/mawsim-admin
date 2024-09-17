import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import SearchableSelect from "@/components/shared/SearchableSelect/SearchableSelect";
import { useGetAllProductsListQuery } from "@/services/administrator/product/product.api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getTotalPrice } from "@/utils/convertor";

const formSchema = z.object({
	type: z.string().nonempty("Type is required"),
	productName: z.string().nonempty("Product name is required"),

	quantity: z
		.string()
		.transform((val) => val.replace(/\s/g, "")) // Удаляем пробелы
		.transform((val) => val.replace(/^0+/, "")) // Удаляем ведущие нули
		.refine((val) => /^[1-9]\d*$/.test(val), {
			message: "Введите положительное число больше нуля",
		})
		.transform((val) => new Intl.NumberFormat("ru-RU").format(Number(val))),
	price: z
		.string()
		.transform((val) => val.replace(/\s/g, "")) // Удаляем пробелы
		.transform((val) => val.replace(/^0+/, "")) // Удаляем ведущие нули
		.refine((val) => /^[1-9]\d*$/.test(val), {
			message: "Введите положительное число больше нуля",
		})
		.transform((val) => new Intl.NumberFormat("ru-RU").format(Number(val))),
});
interface AddToWarehouseFormProps {
	className?: string;
}

const AddToWarehouseForm: FC<AddToWarehouseFormProps> = ({ className = `` }) => {
	const { data } = useGetAllProductsListQuery();
	const [selectedId, setSelectedId] = useState(0);

	const transformedData = data?.map((item) => ({
		id: item.id,
		label: item.productName,
		value: item.productName,
	}));

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			type: "unit",
			productName: "",
			quantity: "0",
			price: "0",
		},
	});

	const totalPrice = getTotalPrice(form.getValues("quantity"), form.getValues("price"));

	useEffect(() => {
		const selectedProduct = data?.find((product) => product.id === selectedId);
		form.setValue("type", selectedProduct?.type || "unit");
		form.setValue("productName", selectedProduct?.productName || "");
	}, [selectedId]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<div className={className}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
					<div>
						<Label>Продукт</Label>
						<SearchableSelect items={transformedData || []} setItem={setSelectedId} />
					</div>
					<div>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Тип</FormLabel>
									<FormControl>
										<Input disabled type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div>
						<FormField
							control={form.control}
							name="quantity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Количество</FormLabel>
									<FormControl>
										<Input
											type="text"
											{...field}
											onChange={(e) => {
												let value = e.target.value.replace(/\s/g, ""); // Удаляем пробелы для проверки
												if (value.startsWith("0")) {
													value = value.replace(/^0+/, "");
												}
												const isValid = /^[1-9]\d*$/.test(value);
												if (isValid || value === "") {
													const formattedValue = new Intl.NumberFormat("ru-RU").format(Number(value));
													field.onChange(formattedValue);
												}
											}}
											min={1}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Цена за один товар</FormLabel>
									<FormControl>
										<Input
											type="text"
											{...field}
											onChange={(e) => {
												let value = e.target.value.replace(/\s/g, ""); // Удаляем пробелы для проверки
												if (value.startsWith("0")) {
													value = value.replace(/^0+/, "");
												}
												const isValid = /^[1-9]\d*$/.test(value);
												if (isValid || value === "") {
													const formattedValue = new Intl.NumberFormat("ru-RU").format(Number(value));
													field.onChange(formattedValue);
												}
											}}
											min={1}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div>
						<h2 className="font-bold flex justify-between">
							Общая цена <span>{totalPrice.toLocaleString("ru-RU")}</span>
						</h2>
					</div>
					<Button type="submit">Добавить</Button>
				</form>
			</Form>
		</div>
	);
};

export default AddToWarehouseForm;
