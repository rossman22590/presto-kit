import type { StarterKits } from "./StarterKits";
import type { NumberRange } from "./NumberRange";

export type ColorCardProps = {
	color: { id: number; name: string; hex: string };
};

export type ColorSectionProps = {
	kit: {
		title: string;
		id: number;
		colors: {
			details: { id: number; name: string; hex: string }[];
			description: string;
		};
	};
};

export type DisplayTextProps = {
	heading: string;
	text: string;
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
	progressStart?: NumberRange<0, 100>;
	progressEnd?: NumberRange<0, 100>;
};

export type LayoutProps = React.PropsWithChildren<{
	title?: string;
	description?: string;
	progressStart?: NumberRange<0, 100>;
	progressEnd?: NumberRange<0, 100>;
}>;

export type SectionDescriptionProps = {
	text: string;
};

export type SectionHeadingProps = {
	text: string;
};

export type TypographyCardProps = {
	kit: {
		title: string;
		id: number;
		colors: {
			details: { id: number; name: string; hex: string }[];
			description: string;
		};
		typography: {
			typefaces: {
				display: { font: string; weight: string };
				text: { font: string; weight: string };
			};
			description: string;
		};
	};
	brandName: string | undefined;
};

export type DynamicStylesheetsProps = {
	starterKits: StarterKits;
};

export type TypographySectionProps = {
	kit: {
		title: string;
		id: number;
		colors: {
			details: { id: number; name: string; hex: string }[];
			description: string;
		};
		typography: {
			typefaces: {
				display: { font: string; weight: string };
				text: { font: string; weight: string };
			};
			description: string;
		};
	};
	brandName: string | undefined;
};

export type KitProgressCardProps = {
	starterKits: StarterKits;
	kitNumber: number;
	isGenerating: boolean;
	isComplete: boolean;
};
