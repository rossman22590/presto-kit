import type { Navigation } from "./Navigation";
import type {
	KitViewSelection,
	SelectedKitView,
	StarterKits,
	Kit,
} from "./Kits";
import { ColorsResponse } from "./Data";
import { PresetColor } from "./Colors";
import { Font } from "./Fonts";

export type ColorCardProps = {
	customColors: ColorsResponse[];
	setCustomColors: React.Dispatch<
		React.SetStateAction<ColorsResponse[] | null>
	>;
	presetColors: PresetColor[] | undefined;
	setPresetColors: React.Dispatch<
		React.SetStateAction<PresetColor[] | undefined>
	>;
	i: number;
};

export type ColorSectionProps = {
	kit: Kit;
};

export type DisplayTextProps = {
	heading: string;
	text: string;
	type: "MAIN" | "DASHBOARD";
	buttonText?: string;
	handleClick?: () => void;
	route?: string;
};

export type FormProps = {
	type: "SIMPLE" | "ONBOARDING";
	placeholder: string;
	buttonText: string;
	formId: string;
	route: "onboarding" | "starter-kits";
	heading?: string;
	text?: string;
	handleAuth?: () => void;
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

export type KitViewSelectionProps = {
	selectedKitView: SelectedKitView;
	brandName: string;
	brandDescription: string;
	handleContinue: () => void;
};

export type ModalContainerProps = React.PropsWithChildren<{
	open: boolean;
	setOpen: (open: boolean) => void;
	title: string;
	text: string;
}>;

export type WeightSelectProps = {
	fonts: Font[];
	selectedFont: string;
	selectedWeight: string;
	setSelectedWeight: (weight: string) => void;
};
