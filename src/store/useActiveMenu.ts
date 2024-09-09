import { create } from "zustand";
interface MenuState {
	active: boolean;
	setActiveMenu: (bool: boolean) => void;
}
export const useActiveMenu = create<MenuState>((set) => ({
	active: false,
	setActiveMenu: (bool) => set(() => ({ active: bool })),
}));
