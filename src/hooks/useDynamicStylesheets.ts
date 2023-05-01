import { AiKit } from "../types/Kits";
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

export const useDynamicStylesheets = (starterKits: AiKit[]) => {
	useEffect(() => {
		if (starterKits.length === KITS_COUNT) {
			starterKits.forEach(({ displayFont, textFont }) => {
				addFontLink(displayFont.name, displayFont.weight || "");
				addFontLink(textFont.name, textFont.weight || "");
			});
		}
	}, [starterKits]);
};
