import { ROUTES } from "@/constants/routes";
import {
	HandCoins,
	Warehouse,
	TrendingDown,
	Package,
	Table,
	Logs,
	LucideIcon,
	ReceiptText,
	ArrowRightToLine,
	ChartColumnDecreasing,
	ChartNoAxesCombined,
	Handshake,
	Archive,
	UsersRound,
} from "lucide-react";

export type TMenuItem = {
	title: string;
	role: number;
	items: TMenuChild[];
};

export type TMenuChild = {
	link?: string;
	icon: LucideIcon;
	text: string;
	children?: TMenuChild[];
};

export const menuItems: TMenuItem[] = [
	{
		title: "Статистика",
		role: 2,
		items: [
			{
				icon: HandCoins,
				text: ROUTES.FINANCE.name,
				children: [
					{
						link: ROUTES.PROFIT_STATS.route,
						icon: ChartNoAxesCombined,
						text: ROUTES.PROFIT_STATS.name,
					},
					{
						link: ROUTES.EXPENSE_STATS.route,
						icon: ChartColumnDecreasing,
						text: ROUTES.EXPENSE_STATS.name,
					},
					{
						link: ROUTES.SALARY_STATS.route,
						icon: Handshake,
						text: ROUTES.SALARY_STATS.name,
					},
				],
			},

			{
				link: ROUTES.WAREHOUSE_STATS.route,
				icon: Warehouse,
				text: ROUTES.WAREHOUSE_STATS.name,
			},

			{
				link: ROUTES.PRODUCT_LIST.route,
				icon: Package,
				text: ROUTES.PRODUCT_LIST.name,
			},
			{
				link: ROUTES.ORDER_STATS.route,
				icon: Logs,
				text: ROUTES.ORDER_STATS.name,
			},
		],
	},
	{
		title: "Касса",
		role: 4,
		items: [
			{
				link: ROUTES.PAYMENT.route,
				icon: ReceiptText,
				text: ROUTES.PAYMENT.name,
			},
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
		title: "Заказы",
		role: 3,
		items: [
			{
				link: ROUTES.PAYMENT.route,
				icon: ReceiptText,
				text: ROUTES.PAYMENT.name,
			},
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
		title: "Заказы",
		role: 5,
		items: [
			{
				link: ROUTES.PAYMENT.route,
				icon: ReceiptText,
				text: ROUTES.PAYMENT.name,
			},
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
		role: 1,
		items: [
			{
				icon: Archive,
				text: "Склад кафе",
				children: [
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
				],
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
			{
				link: ROUTES.USERS.route,
				icon: UsersRound,
				text: ROUTES.USERS.name,
			},
			{
				link: ROUTES.CAFE_TABLES.route,
				icon: Table,
				text: ROUTES.CAFE_TABLES.name,
			},
			{
				link: ROUTES.PAYMENT.route,
				icon: ReceiptText,
				text: ROUTES.PAYMENT.name,
			},
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
];
