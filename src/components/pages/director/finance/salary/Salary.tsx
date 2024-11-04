import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import SearchInput from "@/components/shared/SearchInput/SearchInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useDetailSalaryQuery, useGetAllDirectorSalaryQuery } from "@/services/director/director.api";
import { TDirectorUser } from "@/services/director/director.types";
import { FC, useState } from "react";
import { USER_ROLES } from "@/constants/appConstants";

import { SelectDate } from "@/components/shared/SelectDate/SelectDate";
import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { Button } from "@/components/ui/button";
import { ListCollapse } from "lucide-react";
import { Label } from "@/components/ui/label";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDateRange } from "@/hooks/useDateRange.hook";
import { formatToLocale } from "@/utils/currencyFormat";

const Salary: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { date, updateFromDate, updateToDate } = useDateRange();
	const [debouncedValue, setDebouncedValue] = useState<string>("");

	const [roleId, setRoleId] = useState(0);
	const { data, isLoading } = useGetAllDirectorSalaryQuery({
		from: date.from,
		to: date.to,
		role_id: roleId !== 0 ? roleId : undefined,
		search: debouncedValue,
		page: currentPage,
	});
	const columns: TColumns<TDirectorUser>[] = [
		{
			title: "Пользователь",
			render: (_, record) => <>{record.name}</>,
		},
		{
			title: "Сумма",
			dataIndex: "total_amount",
			render: (_, record) => <>{formatToLocale(String(record.total_amount))}</>,
		},
		{
			title: "Детально",
			render: (_, record) => <SalaryDetail record={record} id={record.id} from={date.from} to={date.to} />,
		},
	];
	return (
		<div className="space-y-4">
			<div className="flex flex-wrap gap-4 justify-between">
				<h2 className="text-3xl font-bold tracking-tight">Зарплата</h2>
			</div>
			<div className="flex flex-wrap gap-4">
				<SearchInput setCurrentPage={setCurrentPage} setDebouncedValue={setDebouncedValue} delay={500} />
				<Select onValueChange={(val) => setRoleId(Number(val))}>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder="Должность" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="0">Все</SelectItem>
						{USER_ROLES.map((role) => (
							<SelectItem key={role.id} value={String(role.id)}>
								{role.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<SelectDate title="от" month={-1} setCurrentPage={setCurrentPage} selectDate={updateFromDate} />
				<SelectDate title="до" month={0} setCurrentPage={setCurrentPage} selectDate={updateToDate} />
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

type TSalaryDetailProps = {
	from?: string;
	id: number;
	to?: string;
	record: TDirectorUser;
};
const SalaryDetail = ({ id, from = "", to = "", record }: TSalaryDetailProps) => {
	const [open, setOpen] = useState(false);
	const { data } = useDetailSalaryQuery({ from, id, to }, open);
	return (
		<>
			<Button size={"icon"} onClick={() => setOpen(true)} variant={"ghost"}>
				<ListCollapse className="h-4 w-4" />
			</Button>

			<MyDialog open={open} onOpenChange={setOpen} title={"Зарплата от: " + from + " до: " + to + ""}>
				<ScrollArea>
					<div className="space-y-4">
						<div>
							<Label>ФИО : </Label>
							{record.name}
						</div>
						<div>
							<Label>Должность : </Label>
							{record.role.name}
						</div>
						<div>
							<Label>Номер : </Label>
							{formatPhoneNumber(record.phone)}
						</div>
						<div>
							<Label>Получил : </Label>
							{Number(record.total_amount).toLocaleString("ru-Ru")}
						</div>
						<div className="w-full">
							<Table className="w-full">
								<TableHeader>
									<TableRow>
										<TableHead>Тип</TableHead>
										<TableHead>Время</TableHead>
										<TableHead>Сумма</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data?.data.salaries.map((item) => (
										<TableRow key={item.id}>
											<TableCell>{item.category.name}</TableCell>
											<TableCell>{item.date}</TableCell>
											<TableCell>{Number(item.amount).toLocaleString("ru-Ru")}</TableCell>
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

export default Salary;
