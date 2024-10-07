import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
export interface TColumns<T> {
	title: string | React.ReactNode;
	dataIndex?: keyof T;
	render?: (value: T[keyof T], record: T) => React.ReactNode;
}

interface MyTableProps<T> {
	columns: TColumns<T>[];
	source: T[];
	currentPage?: number;
	loading?: boolean;
	className?: string;
}

const MyTable = <T extends object>({ source, columns, currentPage = 1, loading = false }: MyTableProps<T>) => {
	const getCellValue = (value: unknown): React.ReactNode => {
		if (React.isValidElement(value)) {
			return value;
		}
		return String(value); // Convert value to string if it's not a ReactNode
	};

	if (loading) {
		return <Skeleton className="w-full h-40" />;
	}

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="p-3 text-left">№</TableHead>
						{columns.map((column, i: number) => (
							<TableHead className="p-3 text-left" key={i}>
								{column.title}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{source.map((row: T, i: number) => (
						<TableRow key={i}>
							<TableCell className="p-2 w-[70px]">{(currentPage - 1) * 10 + i + 1}</TableCell>
							{columns.map((column, j) => (
								<TableCell key={j}>
									{column.render
										? column.render(row[column.dataIndex as keyof T], row)
										: getCellValue(row[column.dataIndex as keyof T])}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default MyTable;
