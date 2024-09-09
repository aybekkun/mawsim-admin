import { ROUTES } from "@/constants/routes";
import { HandCoins, Package,AlignJustify, Logs, LucideIcon, ReceiptText, ArrowRightToLine } from "lucide-react";

export const menuItems: { title: string; items: { link: string; icon: LucideIcon; text: string }[] }[] = [
	{
		title: "Статистика",
		items: [
			{
				link: ROUTES.FINANCE,
				icon: HandCoins,
				text: "Финансы",
			},
			{
				link: ROUTES.WAREHOUSE_STATS,
				icon: Package,
				text: "Товары на складе",
			},
			{
				link: "/",
				icon: Logs,
				text: "Заказы",
			},

			{
				link: "/",
				icon: AlignJustify,
				text: "Список товаров",
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
				link: ROUTES.ACCEPT_ORDER,
				icon: ArrowRightToLine,
				text: "Принять заказ",
			},
			{
				link: "/",
				icon: Logs,
				text: "Заказы",
			},
		],
	},
];
