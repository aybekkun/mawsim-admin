import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	useDeleteCafeTablesMutation,
	useGetAllCafeTablesQuery,
} from "@/services/administrator/cafetables/cafetables.api";
import { TCafeTable } from "@/services/administrator/cafetables/cafetables.types";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FC, useState } from "react";
import CafeTablesForm from "./CafeTablesForm";

interface CafeTablesProps {
	className?: string;
}
const columns: TColumns<TCafeTable>[] = [
	{
		title: "Название стола",
		dataIndex: "name",
	},
	{
		title: "Действия",
		render: (_, record) => <Actions record={record} />,
	},
];

const CafeTables: FC<CafeTablesProps> = ({ className = `` }) => {
	const [open, setOpen] = useState(false);
	const { data } = useGetAllCafeTablesQuery();

	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle className="flex flex-wrap items-center justify-between">
						Список столов{" "}
						<Button size={"icon"} onClick={() => setOpen(true)}>
							<Plus />
						</Button>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<MyTable source={data?.data || []} columns={columns} />
				</CardContent>
			</Card>
			<CafeTablesForm open={open} setOpen={setOpen} type="create" />
		</div>
	);
};

const Actions = ({ record }: { record: TCafeTable }) => {
	const { mutate: deleteTable, isPending: isDeleting } = useDeleteCafeTablesMutation();
	
	const [open, setOpen] = useState(false);
	const onDelete = async () => {
		if (window.confirm("Вы действительно хотите удалить?")) await deleteTable(record.id);
	};
	
	return (
		<>
			<div className="space-x-2 flex items-center">
				<Button onClick={() => setOpen(true)} variant="outline" size={"icon"}>
					<Pencil className="h-4 w-4" />
				</Button>
				<Button disabled={isDeleting} onClick={onDelete} variant="destructive" size={"icon"}>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
			<CafeTablesForm type="edit" obj={record} open={open} setOpen={setOpen} />
		</>
	);
};

export default CafeTables;
