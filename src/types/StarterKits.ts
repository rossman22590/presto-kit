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
				weight: string;
			};
		};
		// description: string;
	};
};

export type StarterKits = Kit[];
