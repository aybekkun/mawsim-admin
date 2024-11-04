import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import SearchInput from "@/components/shared/SearchInput/SearchInput";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllWarehouseFoodQuery } from "@/services/director/director.api";
import { TFoodExpense } from "@/services/director/director.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FC, useState } from "react";
import { FOOD_CATEGORY, FOOD_FORMAT } from "@/constants/appConstants";
const columns: TColumns<TFoodExpense>[] = [
	{
		title: "Название сырья",
		dataIndex: "name",
	},
	{
		title: "Категория",
		render: (_, record) => <>{record.category.name}</>,
	},
	{
		title: "Тип",
		render: (_, record) => <>{record.format.name}</>,
	},

	{
		title: "Количество",
		render: (_, record) => <>{record.stock}</>,
	},
];

const FoodStats: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [categoryId, setCategoryId] = useState(0);
	const [formatId, setFormatId] = useState(0);
	const [debouncedValue, setDebouncedValue] = useState<string>("");
	const { data, isLoading } = useGetAllWarehouseFoodQuery({
		page: currentPage,
		search: debouncedValue,
		category_id: categoryId !== 0 ? categoryId : undefined,
		format_id: formatId !== 0 ? formatId : undefined,
	});
	return (
		<div className={"space-y-4"}>
			<h2 className="text-3xl font-bold tracking-tight">Товары кафе</h2>
			<div className="flex flex-wrap gap-4">
				<SearchInput setCurrentPage={setCurrentPage} setDebouncedValue={setDebouncedValue} delay={500} />
				<Select
					onValueChange={(val) => {
						setCategoryId(Number(val));
						setCurrentPage(1);
					}}
				>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder="Категория" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="0">Все</SelectItem>
						{FOOD_CATEGORY.map((role) => (
							<SelectItem key={role.id} value={String(role.id)}>
								{role.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select
					onValueChange={(val) => {
						setFormatId(Number(val));
						setCurrentPage(1);
					}}
				>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder="Тип" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="0">Все</SelectItem>
						{FOOD_FORMAT.map((item) => (
							<SelectItem key={item.id} value={String(item.id)}>
								{item.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
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

export default FoodStats;
