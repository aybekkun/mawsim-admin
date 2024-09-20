import { useQuery } from "@tanstack/react-query";
import { AuthService } from "./auth.service";

export const useGetAllUsersQuery = () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: () => AuthService.getAll(),
	});
};
