import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { CalendarIcon, X } from "lucide-react";

export function SelectDate() {
	const [date, setDate] = useState<Date>();
	const [open, setOpen] = useState(false);
	const onSelect = (value: Date | undefined) => {
		setDate(value);
        setOpen(false)
	};
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					onClick={() => setOpen(true)}
					variant={"outline"}
					className={cn("w-[200px] justify-start text-left font-normal", !date && "text-muted-foreground")}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, "dd-MM-yyyy") : <span>Дата</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar locale={ru} mode="single" selected={date} onSelect={onSelect} initialFocus />
			</PopoverContent>
		</Popover>
	);
}
