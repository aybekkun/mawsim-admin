import { FC } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { View } from "lucide-react";

const PaymentCloseTable: FC = () => {
	return (
		<Table className="w-[600px] bg-white border mt-4">
			<TableCaption>Таблица заказов</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[70px]">Стол</TableHead>
					<TableHead>Статус</TableHead>
					<TableHead>Количество заказов</TableHead>
					<TableHead>Сумма</TableHead>
					<TableHead className="text-right">Итого %</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-bold">101</TableCell>
					<TableCell>Оплачен</TableCell>
					<TableCell className="text-center justify-center flex items-center gap-3">
						45
						<Button className="rounded-full" variant={"outline"} size={"icon"}>
							<View />
						</Button>
					</TableCell>
					<TableCell>500 000 uzs</TableCell>
					<TableCell className="text-right">550 000 uzs</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default PaymentCloseTable;
