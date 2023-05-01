import type { ColorsResponse, Fonts, FontsResponse } from "../types/Data";
import { GoogleApiFont } from "../types/Fonts";

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
	category: Fonts["category"],
	typography: FontsResponse[] | null
) => {
	if (!typography) return null;

	const font = typography.find((item) => item.category === category);
	if (!font) return null;

	return {
		name: font.name,
		weight: font.weight,
	};
};

export const findClosestWeight = (
	availableWeights: number[],
	targetWeight: number
) => {
	return availableWeights.reduce((prev, curr) =>
		Math.abs(curr - targetWeight) < Math.abs(prev - targetWeight) ? curr : prev
	);
};

export const findClosestAvailableWeight = (
	font: GoogleApiFont,
	targetWeight: number
): string => {
	const availableWeights = font.variants
		.filter((variant) => !variant.includes("italic"))
		.map((variant) => (variant === "regular" ? "400" : variant));

	return findClosestWeight(
		availableWeights.map((weight) => parseInt(weight, 10)),
		targetWeight
	).toString();
};
