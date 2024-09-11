import { FC, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { View } from "lucide-react";
import PayAction from "../payaction/PayAction";

const PaymentOpenTable: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Table className="w-[700px] border bg-white mt-4">
				<TableCaption>Таблица заказов</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[70px]">Стол</TableHead>
						<TableHead>Статус</TableHead>
						<TableHead>Количество заказов</TableHead>
						<TableHead>Сумма</TableHead>
						<TableHead className="text-right">Итого %</TableHead>
						<TableHead>Действия</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className="font-bold">101</TableCell>
						<TableCell>Не оплачен</TableCell>
						<TableCell className="text-center justify-center flex items-center gap-3">
							45
							<Button className="rounded-full" variant={"outline"} size={"icon"}>
								<View />
							</Button>
						</TableCell>
						<TableCell>500 000 uzs</TableCell>
						<TableCell className="text-right">550 000 uzs</TableCell>
						<TableCell className="flex gap-1 text-right">
							<Button onClick={() => setIsOpen(true)} size={"sm"}>
								Оплатить
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<PayAction open={isOpen} setOpen={() => setIsOpen(false)} />
		</>
	);
};

export default PaymentOpenTable;
