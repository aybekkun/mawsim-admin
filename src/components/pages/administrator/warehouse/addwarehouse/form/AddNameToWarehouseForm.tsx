import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import MyInput from "@/components/shared/MyInput/MyInput";
import MySelect from "@/components/shared/MySelect/MySelect";

interface AddNameToWarehouseFormProps {
	className?: string;
}

const formSchema = z.object({
	productName: z
		.string()
		.min(2, {
			message: "Минимум два символа",
		})
		.max(20, {
			message: "Максимум 20 символов",
		}),
	type: z.enum(["unit", "kg", "litres"]),
});
const AddNameToWarehouseForm: FC<AddNameToWarehouseFormProps> = ({ className = `` }) => {
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			productName: "",
			type: "unit",
		},
	});

	function onSubmit(values: FieldValues) {
		console.log(values);
		reset();
	}
	return (
		<div className={className}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-4">
				<MyInput name="productName" label="Название продукта" register={register} error={errors.productName?.message} />
				<MySelect name="type" label="Тип" register={register} error={errors.type?.message} />
				<Button className="" type="submit">
					Submit
				</Button>
			</form>
		</div>
	);
};

export default AddNameToWarehouseForm;
