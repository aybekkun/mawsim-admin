import { addMonths, format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";

export function SelectDate({
	title = "",
	month = -1,
	selectDate = () => {},
	setCurrentPage = () => {},
}: {
	month?: number;
	title: string;
	selectDate?: (value: string) => void;
	setCurrentPage?: (page: number) => void;
}) {
	const [date, setDate] = useState<Date>();
	const [open, setOpen] = useState(false);
	const onSelect = (value: Date | undefined) => {
		if (value) {
			setDate(value);
			selectDate(format(value, "yyyy-MM-dd"));
			setCurrentPage(1);
		}
		setOpen(false);
	};
	useEffect(() => {
		setDate(addMonths(new Date(), month));
	}, []);
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					onClick={() => setOpen(true)}
					variant={"outline"}
					className={cn("w-[200px] justify-start text-left font-normal", !date && "text-muted-foreground")}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? title + " " + format(date, "dd-MM-yyyy") : <span>Дата {title}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar locale={ru} mode="single" selected={date} onSelect={onSelect} initialFocus />
			</PopoverContent>
		</Popover>
	);
}
