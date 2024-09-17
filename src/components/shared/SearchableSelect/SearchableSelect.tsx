import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, FC } from "react";

interface SearchableSelectProps {
	items: { id: number; value: string; label: string }[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setItem?: (id: any) => void;
	className?: string;
}

const SearchableSelect: FC<SearchableSelectProps> = ({ items = [], className = ``, setItem = () => undefined }) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");


	const onSelectItem = (id: number, currentValue: string) => {
		setValue(currentValue === value ? "" : currentValue);
		setItem(id);
		setOpen(false);
	};
	return (
		<div className={className}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
						{value ? items.find((item) => item.label === value)?.label : "Выберите значение..."}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0">
					<Command>
						<CommandInput placeholder="Search item..." />
						<CommandEmpty>No item found.</CommandEmpty>
						<CommandGroup>
							<CommandList>
								{items.map((item) => (
									<CommandItem
										key={item.value}
										value={item.value}
										onSelect={(currentValue) => onSelectItem(item.id, currentValue)}
									>
										<Check className={cn("mr-2 h-4 w-4", value === item.value ? "opacity-100" : "opacity-0")} />
										{item.label}
									</CommandItem>
								))}
							</CommandList>
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default SearchableSelect;
