import { FC, useEffect } from "react";
import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CurrencyInput, Input } from "@/components/ui/input";
import { formRawMaterialSchema } from "@/config/formSchema";
import SearchableSelect from "@/components/shared/SearchableSelect/SearchableSelect";
import { useCreateProductsMutation, useGetAllProductsNameQuery } from "@/services/administrator/product/product.api";
import { Label } from "@/components/ui/label";

interface AddRawMaterialFormProps {
	open?: boolean;
	setOpen?: (open: boolean) => void;
}

const AddRawMaterialForm: FC<AddRawMaterialFormProps> = ({ open = false, setOpen = () => undefined }) => {
	const { data } = useGetAllProductsNameQuery({ page: 1, limit: 1000 });
	const { mutate: createProduct, isPending, isSuccess } = useCreateProductsMutation();
	const transformData = data?.data.map((item) => ({
		id: item.id,
		value: item.name,
		label: item.name,
	}));
	const form = useForm<z.infer<typeof formRawMaterialSchema>>({
		resolver: zodResolver(formRawMaterialSchema),
		defaultValues: {
			product_id: "1",
			quantity: "",
			price: "",
		},
	});

	useEffect(() => {
		if (isSuccess) {
			form.reset();
			setOpen(false);
		}
	}, [isSuccess]);

	async function onSubmit(values: z.infer<typeof formRawMaterialSchema>) {
		await createProduct({
			product_id: Number(values.product_id),
			price: Number(values.price),
			quantity: Number(values.quantity),
		});
	}
	return (
		<MyDialog title="Добавить продукт" open={open} onOpenChange={(val) => setOpen(val)}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
					<div>
						<Label>Продукт</Label>
						<SearchableSelect
							defaultValue={Number(form.getValues("product_id"))}
							items={transformData || []}
							setItem={(id) => {
								form.setValue("product_id", String(id));
							}}
						/>
					</div>
					<FormField
						control={form.control}
						name="quantity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Количество</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Количество купленных продуктов" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Общая цена</FormLabel>
								<FormControl>
									<CurrencyInput placeholder="Цена" {...field} onAccept={(value: any) => field.onChange(value)} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending} type="submit">
						Добавить
					</Button>
				</form>
			</Form>
		</MyDialog>
	);
};

export default AddRawMaterialForm;
