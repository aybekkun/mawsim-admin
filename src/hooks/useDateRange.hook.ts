import { useState } from "react";
import { format, addMonths } from "date-fns";

export function useDateRange() {
	const [date, setDate] = useState({
		from: format(addMonths(new Date(), -1), "yyyy-MM-dd"),
		to: format(addMonths(new Date(), 0), "yyyy-MM-dd"),
	});

	const updateFromDate = (fromDate: string) => setDate((prevDate) => ({ ...prevDate, from: fromDate }));
	const updateToDate = (toDate: string) => setDate((prevDate) => ({ ...prevDate, to: toDate }));

	return { date, updateFromDate, updateToDate };
}
