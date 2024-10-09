import { FC } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MyPagination from "@/components/shared/MyPagination/MyPagination";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
const transactions = [
	{ id: 1, name: "Картошка", amount: -1200, category: "Расход" },
	{ id: 2, name: "Сомса", amount: 3500, category: "Доход" },
	{ id: 3, name: "На бензин", amount: -400, category: "Расход" },
	{ id: 4, name: "Заказ", amount: 2800, category: "Доход" },
	{ id: 5, name: "Расходники для кухни", amount: -2000, category: "Расход" },
];
interface RecentTransactionsProps {
	className?: string;
}

const RecentTransactions: FC<RecentTransactionsProps> = ({ className = `` }) => {
	return (
		<ScrollArea>
			<Card className={className}>
				<CardHeader>
					<CardTitle>Недавные транзакции</CardTitle>
					<CardDescription>транзакции.</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Имя</TableHead>
								<TableHead>Category</TableHead>
								<TableHead className="text-right">Сумма</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{transactions.map((transaction) => (
								<TableRow key={transaction.id}>
									<TableCell className="font-medium">{transaction.name}</TableCell>
									<TableCell>{transaction.category}</TableCell>
									<TableCell className="text-right">
										<span className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}>
											{transaction.amount > 0 ? "+" : "-"}
											{Math.abs(transaction.amount).toFixed(2)}
										</span>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					<MyPagination totalPosts={100} postsPerPage={10} currentPage={1} setCurrentPage={() => {}} />
				</CardContent>
			</Card>
            <ScrollBar orientation="horizontal"/>
		</ScrollArea>
	);
};

export default RecentTransactions;
