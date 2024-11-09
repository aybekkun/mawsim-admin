import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, LucideIcon } from "lucide-react";
import { FC } from "react";

interface InfoCardProps {
	className?: string;
	title?: string;
	value?: string | number;
	description?: string;
	Icon?: LucideIcon;
}

const InfoCard: FC<InfoCardProps> = ({
	title = "",
	description = "",
	value = "",
	Icon = DollarSign,
	className = ``,
}) => {
	return (
		<Card className={"w=[300px] " + className}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<Icon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold text-nowrap">{value}</div>
				<p className="text-xs text-muted-foreground">{description}</p>
			</CardContent>
		</Card>
	);
};

export default InfoCard;
