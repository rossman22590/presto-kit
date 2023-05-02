import type { ColorsResponse, Fonts, FontsResponse } from "../types/Data";
import { GoogleApiFont } from "../types/Fonts";

export const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(" ");
};

export const getColorType = (index: number) => {
	switch (index) {
		case 0:
			return "BASE";
		case 1:
			return "PRIMARY";
		case 2:
			return "ACCENT";
		default:
			throw new Error("Invalid index for color type");
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

	return colors.sort((a, b) => order[a.type] - order[b.type]);
};

export const getFontByType = (
	type: Fonts["type"],
	typography: FontsResponse[] | null
) => {
	if (!typography) return null;

	const font = typography.find((item) => item.type === type);
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

export const updateWeights = (
	fontFamily: string,
	fonts: GoogleApiFont[],
	setWeights: React.Dispatch<React.SetStateAction<string[]>>
) => {
	const fontItem = fonts.find((f) => f.family === fontFamily);

	if (fontItem) {
		const filteredVariants = fontItem.variants.filter(
			(variant) => !variant.includes("italic")
		);

		const weightOptions = filteredVariants.map((variant) =>
			variant === "regular" ? "400" : variant.replace(/\D/g, "")
		);

		setWeights(weightOptions);
	}
};
