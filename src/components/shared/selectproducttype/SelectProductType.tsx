import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FC } from "react";

interface SelectProductTypeProps {
	className?: string;
	value: string;
	onValueChange?: (value: string) => void;
}

const SelectProductType: FC<SelectProductTypeProps> = ({ value, onValueChange = () => undefined, className = `` }) => {
	return (
		<div className={className}>
			<Select value={value} onValueChange={(value) => onValueChange(value)}>
				<SelectTrigger>
					<SelectValue placeholder="Select type" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="kilogram">кг</SelectItem>
					<SelectItem value="liter">литр</SelectItem>
					<SelectItem value="unit">штук</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

export default SelectProductType;
