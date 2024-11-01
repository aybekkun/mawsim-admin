import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { Card, CardContent } from "@/components/ui/card";
import { useDeleteUserMutation, useGetAllUsersQuery } from "@/services/auth/auth.api";
import { TUser } from "@/services/auth/auth.types";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { USER_ROLES } from "@/constants/appConstants";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import AddUser from "./AddUser";
const UsersTable = ({ className = `` }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [roleId, setRoleId] = useState(0);
	const { data } = useGetAllUsersQuery({ page: currentPage, role_id: roleId ? roleId : "" });

	const onChangeRole = (value: string) => {
		setCurrentPage(1);
		setRoleId(Number(value));
	};
	const columns: TColumns<TUser>[] = [
		{
			title: "Имя",
			dataIndex: "name",
		},
		{
			title: "Телефон",
			dataIndex: "phone",
			render: (_, record) => <div className="whitespace-nowrap">{formatPhoneNumber(record.phone)}</div>,
		},
		{
			title: (
				<Select onValueChange={onChangeRole}>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder="Должность" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Должность</SelectLabel>
							<SelectItem value="0">Все</SelectItem>
							{USER_ROLES.map((role) => (
								<SelectItem key={role.id} value={String(role.id)}>
									{role.name}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			),
			render: (_, record) => <>{record.role.name}</>,
		},
		{
			title: "Действия",
			render: (_, record) => <Actions record={record} />,
		},
	];
	return (
		<Card className={className}>
			<CardContent>
				<MyTable columns={columns} source={data?.data || []} />
				<MyPagination
					currentPage={currentPage}
					totalPosts={data?.meta.total || 0}
					postsPerPage={10}
					setCurrentPage={setCurrentPage}
				/>
			</CardContent>
		</Card>
	);
};

const Actions = ({ record }: { record: TUser }) => {
	const [open, setOpen] = useState(false);
	const { mutate: deleteUser, isPending: isDeleting } = useDeleteUserMutation();
	const onDelete = async () => {
		if (window.confirm("Вы действительно хотите удалить пользователя?")) await deleteUser(record.id);
	};
	return (
		<div className="space-x-2 flex items-center">
			<Button onClick={() => setOpen(true)} variant="outline" size={"icon"}>
				<Pencil className="h-4 w-4" />
			</Button>
			<Button disabled={isDeleting} onClick={onDelete} variant="destructive" size={"icon"}>
				<Trash2 className="h-4 w-4" />
			</Button>
			<AddUser type="edit" obj={record} open={open} setOpen={setOpen}  />
		</div>
	);
};

export default UsersTable;
