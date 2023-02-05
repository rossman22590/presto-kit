export type StarterKits = {
	title: string;
	id: number;
	colors: {
		details: {
			id: number;
			name: string;
			hex: string;
		}[];
		description: string;
	};
	typography: {
		typefaces: {
			display: {
				font: string;
				weight: string;
			};
			text: {
				font: string;
				weight: string;
			};
		};
		description: string;
	};
}[];
