import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import SearchInput from "@/components/shared/SearchInput/SearchInput";

import { Card, CardContent } from "@/components/ui/card";

import { TFoodExpense } from "@/services/director/director.types";
import { FC, useState } from "react";

import { SelectDate } from "@/components/shared/SelectDate/SelectDate";
import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { Button } from "@/components/ui/button";
import { ListCollapse } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDateRange } from "@/hooks/useDateRange.hook";
import { useDetailFoodExpenseQuery, useGetFoodExpenseQuery, useGetProfitQuery } from "@/services/director/director.api";
import { formatToLocale } from "@/utils/currencyFormat";

const FoodExpense: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { date, updateFromDate, updateToDate } = useDateRange();
	const [debouncedValue, setDebouncedValue] = useState<string>("");
	const { data, isLoading } = useGetFoodExpenseQuery({
		from: date.from,
		to: date.to,
		search: debouncedValue,
		page: currentPage,
	});
	const { data: expense } = useGetProfitQuery({ from: date.from, to: date.to });
	const columns: TColumns<TFoodExpense>[] = [
		{
			title: "Склад",
			render: (_, record) => <>{record.name}</>,
		},
		{
			title: "Количество",
			render: (_, record) => <>{formatToLocale(String(record.stock))}</>,
		},
		{
			title: "Тип",
			render: (_, record) => <>{record.format.name}</>,
		},
		{
			title: "Категория",
			render: (_, record) => <>{record.category.name}</>,
		},
		{
			title: "Детально",
			render: (_, record) => <FoodDetail record={record} id={record.id} from={date.from} to={date.to} />,
		},
	];
	return (
		<div className="space-y-4">
			<div className="flex flex-wrap gap-4 justify-between">
				<h2 className="text-3xl font-bold tracking-tight">Заготовка</h2>
			</div>
			<div className="flex flex-wrap gap-4 items-center">
				<SearchInput setCurrentPage={setCurrentPage} setDebouncedValue={setDebouncedValue} delay={500} />
				<SelectDate title="от" month={-1} setCurrentPage={setCurrentPage} selectDate={updateFromDate} />
				<SelectDate title="до" month={0} setCurrentPage={setCurrentPage} selectDate={updateToDate} />
				<b>Общий: {expense && formatToLocale(String(expense.data.expenses_food))} сум</b>
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

type TFoodDetailProps = {
	from?: string;
	id: number;
	to?: string;
	record: TFoodExpense;
};
const FoodDetail = ({ id, from = "", to = "", record }: TFoodDetailProps) => {
	const [open, setOpen] = useState(false);
	const { data } = useDetailFoodExpenseQuery({ from, id, to }, open);
	console.log(data);

	return (
		<>
			<Button size={"icon"} onClick={() => setOpen(true)} variant={"ghost"}>
				<ListCollapse className="h-4 w-4" />
			</Button>
			<MyDialog open={open} onOpenChange={setOpen} title={"Расход от: " + from + " до: " + to + ""}>
				<ScrollArea>
					<div className="space-y-4">
						<div>
							<Label>Название : </Label>
							{record.name}
						</div>
						<div>
							<Label>Тип : </Label>
							{record.format.name}
						</div>
						<div>
							<Label>Количество на складе: </Label>
							{formatToLocale(String(record.stock))}
						</div>

						<div className="w-full">
							<Table className="w-full">
								<TableHeader>
									<TableRow>
										<TableHead>Количество</TableHead>
										<TableHead>Цена за штуку</TableHead>
										<TableHead>Цена</TableHead>
										<TableHead>Время</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data?.data.expenses.map((item) => (
										<TableRow key={item.id}>
											<TableCell>{formatToLocale(String(item.quantity))}</TableCell>
											<TableCell>{formatToLocale(String(item.per_price))}</TableCell>
											<TableCell>{formatToLocale(String(item.price))}</TableCell>
											<TableCell>{item.date}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				</ScrollArea>
			</MyDialog>
		</>
	);
};

export default FoodExpense;
