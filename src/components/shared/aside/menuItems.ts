import { ROUTES } from "@/constants/routes";
import { HandCoins, Package,AlignJustify, Logs, LucideIcon, ReceiptText, ArrowRightToLine } from "lucide-react";

export const menuItems: { title: string; items: { link: string; icon: LucideIcon; text: string }[] }[] = [
	{
		title: "Статистика",
		items: [
			{
				link: ROUTES.FINANCE.route,
				icon: HandCoins,
				text: ROUTES.FINANCE.name,
			},
			{
				link: ROUTES.WAREHOUSE_STATS.route,
				icon: Package,
				text: ROUTES.WAREHOUSE_STATS.name,
			},
			{
				link: ROUTES.ORDER_STATS.route,
				icon: Logs,
				text: ROUTES.ORDER_STATS.name,
			},

			{
				link:ROUTES.PRODUCT_LIST.route,
				icon: AlignJustify,
				text: ROUTES.PRODUCT_LIST.name,
			},
		],
	},
	{
		title: "Касса",
		items: [
			{
				link: "/",
				icon: ReceiptText,
				text: "Оплата",
			},
		],
	},
	{
		title: "Заказы",
		items: [
			{
				link: ROUTES.ACCEPT_ORDER.route,
				icon: ArrowRightToLine,
				text: ROUTES.ACCEPT_ORDER.name,
			},
			{
				link: "/",
				icon: Logs,
				text: "Заказы",
			},
		],
	},
];
