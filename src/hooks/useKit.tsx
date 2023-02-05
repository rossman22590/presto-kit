type Kit = {
	title: string;
	id: number;
	colors: {
		details: { id: number; name: string; hex: string }[];
		description: string;
	};
	typography: {
		typefaces: {
			display: { font: string; weight: string };
			text: { font: string; weight: string };
		};
		description: string;
	};
};

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
