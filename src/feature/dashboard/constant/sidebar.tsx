import { Boxes, ChartPie, Home, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MenuItem = {
	id: string;
	title: string;
	url: string;
	icon: LucideIcon;
};

// all available menu items
export const MENU_ITEMS: MenuItem[] = [
	{
		id: "home",
		title: "Home",
		url: "/dashboard",
		icon: Home,
	},
	{
		id: "collection",
		title: "Collection",
		url: "/dashboard/collection",
		icon: Boxes,
	},
	{
		id: "process",
		title: "Process",
		url: "/dashboard/process",
		icon: ChartPie,
	},
	{
		id: "settings",
		title: "Settings",
		url: "/dashboard/settings",
		icon: Settings,
	},
];

// which menu items are available per role
export const ROLE_PERMISSIONS: Record<string, string[]> = {
	admin: ["home", "settings"],
	community: ["home", "settings"],
	franchise: ["home", "settings"],
	manager: ["home", "settings"],
	worker: ["home", "collection", "process", "settings"],
};
