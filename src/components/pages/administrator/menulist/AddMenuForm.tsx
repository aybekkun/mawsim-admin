import { FC, useEffect } from "react";
import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { formMenuSchema } from "@/config/formSchema";
import SearchableSelect from "@/components/shared/SearchableSelect/SearchableSelect";
import { Label } from "@/components/ui/label";
import { useGetAllFoodQuery } from "@/services/administrator/food/food.api";
import { CurrencyInput } from "@/components/ui/input";
import { TMenu } from "@/services/administrator/menu/menu.types";
import { useCreateMenuMutation, useUpdateMenuMutation } from "@/services/administrator/menu/menu.api";

interface AddMenuFormProps {
	type?: "create" | "edit";
	obj?: TMenu;
	open?: boolean;
	setOpen?: (open: boolean) => void;
}

const AddMenuForm: FC<AddMenuFormProps> = ({
	open = false,
	setOpen = () => undefined,
	type = "create",
	obj = undefined,
}) => {
	const { mutate: createMenu, isPending: isCreating, isSuccess: isCreated } = useCreateMenuMutation();
	const { mutate: updateMenu, isPending: isUpdating, isSuccess: isUpdated } = useUpdateMenuMutation();

	const { data } = useGetAllFoodQuery();
	const transformData = data?.data.map((item) => ({
		id: item.id,
		value: item.name,
		label: item.name,
	}));

	useEffect(() => {
		if (type === "edit" && obj) {
			form.setValue("food_id", obj.food.id);
			form.setValue("price", String(obj.price));
		}
		return () => {
			form.reset();
		};
	}, [open]);
	useEffect(() => {
		if (isCreated || isUpdated) {
			form.reset();
			setOpen(false);
		}
	}, [isCreated, isUpdated]);
	const form = useForm<z.infer<typeof formMenuSchema>>({
		resolver: zodResolver(formMenuSchema),
		defaultValues: {
			food_id: 0,
			price: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formMenuSchema>) {
		if (type === "create") {
			await createMenu({
				food_id: Number(values.food_id),
				price: Number(values.price),
			});
		} else if (type === "edit") {
			await updateMenu({
				id: Number(values.food_id),
				price: Number(values.price),
			});
		}
		form.reset();
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
								form.setValue("food_id", id);
							}}
						/>
					</div>
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Цена</FormLabel>
								<FormControl>
									<CurrencyInput placeholder="Цена" {...field} onAccept={(value: any) => field.onChange(value)} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="space-x-4 pb-2">
						<Button disabled={isCreating || isUpdating} type="submit">
							{type === "create" ? "Добавить" : "Изменить"}
						</Button>
					</div>
				</form>
			</Form>
		</MyDialog>
	);
};

export default AddMenuForm;
