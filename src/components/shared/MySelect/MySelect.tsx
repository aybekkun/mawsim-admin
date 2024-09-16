import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormRegister } from "react-hook-form";
type MySelectProps = {
	className?: string;
	label: string;
	name: string;
	register: UseFormRegister<any>; // Типизация регистра из react-hook-form
	error?: string;
	defaultValue?: string;
};

const MySelect = ({
	label,
	name,
	register,
	error,
	defaultValue = "",
	className = "",
}: MySelectProps) => {
	return (
		<div className={"pb-6 relative " + className}>
			<Label>{label}</Label>
			<Select defaultValue={defaultValue} {...register(name, { required: true })}>
				<SelectTrigger>
					<SelectValue placeholder="Select a verified email to display" />
				</SelectTrigger>

				<SelectContent>
					<SelectItem value="m@example.com">m@example.com</SelectItem>
					<SelectItem value="m@google.com">m@google.com</SelectItem>
					<SelectItem value="m@support.com">m@support.com</SelectItem>
				</SelectContent>
			</Select>
			<p className="absolute l-0 b-0 text-sm text-red-600">{error}</p>
		</div>
	);
};

export default MySelect;
