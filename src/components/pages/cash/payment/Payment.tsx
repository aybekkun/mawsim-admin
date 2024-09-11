import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ArrowDownNarrowWide, ArrowUpNarrowWide, Coins, Search } from "lucide-react";
import { FC } from "react";
import PaymentOpenTable from "./table/PaymentOpenTable";
import PaymentCloseTable from "./table/PaymentCloseTable";
import SearchInput from "@/components/shared/search/SearchInput";

interface PaymentProps {
	className?: string;
}

const Payment: FC<PaymentProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<div className="gap-4">
				<div className="infolist grid grid-cols-3 gap-4 ">
					<Card>
						<CardHeader>
							<ArrowDownNarrowWide />
							<CardDescription>Количество активных заказов</CardDescription>
							<CardTitle>7</CardTitle>
						</CardHeader>
					</Card>
					<Card>
						<CardHeader>
							<ArrowUpNarrowWide />
							<CardDescription>Количество закрытых заказов</CardDescription>
							<CardTitle>З40</CardTitle>
						</CardHeader>
					</Card>
					<Card>
						<CardHeader>
							<Coins />
							<CardDescription>Общая сумма</CardDescription>
							<CardTitle>120 2230 uzs</CardTitle>
						</CardHeader>
					</Card>
				</div>
				<div className="ordertable mt-4">
					<Tabs defaultValue="open">
						<TabsList>
							<TabsTrigger value="open">Открытые</TabsTrigger>
							<TabsTrigger value="close">Закрытые</TabsTrigger>
						</TabsList>
						<TabsContent value="open">
							<SearchInput />
							<PaymentOpenTable />
						</TabsContent>
						<TabsContent value="close">
							<div className="relative">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Поиск столов..."
									className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
								/>
							</div>
							<PaymentCloseTable />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default Payment;
