import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface SearchProps {
	className?: string;
	delay?: number;
	setCurrentPage?: (page: number) => void;
	setDebouncedValue?: (value: string) => void;
}

const SearchInput: FC<SearchProps> = ({
	className = ``,
	delay = 500,
	setCurrentPage = () => undefined,
	setDebouncedValue = () => undefined,
}) => {
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => {
			setCurrentPage(1);
			setDebouncedValue(searchTerm);
		}, delay || 500);

		return () => {
			clearTimeout(timer);
		};
	}, [searchTerm, delay]);
	const onSearch = (value: string) => {
		setSearchTerm(value);
	};
	const clearSearch = () => {
		setDebouncedValue("");
		setSearchTerm("");
		setCurrentPage(1);
	};
	return (
		<div className={className}>
			<div className="relative w-[240px]">
				<Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
				<Input
					type="text"
					className="pl-8 pr-10"
					value={searchTerm}
					onChange={(e) => onSearch(e.target.value)}
					placeholder="Поиск"
				/>
				{searchTerm.length > 0 && (
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
						onClick={clearSearch}
					>
						<X className="h-4 w-4" />
					</Button>
				)}
			</div>
		</div>
	);
};

export default SearchInput;
