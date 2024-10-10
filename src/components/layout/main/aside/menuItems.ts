import { ROUTES } from "@/constants/routes";
import {
	HandCoins,
	Warehouse,
	TrendingDown,
	Package,
	AlignJustify,
	Logs,
	LucideIcon,
	ReceiptText,
	ArrowRightToLine,
	ChartColumnDecreasing,
} from "lucide-react";

export const menuItems: { title: string; items: { link: string; icon: LucideIcon; text: string }[] }[] = [
	{
		title: "Статистика",
		items: [
			{
				link: "/",
				icon: HandCoins,
				text: ROUTES.FINANCE.name,
			},
			{
				link: ROUTES.EXPENSE_STATS.route,
				icon: ChartColumnDecreasing,
				text: ROUTES.EXPENSE_STATS.name,
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
				link: ROUTES.PRODUCT_LIST.route,
				icon: AlignJustify,
				text: ROUTES.PRODUCT_LIST.name,
			},
		],
	},
	{
		title: "Касса",
		items: [
			{
				link: ROUTES.PAYMENT.route,
				icon: ReceiptText,
				text: ROUTES.PAYMENT.name,
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
				link: ROUTES.ORDERS.route,
				icon: Logs,
				text: ROUTES.ORDERS.name,
			},
		],
	},
	{
		title: "Админстараторская",
		items: [
			{
				link: ROUTES.MENU_LIST.route,
				icon: Logs,
				text: ROUTES.MENU_LIST.name,
			},
			{
				link: ROUTES.PRODUCT.route,
				icon: Package,
				text: ROUTES.PRODUCT.name,
			},

			{
				link: ROUTES.WAREHOUSE.route,
				icon: Warehouse,
				text: ROUTES.WAREHOUSE.name,
			},
			{
				link: ROUTES.EXPENSE.route,
				icon: TrendingDown,
				text: ROUTES.EXPENSE.name,
			},
		],
	},
];
