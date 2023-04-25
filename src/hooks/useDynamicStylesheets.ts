import { StarterKits } from "../types/Kits";
import { KITS_COUNT } from "../constants/global";
import { useEffect } from "react";

const addFontLink = (font: string, weight: string) => {
	const link = document.createElement("link");
	link.href = `https://fonts.googleapis.com/css2?family=${font}${
		weight ? `:wght@${weight}` : ""
	}&display=swap`;
	link.rel = "stylesheet";
	document.head.appendChild(link);
};

export const useDynamicStylesheets = (starterKits: StarterKits) => {
	useEffect(() => {
		if (starterKits.length === KITS_COUNT) {
			starterKits.forEach(({ typography: { typefaces } }) => {
				addFontLink(typefaces.display.font, typefaces.display.weight || "");
				addFontLink(typefaces.text.font, typefaces.text.weight || "");
			});
		}
	}, [starterKits]);
};
