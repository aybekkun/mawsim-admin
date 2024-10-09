import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { Button } from "@/components/ui/button";
import {
	useDeleteOtherExpenseMutation,
	useGetAllOtherExpenseQuery,
} from "@/services/administrator/expense/expense.api";
import { TOtherExpense } from "@/services/administrator/expense/expense.types";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import OtherExpensesForm from "./OtherExpensesForm";

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
	{
		title: "Действия",
		render: (_, record) => <Actions record={record} />,
	},
];

const OtherExpensesTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useGetAllOtherExpenseQuery(currentPage);

	return (
		<>
			<MyTable source={data?.data || []} columns={columns} loading={isLoading} currentPage={currentPage} />
			<MyPagination
				totalPosts={data?.meta?.total || 1}
				postsPerPage={10}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
};

const Actions = ({ record }: { record: TOtherExpense }) => {
	const { mutate: deleteExpense, isPending } = useDeleteOtherExpenseMutation();
	const [open, setOpen] = useState(false);
	const onDelete = async () => {
		if (window.confirm("Вы действительно хотите удалить расход?")) await deleteExpense(record.id);
	};
	return (
		<>
			<div className="space-x-2 flex items-center">
				<Button onClick={() => setOpen(true)} variant="outline" size={"icon"}>
					<Pencil className="h-4 w-4" />
				</Button>
				<Button disabled={isPending} onClick={onDelete} variant="destructive" size={"icon"}>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
			<OtherExpensesForm obj={record} open={open} setOpen={setOpen} type="edit" />
		</>
	);
};

export default OtherExpensesTable;
