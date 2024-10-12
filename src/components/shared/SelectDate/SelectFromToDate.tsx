import { addMonths, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
const SelectFromToDate = () => {
	const [date, setDate] = useState<DateRange | undefined>({
		from: addMonths(new Date(), -6),
		to: addMonths(new Date(), 0),
	});
	const [open, setOpen] = useState(false);
	const onSelect = (value: DateRange | undefined) => {
		setDate(value);

		if (value?.from && value?.to) {
			setOpen(false);
		}
	};
	return (
		<div className={cn("grid gap-2")}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn("w-[250px] justify-start text-left font-normal", !date && "text-muted-foreground")}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "dd-MM-yyyy")} - {format(date.to, "dd-MM-yyyy")}
								</>
							) : (
								format(date.from, "dd-MM-yyyy")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						locale={ru}
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={onSelect}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default SelectFromToDate;
