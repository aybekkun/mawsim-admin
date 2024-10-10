import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollBar } from "@/components/ui/scroll-area";
import { useGetAllSalaryQuery } from "@/services/administrator/expense/expense.api";
import { TSalaryExpense } from "@/services/administrator/expense/expense.types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { X } from "lucide-react";
import { FC, useState } from "react";
const columns: TColumns<TSalaryExpense>[] = [
	{
		title: "Пользователь",
		render: (_, record) => <>{record.user.name}</>,
	},
	{
		title: "Сумма",
		dataIndex: "amount",
		render: (_, record) => <>{Number(record.amount).toLocaleString("ru-Ru")}</>,
	},
	{ title: "Дата", dataIndex: "date", render: (row) => <p className="text-nowrap">{String(row)}</p> },
];

interface SalaryExpenseProps {
	className?: string;
}

const SalaryExpense: FC<SalaryExpenseProps> = ({ className = `` }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const { data, isLoading, isFetching } = useGetAllSalaryQuery({
		page: currentPage,
		search: searchTerm,
	});
	const onSearch = (value: string) => {
		setSearchTerm(value);
		setCurrentPage(1);
	};
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Зарплата</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="relative w-52">
					<Input value={searchTerm} onChange={(e) => onSearch(e.target.value)} />
					{searchTerm && <X onClick={() => onSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-35" />}
				</div>
				<MyTable
					source={data?.data || []}
					columns={columns}
					loading={isLoading}
					fetching={isFetching}
					currentPage={currentPage}
				/>
				<MyPagination
					totalPosts={data?.meta?.total || 1}
					postsPerPage={10}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</CardContent>
		</Card>
	);
};

export default SalaryExpense;
