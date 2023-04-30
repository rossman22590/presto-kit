export type OptionType = { value: string; label: string };
export type ValueType = OptionType | null;
export type Font = {
	family: string;
	variants: string[];
	subsets: string[];
	version: string;
	lastModified: string;
	files: {
		[variant: string]: string;
	};
};
