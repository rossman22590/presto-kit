import type {
	ColorsResponse,
	Typefaces,
	TypographyResponse,
} from "../types/Data";

export const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(" ");
};

export const getColorCategory = (index: number) => {
	switch (index) {
		case 0:
			return "BASE";
		case 1:
			return "PRIMARY";
		case 2:
			return "ACCENT";
		default:
			throw new Error("Invalid index for color category");
	}
};

export const sortColors = (
	colors: ColorsResponse[] | null
): ColorsResponse[] | null => {
	const order = {
		BASE: 0,
		PRIMARY: 1,
		ACCENT: 2,
	};
	if (!colors) return null;

	return colors.sort((a, b) => order[a.category] - order[b.category]);
};

export const getFontByCategory = (
	category: Typefaces["category"],
	typography: TypographyResponse[] | null
) => {
	if (!typography) return null;

	const font = typography.find((item) => item.category === category);
	if (!font) return null;

	return {
		font: font.font,
		weight: font.weight,
	};
};
