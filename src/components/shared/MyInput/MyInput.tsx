import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister } from "react-hook-form";
type MyInputProps = {
	className?: string;
	label: string;
	name: string;
	register: UseFormRegister<any>; // Типизация регистра из react-hook-form
	error?: string;
	defaultValue?: string;
	type?: string;
};

const MyInput = ({ label, name, register, error, defaultValue = "", type = "text", className = "" }: MyInputProps) => {
	return (
		<div className={"pb-6 relative " + className}>
			<Label>{label}</Label>
			<Input defaultValue={defaultValue} type={type} {...register(name, { required: true })} />
			<p className="absolute l-0 b-0 text-sm text-red-600">{error}</p>
		</div>
	);
};

export default MyInput;
