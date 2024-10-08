import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { formSalaryExpenseSchema, formUserSchema } from "@/config/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import SearchableSelect from "@/components/shared/SearchableSelect/SearchableSelect";
import { useCreateeUserMutation } from "@/services/auth/auth.api";
interface AddUserProps {
	open?: boolean;
	setOpen?: (open: boolean) => void;
}

const AddUser: FC<AddUserProps> = ({ open = false, setOpen = () => undefined }) => {
	const { mutate: createUser, isPending } = useCreateeUserMutation();
	const form = useForm<z.infer<typeof formUserSchema>>({
		resolver: zodResolver(formUserSchema),
		defaultValues: {
			password: "",
			phone: "998",
			role_id: "6",
			name: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formUserSchema>) {
		await createUser(values);
		form.reset();
		setOpen(false);
	}

	return (
		<MyDialog open={open} title="Добавить пользователя" onOpenChange={(open) => setOpen(open)}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input className="w-full" placeholder="Имя" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Телефон</FormLabel>
								<FormControl>
									<Input className="w-full" placeholder="998" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input className="w-full" placeholder="password" {...field} />
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

export default AddUser;
