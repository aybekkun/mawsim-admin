import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addNameSchema } from "@/config/formSchema";
import { useUpdateProductsListMutation } from "@/services/administrator/product/product.api";
import { TProductList } from "@/services/administrator/product/product.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { FC } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

interface EditNameToWarehouseFormProps {
	className?: string;
	editItem: TProductList;
	setEditItem: () => void;
}

const EditNameToWarehouseForm: FC<EditNameToWarehouseFormProps> = ({ className = ``, editItem, setEditItem }) => {
	const { control, register, handleSubmit } = useForm<z.infer<typeof addNameSchema>>({
		resolver: zodResolver(addNameSchema),
		defaultValues: {
			productName: editItem.productName,
			type: editItem.type as z.infer<typeof addNameSchema>["type"],
		},
	});
	const { mutate: updateProdcutName } = useUpdateProductsListMutation();
	const onSubmit = async (values: FieldValues) => {
		if (window.confirm("Вы действительно хотите изменить продукт?"))
			await updateProdcutName({ id: editItem.id, productName: values.productName, type: values.type });

		setEditItem();
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={"flex gap-2 mt-2 pb-1 borber-dashed border-b " + className}>
			<Input {...register("productName")} />
			<Controller
				name="type"
				control={control}
				render={({ field }) => (
					<Select defaultValue={field.value} onValueChange={field.onChange} value={field.value}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Тип" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="unit">Единицы</SelectItem>
							<SelectItem value="kg">Килограммы</SelectItem>
							<SelectItem value="liter">Литры</SelectItem>
						</SelectContent>
					</Select>
				)}
			/>
			<div className="space-x-2 flex">
				<Button type="submit" className="w-8 h-8" size={"icon"}>
					<Check />
				</Button>
				<Button variant={"destructive"} onClick={setEditItem} className="w-8 h-8" size={"icon"}>
					<X />
				</Button>
			</div>
		</form>
	);
};

export default EditNameToWarehouseForm;
