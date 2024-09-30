import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { useGetAllMenuQuery } from "@/services/administrator/menu/menu.api";
import { TMenu } from "@/services/administrator/menu/menu.types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
const columns: TColumns<TMenu>[] = [
	{
		title: "Название",
		render: (_, record) => <>{record.food.name}</>,
	},
	{
		title: "Цена",
		dataIndex: "price",
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
	const { data, isLoading } = useGetAllMenuQuery();
	return (
		<>
			<MyTable source={data?.data || []} columns={columns} loading={isLoading} />
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
	return <></>;
};

export default MenuListTable;
