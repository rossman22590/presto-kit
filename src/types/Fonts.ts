export type OptionType = { value: string; label: string };
export type ValueType = OptionType | null;
export type GoogleApiFont = {
	family: string;
	variants: string[];
	subsets: string[];
	version: string;
	lastModified: string;
	files: {
		[variant: string]: string;
	};
};
export type LoadedFonts = {
	[key: string]: {
		loaded: boolean;
		weights: string[];
	};
};

export type Font = {
	name: string;
	weight: string | null;
};
