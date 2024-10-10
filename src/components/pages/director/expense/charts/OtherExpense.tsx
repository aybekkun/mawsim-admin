import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useGetAllOtherExpenseQuery } from "@/services/administrator/expense/expense.api";
import { TOtherExpense } from "@/services/administrator/expense/expense.types";
import { FC, useState } from "react";

interface OtherExpenseProps {
	className?: string;
}
const columns: TColumns<TOtherExpense>[] = [
	{
		title: "Расход",
		dataIndex: "comment",
	},
	{
		title: "Сумма",
		render: (_, record) => <>{Number(record.amount).toLocaleString("ru-Ru")}</>,
	},
	{
		title: "Дата",
		dataIndex: "date",
		render: (row) => <p className="text-nowrap">{String(row)}</p>,
	},
];
const OtherExpense: FC<OtherExpenseProps> = ({ className = `` }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useGetAllOtherExpenseQuery(currentPage);

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Другие расходы</CardTitle>
			</CardHeader>
			<CardContent >
				<ScrollArea className="overflow-hidden">
					<MyTable source={data?.data || []} columns={columns} loading={isLoading} currentPage={currentPage} />
					<MyPagination
						totalPosts={data?.meta?.total || 1}
						postsPerPage={10}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</CardContent>
		</Card>
	);
};

export default OtherExpense;
