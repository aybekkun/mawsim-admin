import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formUserSchema } from "@/config/formSchema";
import { useUpdateUserMutation } from "@/services/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UserEditFormProps {
	user: {
		id: number;
		name: string;
		phone: string;
		role: {
			id: number;
			name: string;
		};
	};
	className?: string;
	setEditId: (id: number) => void;
}

const UserEditForm: FC<UserEditFormProps> = ({ user, className = ``, setEditId }) => {
	const { mutate: updateUser, isPending } = useUpdateUserMutation();
	const form = useForm<z.infer<typeof formUserSchema>>({
		resolver: zodResolver(formUserSchema),
		defaultValues: {
			password: "",
			phone: user.phone,
			role_id: user.role.id,
			name: user.name,
		},
	});
	async function onSubmit(values: z.infer<typeof formUserSchema>) {
		if (user.id) {
			await updateUser({
				id: user.id,
				name: values.name,
				password: values.password,
				phone: values.phone,
				role_id: values.role_id,
			});
		}
		setEditId(-1);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Card className={className}>
					<CardHeader>
						<CardTitle>{user.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Должность</FormLabel>
										<FormControl>
											<Input className="w-full" placeholder="name" {...field} />
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
											<Input className="w-full" placeholder="phone" {...field} />
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

							<Button disabled={isPending} type="submit" className="">
								Сбросить
							</Button>
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
};

export default UserEditForm;
