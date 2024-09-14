import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import cn from "classnames";

const tables = [
	{
		value: "собой",
		label: "собой",
	},
	{
		value: "2",
		label: "2",
	},
	{
		value: "3",
		label: "3",
	},
	{
		value: "4",
		label: "4",
	},
	{
		value: "5",
		label: "5",
	},
];

const TableSelector = () => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open} className="w-[100px] justify-between">
					{value ? tables.find((table) => table.value === value)?.label : "Столы"}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Поиск столов..." />
					<CommandList>
						<CommandEmpty>No table found.</CommandEmpty>
						<CommandGroup>
							{tables.map((table) => (
								<CommandItem
									key={table.value}
									value={table.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									<Check className={cn("mr-2 h-4 w-4", value === table.value ? "opacity-100" : "opacity-0")} />
									{table.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default TableSelector;
