import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FC } from "react";

interface SearchInputProps {
	className?: string;
    placeholder?: string
}

const SearchInput: FC<SearchInputProps> = ({ className = ``,placeholder = `Поиск...` }) => {
	return (
		<div className={"relative " + className}>
			<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				type="search"
				placeholder={placeholder}
				className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
			/>
		</div>
	);
};

export default SearchInput;
