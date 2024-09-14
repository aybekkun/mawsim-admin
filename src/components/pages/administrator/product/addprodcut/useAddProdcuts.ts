
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useProducts = () => {
	const queryData = useQuery({
		queryKey: ["products"],
		queryFn: () => ProdcutListService.getAll(),
	});

	return useMemo(
		() => ({
			queryData,
		}),
		[queryData]
	);
};
