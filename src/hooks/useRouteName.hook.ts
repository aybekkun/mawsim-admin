import { ROUTES } from "@/constants/routes";
import { useLocation } from "react-router-dom";

// Хук useRouteName
export const useRouteName = () => {
	const location = useLocation();
	const currentPath = location.pathname;
	const route = Object.values(ROUTES).find((route) => route.route === currentPath);
	return route ? route.name : "";
};
