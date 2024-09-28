import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { ReactNode } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
interface StockDialogProps {
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

const StockDialog = ({ data, children = <></>, open, onOpenChange }: StockDialogProps) => {
	return (
		<Dialog open={open} onOpenChange={() => onOpenChange(!open)}>
			<DialogDescription></DialogDescription>
			<DialogContent className="h-[700px] sm:min-w-full overflow-x-auto">
				<DialogHeader>
					<DialogTitle>История поступлений</DialogTitle>
				</DialogHeader>
				{children}
				{data ? (
					<>
						<ResponsiveContainer width={"100%"} height={300}>
							<LineChart data={data}>
								<CartesianGrid strokeDasharray="1 1" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="per_price" stroke="#8884d8" name="Цена за штуку" />
								<Line type="monotone" dataKey="quantity" stroke="#82ca9d" name="Количество" />
								<Line type="monotone" dataKey="price" stroke="#8f00ff" name="Цена" />
							</LineChart>
						</ResponsiveContainer>

						<Card>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>ID</TableHead>
											<TableHead>Дата</TableHead>
											<TableHead>Количество</TableHead>
											<TableHead>Цена</TableHead>
											<TableHead>Цена за штуку</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{data.map((item) => (
											<TableRow key={item.id}>
												<TableCell>{item.id}</TableCell>
												<TableCell>{item.date.toString()}</TableCell>
												<TableCell>{item.quantity}</TableCell>
												<TableCell>{item.price}</TableCell>
												<TableCell>{item.per_price}</TableCell>
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

export default StockDialog;
