import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, MyInputMask } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneIcon, LockIcon } from "lucide-react";
import { useAuthPersistStore } from "@/store";
import {  useNavigate } from "react-router-dom";
const AuthLayout = () => {
	const navigate = useNavigate();
	const [tel, setTel] = useState("998");
	const [password, setPassword] = useState("");
	const { fetchLogin, isAuth } = useAuthPersistStore();
	useEffect(() => {
		if (isAuth) navigate("/");
	}, [isAuth]);
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await fetchLogin({ phone: tel.replace(/\D+/g, ""), password: password });
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">Логин</CardTitle>
					<CardDescription className="text-center">Ваш логин и пароль</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="tel">Телефон</Label>
							<div className="relative">
								<PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
								<MyInputMask
									mask={"+\\9\\98 (99) 999-99-99"}
									id="tel"
									type="tel"
									className="pl-10"
									placeholder="+998 (__) ___-__-__"
									value={tel}
									onChange={(e) => setTel(e.target.value)}
									required
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
								<Input
									id="password"
									type="password"
									placeholder="Enter your password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="pl-10"
									required
								/>
							</div>
						</div>
						<Button type="submit" className="w-full">
							Login
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default AuthLayout;
