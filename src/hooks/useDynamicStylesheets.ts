import type { AiKit } from "@types";
import { KITS_COUNT } from "@constants";
import { useEffect } from "react";
import { loadFont } from "@utils";

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
