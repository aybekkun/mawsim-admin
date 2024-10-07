import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteSalaryMutation, useGetAllSalaryQuery } from "@/services/administrator/expense/expense.api";
import { TSalaryExpense } from "@/services/administrator/expense/expense.types";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import SalariesForm from "./SalariesForm";

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
	{
		title: "Действия",
		render: (_, record) => <Actions record={record} />,
	},
];

const SalariesTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useGetAllSalaryQuery(currentPage);

	return (
		<>
			<MyTable currentPage={currentPage} loading={isLoading} source={data?.data || []} columns={columns} />
			<MyPagination
				totalPosts={data?.meta.total || 0}
				postsPerPage={10}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
};

const Actions = ({ record }: { record: TSalaryExpense }) => {
	const { mutate: deleteSalary, isPending } = useDeleteSalaryMutation();
	const [open, setOpen] = useState(false);
	const onDelete = async () => {
		if (window.confirm("Вы действительно хотите удалить?")) await deleteSalary(record.id);
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
			<SalariesForm type="edit" obj={record} open={open} setOpen={setOpen}/>
		</>
	);
};

export default SalariesTable;
