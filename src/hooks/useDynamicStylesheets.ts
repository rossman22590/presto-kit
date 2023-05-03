import type { AiKit } from "../types/Kits";
import { KITS_COUNT } from "../constants/global";
import { loadFont } from "../utils/helpers";
import { useEffect } from "react";

export const useDynamicStylesheets = (starterKits: AiKit[]) => {
	useEffect(() => {
		if (starterKits.length === KITS_COUNT) {
			starterKits.forEach(({ displayFont, textFont }) => {
				loadFont(displayFont.name, displayFont.weight || "");
				loadFont(textFont.name, textFont.weight || "");
			});
		}
	}, [starterKits]);
};
