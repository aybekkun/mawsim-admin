import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { formUserSchema } from "@/config/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input, MyInputMask } from "@/components/ui/input";
import { z } from "zod";
import { useCreateUserMutation, useUpdateUserMutation } from "@/services/auth/auth.api";
import { USER_ROLES } from "@/constants/appConstants";
import { TUser } from "@/services/auth/auth.types";
import { unformatPhoneNumber } from "@/utils/formatPhoneNumber";
interface AddUserProps {
	type?: "create" | "edit";
	obj?: TUser;
	open?: boolean;
	setOpen?: (open: boolean) => void;
}

const AddUser: FC<AddUserProps> = ({ obj, type = "create", open = false, setOpen = () => undefined }) => {
	const { mutate: createUser, isPending } = useCreateUserMutation();
	const { mutate: updateUser, isPending: isUpdating } = useUpdateUserMutation();
	const form = useForm<z.infer<typeof formUserSchema>>({
		resolver: zodResolver(formUserSchema),
		defaultValues: {
			phone: "998",
			role_id: "6",
			name: "",
		},
	});

	useEffect(() => {
		if (type === "edit" && obj) {
			form.setValue("name", obj.name);
			form.setValue("phone", unformatPhoneNumber(obj.phone));
			form.setValue("role_id", String(obj.role.id));
		}
	}, []);

	async function onSubmit(values: z.infer<typeof formUserSchema>) {
		console.log(values);
		
		if (type === "create") {
			await createUser({
				...values,
				role_id: Number(values.role_id),
				phone: values.phone.replace(/\D/g, ""),
			});
		} else {
			await updateUser({
				id: obj?.id,
				...values,
				role_id: Number(values.role_id),
				phone: values.phone.replace(/\D/g, ""),
			});
		}
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
					<div className="space-y-2">
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Телефон</FormLabel>
									<FormControl>
										<MyInputMask
											mask={"+\\9\\98 (99) 999-99-99"}
											placeholder="+998 (__) ___-__-__"
											{...field}
											onChange={(e: any) => field.onChange(e.target.value)}
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="role_id"
							render={({ field }) => (
								<FormItem>
									<Select defaultValue="6" {...field} onValueChange={(val) => field.onChange(val)}>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Должность" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Должность</SelectLabel>
												{USER_ROLES.map((role) => (
													<SelectItem key={role.id} value={String(role.id)}>
														{role.name}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input className="w-full" placeholder="Пароль" {...field} />
								</FormControl>
								<FormDescription>Необязательное поле</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending || isUpdating} type="submit">
						{type === "create" ? "Создать" : "Изменить"}
					</Button>
				</form>
			</Form>
		</MyDialog>
	);
};

export default AddUser;
