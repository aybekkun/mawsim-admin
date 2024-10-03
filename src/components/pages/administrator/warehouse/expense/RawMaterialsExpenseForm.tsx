import { FC, useEffect, useState } from "react";
import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formRawMaterialExpenseSchema } from "@/config/formSchema";
import SearchableSelect from "@/components/shared/SearchableSelect/SearchableSelect";
import {
	useCreateRawMaterialsExpenseMutation,
	useGetAllProductsNameQuery,
} from "@/services/administrator/product/product.api";
import { Label } from "@/components/ui/label";

interface RawMaterialsExpenseFormProps {
	type?: "create" | "edit";
	open?: boolean;
	setOpen?: (open: boolean) => void;
}

const RawMaterialsExpenseForm: FC<RawMaterialsExpenseFormProps> = ({
	type = "create",
	open = false,
	setOpen = () => undefined,
}) => {
	const [product_id, setProductId] = useState(1);
	const { data } = useGetAllProductsNameQuery();
	const { mutate: createRaw, isPending, isSuccess } = useCreateRawMaterialsExpenseMutation();
	const transformData = data?.data.map((item) => ({
		id: item.id,
		value: item.name,
		label: item.name,
	}));
	const form = useForm<z.infer<typeof formRawMaterialExpenseSchema>>({
		resolver: zodResolver(formRawMaterialExpenseSchema),
		defaultValues: {
			product_id: 1,
			quantity: "",
		},
	});

	useEffect(() => {
		if (isSuccess) {
			form.reset();
			setOpen(false);
			setProductId(1);
		}
	}, [isSuccess]);

	useEffect(() => {
		if(type==="edit"){
			form.setValue("product_id", product_id)
			form.setValue("quantity", "1")
		}
	},[])
	async function onSubmit(values: z.infer<typeof formRawMaterialExpenseSchema>) {
		await createRaw({
			product_id: Number(values.product_id),
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
								form.setValue("product_id", id);
								setProductId(id);
							}}
						/>
						<div>
							<Label>Тип: </Label> <span>{data?.data.find((item) => item.id === product_id)?.format.name}</span>
						</div>
					</div>

					<FormField
						control={form.control}
						name="quantity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Количество</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Количество" {...field} />
								</FormControl>
								<FormDescription>Значение должно быть числом больше нуля</FormDescription>
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

export default RawMaterialsExpenseForm;
