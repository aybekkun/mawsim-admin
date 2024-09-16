import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import MyInput from "@/components/shared/MyInput/MyInput";
import MySelect from "@/components/shared/MySelect/MySelect";
import { useCreateProductsListMutation } from "@/services/administrator/product/product.api";
import { addNameSchema } from "@/config/formSchema";

interface AddNameToWarehouseFormProps {
	className?: string;
}

const selectValues = [
	{ value: "unit", text: "Единицы" },
	{ value: "kg", text: "Килограммы" },
	{ value: "liter", text: "Литры" },
];
const AddNameToWarehouseForm: FC<AddNameToWarehouseFormProps> = ({ className = `` }) => {
	const {
		reset,
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof addNameSchema>>({
		resolver: zodResolver(addNameSchema),
		defaultValues: {
			productName: "",
			type: "unit",
		},
	});

	const { mutate: createProdcutName, isPending } = useCreateProductsListMutation();

	const onSubmit = async (values: FieldValues) => {
		await createProdcutName({ productName: values.productName, type: values.type });
		reset();
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={"flex items-center gap-4 " + className}>
			<MyInput
				name="productName"
				label="Название&nbsp;продукта"
				register={register}
				error={errors.productName?.message}
			/>
			<MySelect values={selectValues} label="Тип" control={control} name="type" error={errors.type?.message} />
			<Button disabled={isPending} className="" type="submit">
				Submit
			</Button>
		</form>
	);
};

export default AddNameToWarehouseForm;
