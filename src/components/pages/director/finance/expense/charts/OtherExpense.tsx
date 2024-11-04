import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import SearchInput from "@/components/shared/SearchInput/SearchInput";

import { Card, CardContent } from "@/components/ui/card";

import { FC, useState } from "react";

import { SelectDate } from "@/components/shared/SelectDate/SelectDate";

import { useDateRange } from "@/hooks/useDateRange.hook";
import { useGetAllOtherExpenseQuery } from "@/services/director/director.api";
import { formatToLocale } from "@/utils/currencyFormat";
import { TOtherExpense } from "@/services/administrator/expense/expense.types";
import SelectAscDesc from "@/components/shared/SearchInput/SelectAscDesc";

const OtherExpense: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [sortDate, setSortDate] = useState<"asc" | "desc">("desc");

	const { date, updateFromDate, updateToDate } = useDateRange();

	const { data, isLoading } = useGetAllOtherExpenseQuery({
		from: date.from,
		to: date.to,
		page: currentPage,
		sort_date: sortDate,
	});

	const columns: TColumns<TOtherExpense>[] = [
		{
			title: "Комментарий",
			render: (_, record) => <>{record.comment}</>,
		},
		{
			title: "Сумма",
			render: (_, record) => <>{formatToLocale(String(record.amount))}</>,
		},
		{
			title: <SelectAscDesc title="Время" setSelect={setSortDate} />,
			render: (_, record) => <>{record.date}</>,
		},
	];
	return (
		<div className="space-y-4">
			<div className="flex flex-wrap gap-4 justify-between">
				<h2 className="text-3xl font-bold tracking-tight">Товары</h2>
			</div>
			<div className="flex flex-wrap gap-4">
				<SelectDate title="от" month={-1} setCurrentPage={setCurrentPage} selectDate={updateFromDate} />
				<SelectDate title="до" month={0} setCurrentPage={setCurrentPage} selectDate={updateToDate} />
			</div>
			<Card>
				<CardContent>
					<MyTable columns={columns} source={data?.data || []} loading={isLoading} />
				</CardContent>
			</Card>
			<MyPagination
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalPosts={data?.meta.total || 0}
				postsPerPage={10}
			/>
		</div>
	);
};

export default OtherExpense;
