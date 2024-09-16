import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {  useController, Control } from "react-hook-form";

type MySelectProps = {
	values: {
		value: string;
		text: string;
	}[];
	className?: string;
	label: string;
	name: string;
	control: Control<any>; // Используем control из react-hook-form
	error?: string;
	defaultValue?: string;
};

const MySelect = ({ values, label, name, control, error, defaultValue = "", className = "" }: MySelectProps) => {
	const { field } = useController({
		name,
		control,
		defaultValue,
	});

	return (
		<div className={"pb-6 relative " + className}>
			<Label>{label}</Label>
			<Select defaultValue={field.value} onValueChange={field.onChange}>
				<SelectTrigger>
					<SelectValue placeholder="Select a verified email to display" />
				</SelectTrigger>
				<SelectContent>
					{values.map((value) => (
						<SelectItem key={value.value} value={value.value}>
							{value.text}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<p className="absolute l-0 b-0 text-sm text-red-600">{error}</p>
		</div>
	);
};

export default MySelect;
