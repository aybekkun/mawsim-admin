import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneIcon, LockIcon } from "lucide-react";
import { useAuthPersistStore } from "@/store";
import { Navigate } from "react-router-dom";

const AuthLayout = () => {
	const [tel, setTel] = useState("");
	const [password, setPassword] = useState("");
	const { fetchLogin, isAuth } = useAuthPersistStore();
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await fetchLogin({ phone: tel, password: password });
		// console.log("Login attempted with:", { tel, password });
	};
	if (isAuth) return <Navigate to={"/"} replace />;
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
								<Input
									id="tel"
									type="tel"
									placeholder="998911234567"
									value={tel}
									onChange={(e) => setTel(e.target.value)}
									className="pl-10"
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
