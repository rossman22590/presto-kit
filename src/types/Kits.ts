export type Kit = {
	title: string;
	id: number;
	colors: {
		details: {
			id: number;
			name: string;
			hex: string;
		}[];
		// description: string;
	};
	typography: {
		typefaces: {
			display: {
				font: string;
				weight: string | null;
			};
			text: {
				font: string;
				weight: string | null;
			};
		};
		// description: string;
	};
};

export type StarterKits = Kit[];

export type KitSelectionTypes =
	| "color"
	| "displayFont"
	| "textFont"
	| "fullKit";

export type SelectedKitView = {
	colors: Kit["colors"];
	displayFont: Kit["typography"]["typefaces"]["display"];
	textFont: Kit["typography"]["typefaces"]["text"];
};
