import type { ColorsResponse, Fonts, FontsResponse } from "../types/Data";
import { GoogleApiFont, LoadedFonts } from "../types/Fonts";

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

export const findClosestNumber = (
	availableNumbers: number[],
	targetNumber: number
) => {
	if (availableNumbers.length) {
		const closestNumber = availableNumbers.reduce((prev, curr) =>
			Math.abs(curr - targetNumber) < Math.abs(prev - targetNumber)
				? curr
				: prev
		);
		return closestNumber;
	} else {
		return 400;
	}
};

export const findAvailableWeights = (
	font: string,
	fontsList: GoogleApiFont[]
) => {
	const fontFamily = fontsList.find((f) => f.family === font);

	if (fontFamily) {
		const availableWeights = fontFamily.variants
			.filter((variant) => !variant.includes("italic"))
			.map((variant) => (variant === "regular" ? "400" : variant));

		return availableWeights;
	} else {
		return ["400"];
	}
};

export const findClosestWeight = (
	font: string,
	fontsList: GoogleApiFont[],
	targetWeight: string
): string => {
	const fontFamily = fontsList.find((f) => f.family === font);
	if (!fontFamily) return "regular";

	const availableWeightNumbers = findAvailableWeights(font, fontsList).map(
		(weight) => +weight
	);
	const closestWeight = findClosestNumber(
		availableWeightNumbers,
		+targetWeight
	).toString();

	return closestWeight;
};

export const loadFont = (
	font: string,
	weight: string | null,
	previewText?: string
) => {
	const link = document.createElement("link");
	const baseURL = "https://fonts.googleapis.com/css2?family=";

	let url = baseURL + encodeURIComponent(font);
	if (weight) url += `:wght@${encodeURIComponent(weight)}`;
	if (previewText) url += `&text=${encodeURIComponent(previewText)}`;
	url += "&display=swap";

	link.href = url;
	link.rel = "stylesheet";
	document.head.appendChild(link);
};

export const moveLoadedFontToTop = (
	font: string,
	fontsList: GoogleApiFont[]
) => {
	const selectedIndex = fontsList.findIndex((item) => item.family === font);
	return [
		fontsList[selectedIndex],
		...fontsList.slice(0, selectedIndex),
		...fontsList.slice(selectedIndex + 1),
	];
};

export const updateLoadedFonts = (
	font: string,
	selectedWeight: string,
	loadedFonts: LoadedFonts,
	isFontLoaded: boolean
) => {
	const newLoadedFonts = { ...loadedFonts };

	if (isFontLoaded) {
		newLoadedFonts[font].weights = [
			...newLoadedFonts[font].weights,
			selectedWeight,
		];
	} else {
		newLoadedFonts[font] = {
			loaded: true,
			weights: [selectedWeight],
		};
	}
	return newLoadedFonts;
};

export const convertHexToRGB = (hex: string) => {
	const red = parseInt(hex.slice(1, 3), 16);
	const green = parseInt(hex.slice(3, 5), 16);
	const blue = parseInt(hex.slice(5, 7), 16);
	return { red, green, blue };
};

export const isColorBright = (hex: string) => {
	const { red, green, blue } = convertHexToRGB(hex);
	const luminance = red * 0.299 + green * 0.587 + blue * 0.114;
	const brightPoint = 180;
	const isBright = luminance > brightPoint;
	return isBright;
};
