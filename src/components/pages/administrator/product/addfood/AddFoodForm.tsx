import { FC, useEffect } from "react";
import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formFoodSchema } from "@/config/formSchema";
import SearchableSelect from "@/components/shared/SearchableSelect/SearchableSelect";
import { Label } from "@/components/ui/label";
import { useCreateFoodMutation, useGetAllFoodNameQuery } from "@/services/administrator/food/food.api";

interface AddFoodFormProps {
	open?: boolean;
	setOpen?: (open: boolean) => void;
}

const AddFoodForm: FC<AddFoodFormProps> = ({ open = false, setOpen = () => undefined }) => {
	const { data } = useGetAllFoodNameQuery();
	const { mutate: createFood, isPending, isSuccess } = useCreateFoodMutation();
	const transformData = data?.data.map((item) => ({
		id: item.id,
		value: item.name,
		label: item.name,
	}));
	const form = useForm<z.infer<typeof formFoodSchema>>({
		resolver: zodResolver(formFoodSchema),
		defaultValues: {
			food_id: "",
			quantity: "",
			price: "",
			sell_price: "",
		},
	});

	useEffect(() => {
		if (isSuccess) {
			form.reset();
			setOpen(false);
		}
		return () => {
			form.reset();
		};
	}, [isSuccess]);

	async function onSubmit(values: z.infer<typeof formFoodSchema>) {
		await createFood({
			food_id: Number(values.food_id),
			price: Number(values.price),
			quantity: Number(values.quantity),
			sell_price: Number(values.sell_price),
		});
	}
	return (
		<MyDialog title="Добавить продукт" open={open} onOpenChange={(val) => setOpen(val)}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
					<div>
						<Label>Продукт</Label>
						<SearchableSelect
							defaultValue={Number(form.getValues("food_id"))}
							items={transformData || []}
							setItem={(id) => {
								form.setValue("food_id", String(id));
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
									<Input type="number" placeholder="Количество" {...field} />
								</FormControl>
								<FormDescription>Значение должно быть числом больше нуля</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="sell_price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Цена на прожажу</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Цена" {...field} />
								</FormControl>
								<FormDescription>Значение должно быть числом больше нуля</FormDescription>
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
									<Input type="number" placeholder="Цена" {...field} />
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

export default AddFoodForm;
