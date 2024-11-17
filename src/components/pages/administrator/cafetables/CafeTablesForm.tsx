import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formCafeTablesSchema } from "@/config/formSchema";
import {
	useCreatecafetablesMutation,
	useUpdateCafeTablesMutation,
} from "@/services/administrator/cafetables/cafetables.api";
import { TCafeTable } from "@/services/administrator/cafetables/cafetables.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

type CafeTablesFormProps = {
	type?: "create" | "edit";
	obj?: TCafeTable;
	open?: boolean;
	setOpen?: (open: boolean) => void;
};
const CafeTablesForm: FC<CafeTablesFormProps> = ({
	type = "create",
	obj = undefined,
	open = false,
	setOpen = () => undefined,
}) => {
	const { mutate: createTable, isPending: isCreating, isSuccess: isCreated } = useCreatecafetablesMutation();
	const { mutate: updateTable, isPending: isUpdating, isSuccess: isUpdated } = useUpdateCafeTablesMutation();
	const form = useForm<z.infer<typeof formCafeTablesSchema>>({
		resolver: zodResolver(formCafeTablesSchema),
		defaultValues: { name: "" },
	});
	useEffect(() => {
		if (isCreated || isUpdated) {
			form.reset();
			setOpen(false);
		}
	}, [isCreated, isUpdated]);

	useEffect(() => {
		if (type === "edit" && obj) {
			form.setValue("name", obj.name);
		}
		return () => {
			form.reset();
		};
	}, [open]);
	async function onSubmit(values: z.infer<typeof formCafeTablesSchema>) {
		if (type === "create") {
			await createTable({
				name: values.name,
			});
		} else if (obj && window.confirm("Вы действительно хотите изменить название?")) {
			await updateTable({
				id: obj.id,
				name: values.name,
			});
		}
	}

	return (
		<MyDialog
			open={open}
			title={type === "create" ? "Зарплата" : "Редактирование зарплаты"}
			onOpenChange={(open) => setOpen(open)}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Название</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>1 стол</FormDescription>
							</FormItem>
						)}
					/>
					<Button disabled={isCreating || isUpdating} type="submit">
						{type === "create" ? "Добавить" : "Изменить"}
					</Button>
				</form>
			</Form>
		</MyDialog>
	);
};

export default CafeTablesForm;
