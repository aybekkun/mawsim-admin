
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatToLocale } from "@/utils/currencyFormat";

import { ReactNode } from "react";
import PopupEdit from "./PopupEdit";

interface StockDialogProps {
	food_id: number;
	data?: {
		id: number;
		quantity: string;
		price: string;
		per_price: string;
		date: Date;
	}[];
	open?: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
}

const StockSheetFood = ({ food_id, data, children = <></>, open, onOpenChange }: StockDialogProps) => {
	return (
		<Dialog open={open} onOpenChange={() => onOpenChange(!open)}>
			<DialogDescription></DialogDescription>
			<DialogContent className=" sm:min-w-full overflow-x-auto mx-2">
				<DialogHeader>
					<DialogTitle>История поступлений</DialogTitle>
				</DialogHeader>
				{children}
				{data ? (
					<>
						<Card>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Дата</TableHead>
											<TableHead>Количество</TableHead>
											<TableHead>Цена</TableHead>
											<TableHead>Цена за штуку</TableHead>
											<TableHead>Действие</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{data.map((item) => (
											<TableRow key={item.id}>
												<TableCell>{item.date.toString()}</TableCell>
												<TableCell>{formatToLocale(item.quantity)}</TableCell>
												<TableCell>{formatToLocale(item.price)}</TableCell>
												<TableCell>{formatToLocale(item.per_price)}</TableCell>
												<TableCell>
													<PopupEdit
														values={{
															id: food_id,
															price: Number(item.price),
															quantity: Number(item.quantity),
															expense_id: item.id,
														}}
													/>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</>
				) : (
					<Skeleton className="w-full h-[400px]" />
				)}
			</DialogContent>
		</Dialog>
	);
};

export default StockSheetFood;
