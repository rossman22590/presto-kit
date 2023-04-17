import type { Navigation, PageName } from "../types/Navigation";
import type { NextRouter } from "next/router";
import {
	Cog6ToothIcon,
	ArrowRightOnRectangleIcon,
	SparklesIcon,
	AdjustmentsHorizontalIcon,
	PencilSquareIcon,
	ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

export const primaryNavigation: Navigation[] = [
	{
		name: "Starter Kits",
		href: "#",
		icon: SparklesIcon,
		current: false,
	},
	{
		name: "Custom Kits",
		href: "#",
		icon: AdjustmentsHorizontalIcon,
		current: false,
	},
	{
		name: "Kit Editor",
		href: "#",
		icon: PencilSquareIcon,
		current: false,
	},
	{
		name: "Export Kit",
		href: "#",
		icon: ArrowUpTrayIcon,
		current: false,
	},
];

export const secondaryNavigation: Navigation[] = [
	{ name: "Settings", href: "#", icon: Cog6ToothIcon, current: false },
	{
		name: "Logout",
		href: "#",
		icon: ArrowRightOnRectangleIcon,
		current: false,
	},
];
export const handleNavClick = (pageName: PageName, router: NextRouter) => {
	switch (pageName) {
		case "Starter Kits":
			router.push("#");
			break;
		case "Custom Kits":
			router.push("#");
			break;
		case "Kit Editor":
			router.push("#");
			break;
		case "Export Kit":
			router.push("#");
			break;
		case "Settings":
			router.push("#");
			break;
		case "Logout":
			router.push("#");
		default:
			router.push("#");
	}
};

export const setCurrentPage = (
	navigation: Navigation[],
	pageName: PageName
) => {
	navigation.forEach((page) => {
		if (page.name === pageName) {
			page.current = true;
		} else {
			page.current = false;
		}
	});
};
