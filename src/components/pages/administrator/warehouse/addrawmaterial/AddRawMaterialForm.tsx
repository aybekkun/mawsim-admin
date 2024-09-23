import { FC } from "react";
import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formRawMaterialSchema } from "@/config/formSchema";
interface AddRawMaterialFormProps {
	open?: boolean;
	setOpen?: (open: boolean) => void;
}


const AddRawMaterialForm: FC<AddRawMaterialFormProps> = ({ open = false, setOpen = () => undefined }) => {
	const form = useForm<z.infer<typeof formRawMaterialSchema>>({
		resolver: zodResolver(formRawMaterialSchema),
		defaultValues: {
			productName: "",
			quantity: "",
            price: "",
            type:"unit"
		},
	});
	function onSubmit(values: z.infer<typeof formRawMaterialSchema>) {
		console.log(values);
	}
	return (
		<MyDialog title="Добавить продукт" open={open} onOpenChange={(val) => setOpen(val)}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="productName"
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
						name="quantity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Количество</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Название продукта" {...field} />
								</FormControl>
								<FormDescription>Значение должно быть числом больше или равным нуля</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="type"
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
										<SelectItem value="kg">кг</SelectItem>
										<SelectItem value="liter">литер</SelectItem>
										<SelectItem value="unit">штук</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription>кг, литер, штука</FormDescription>
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
								<FormDescription>Значение должно быть числом больше или равным нуля</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</MyDialog>
	);
};

export default AddRawMaterialForm;
