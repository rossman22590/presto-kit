import { Kit } from "../types/StarterKits";

export const useKit = (kit: Kit) => {
	const { hex: baseColor } = kit.colors.details[0];
	const { hex: primaryColor } = kit.colors.details[1];
	const { hex: accentColor } = kit.colors.details[2];
	const { font: displayFont } = kit.typography.typefaces.display;
	const { weight: displayWeight } = kit.typography.typefaces.display;
	const { font: textFont } = kit.typography.typefaces.text;
	const { weight: textWeight } = kit.typography.typefaces.text;

	return {
		baseColor,
		primaryColor,
		accentColor,
		displayFont,
		displayWeight,
		textFont,
		textWeight,
	};
};
