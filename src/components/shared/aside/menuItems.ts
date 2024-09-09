import { HandCoins, Package, Wallet, Logs, LucideIcon, ReceiptText, ArrowRightToLine } from "lucide-react";

export const menuItems: { title: string; items: { link: string; icon: LucideIcon; text: string }[] }[] = [
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
				link: "/accept-order",
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
	{
		title: "Статистика",
		items: [
			{
				link: "/",
				icon: HandCoins,
				text: "Финансы",
			},
			{
				link: "/",
				icon: Package,
				text: "Товары на складе",
			},

			{
				link: "/",
				icon: Wallet,
				text: "Дохады/расходы",
			},

			{
				link: "/",
				icon: Logs,
				text: "Заказы",
			},
		],
	},
	{
		title: "Статистика",
		items: [
			{
				link: "/",
				icon: HandCoins,
				text: "Финансы",
			},
			{
				link: "/",
				icon: Package,
				text: "Товары на складе",
			},

			{
				link: "/",
				icon: Wallet,
				text: "Дохады/расходы",
			},

			{
				link: "/",
				icon: Logs,
				text: "Заказы",
			},
		],
	},
];
