import { FC } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface SelectAscDescProps {
	title?: string;
	setSelect?: (val: "asc" | "desc") => void;
}

const SelectAscDesc: FC<SelectAscDescProps> = ({ title = "", setSelect = () => {} }) => {
	return (
		<Select
			onValueChange={(val: "asc" | "desc") => {
				setSelect(val);
			}}
		>
			<SelectTrigger className="w-[120px]">
				<SelectValue placeholder={title} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="desc">по убыванию</SelectItem>
				<SelectItem value="asc">по возрастанию</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default SelectAscDesc;
