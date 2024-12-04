import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { useDeleteMenuMutation, useGetAllMenuQuery } from "@/services/administrator/menu/menu.api";
import { TMenu } from "@/services/administrator/menu/menu.types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import AddMenuForm from "./AddMenuForm";
import MyPagination from "@/components/shared/MyPagination/MyPagination";
const columns: TColumns<TMenu>[] = [
	{
		title: "Название",
		render: (_, record) => <>{record.food.name}</>,
	},
	{
		title: "Цена",
		render: (_, record) => <>{Number(record.price).toLocaleString("ru-Ru")}</>,
	},
	{
		title: "Категория",
		render: (_, record) => <>{record.food.category.name}</>,
	},
	{
		title: "Тип",
		render: (_, record) => <>{record.food.format.name}</>,
	},
	{
		title: "Картинки",
		render: (_, record) => <MenuImages record={record} />,
	},
	{
		title: "Действия",
		render: (_, record) => <Actions record={record} />,
	},
];
const MenuListTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useGetAllMenuQuery({ page: currentPage, limit: 10 });
	return (
		<>
			<MyTable currentPage={currentPage} source={data?.data || []} columns={columns} loading={isLoading} />
			<MyPagination
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalPosts={data?.meta.total || 0}
				postsPerPage={10}
			/>
		</>
	);
};

const MenuImages = ({ record }: { record: TMenu }) => {
	return (
		<Dialog>
			<DialogTrigger>
				{record.food.images?.map((item) => (
					<img
						key={item.image_url}
						src={item.image_url}
						alt=""
						width={30}
						height={30}
						className="cursor-pointer rounded-md hover:opacity-80 transition-opacity"
					/>
				))}
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Изображения</DialogTitle>
				</DialogHeader>
				<DialogDescription></DialogDescription>
				<div className="mt-4">
					{record.food.images?.map((item) => (
						<img
							key={item.image_url}
							src={item.image_url}
							alt=""
							width={350}
							height={350}
							className="cursor-pointer rounded-md hover:opacity-80 transition-opacity"
						/>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};
const Actions = ({ record }: { record: TMenu }) => {
	const [open, setOpen] = useState(false);
	const { mutate: deleteMenu } = useDeleteMenuMutation();

	const onDelete = async () => {
		if (window.confirm("Действительно хотите удалить меню?")) await deleteMenu(record.id);
	};

	return (
		<div className="space-x-2 flex items-center">
			<Button onClick={() => setOpen(true)} variant="outline" size={"icon"}>
				<Pencil className="h-4 w-4" />
			</Button>
			<Button onClick={onDelete} size={"icon"} variant="destructive">
				<Trash2 className="h-4 w-4" />
			</Button>
			<AddMenuForm obj={record} open={open} setOpen={setOpen} type="edit" />
		</div>
	);
};

export default MenuListTable;
