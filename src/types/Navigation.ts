export type PageName =
	| "Starter Kits"
	| "Custom Kits"
	| "Kit Editor"
	| "Export Kit"
	| "Settings"
	| "Logout";

export type Navigation = {
	name: PageName;
	href: string;
	icon: React.ForwardRefExoticComponent<
		React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
			title?: string;
			titleId?: string;
		} & React.RefAttributes<SVGSVGElement>
	>;
	current: boolean;
};
