import type { Navigation } from "./Navigation";
import type {
	KitViewSelection,
	SelectedKitView,
	StarterKits,
	Kit,
} from "./Kits";

export type ColorCardProps = {
	color: { id: number; name: string; hex: string };
};

export type ColorSectionProps = {
	kit: Kit;
};

export type DisplayTextProps = {
	heading: string;
	text: string;
	type: "MAIN" | "DASHBOARD";
};

export type FormProps = {
	type: "SIMPLE" | "ONBOARDING";
	placeholder: string;
	buttonText: string;
	formId: string;
	submitRoute: "onboarding" | "starter-kits";
	heading?: string;
	text?: string;
};

export type KitHeadingProps = {
	id: number;
	title: string;
};

export type NavbarProps = {
	prevProgress?: number;
	progress?: number;
};

export type LayoutProps = React.PropsWithChildren<{
	title?: string;
	description?: string;
	prevProgress?: number;
	progress?: number;
}>;

export type SectionDescriptionProps = {
	text: string;
};

export type SectionHeadingProps = {
	text: string;
};

export type TypographyCardProps = {
	kit: SelectedKitView;
	brandName: string | undefined;
};

export type DynamicStylesheetsProps = {
	starterKits: StarterKits;
};

export type TypographySectionProps = {
	kit: Kit;
	brandName: string | undefined;
};

export type KitProgressCardProps = {
	starterKits: StarterKits;
	kitNumber: number;
	isGenerating: boolean;
	isComplete: boolean;
};

export type DesktopSidebarProps = {
	primaryNavigation: Navigation[];
	secondaryNavigation: Navigation[];
};

export type MobileNavbarProps = {
	setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type MobileSidebarProps = {
	sidebarOpen: boolean;
	setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
	primaryNavigation: Navigation[];
	secondaryNavigation: Navigation[];
};

export type KitPreviewCardProps = {
	kitViewSelection: KitViewSelection;
	starterKit: Kit;
	i: number;
};
