import type { KitViewSelectionUtils, AiKit, KitContent } from "./Kits";
import type { GoogleApiFont, LoadedFonts } from "./Fonts";
import type { Navigation } from "./Navigation";
import type { ColorsResponse } from "./Data";
import type { PresetColor } from "./Colors";

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
	kit: AiKit;
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
	kit: KitContent;
	brandName: string | undefined;
};

export type DynamicStylesheetsProps = {
	starterKits: AiKit[];
};

export type TypographySectionProps = {
	kit: AiKit;
	brandName: string | undefined;
};

export type KitProgressCardProps = {
	starterKits: AiKit[];
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
	kitViewSelectionUtils: KitViewSelectionUtils;
	kit: AiKit;
	i: number;
};

export type KitViewSectionProps = {
	kit: KitContent;
	projectName: string;
	projectDescription: string;
	handleContinue: () => void;
};

export type ModalContainerProps = React.PropsWithChildren<{
	open: boolean;
	setOpen: (open: boolean) => void;
	title: string;
	text: string;
}>;

export type WeightSelectProps = {
	fonts: GoogleApiFont[];
	selectedFont: string;
	setSelectedFont: (font: string) => void;
	selectedWeight: string;
	setSelectedWeight: (weight: string) => void;
	initialFont: string;
};

export type FontSelectProps = {
	fonts: GoogleApiFont[];
	setFonts: (fonts: GoogleApiFont[]) => void;
	loadedFonts: LoadedFonts;
	setLoadedFonts: (loadedFonts: LoadedFonts) => void;
	selectedFont: string;
	setSelectedFont: (font: string) => void;
	selectedWeight: string;
	setSelectedWeight: (weight: string) => void;
};
