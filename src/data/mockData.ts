import type { CustomKit, AiKit } from "../types/Kits";

export const mockStarterKits: AiKit[] = [
	{
		title: "Organic Fields",
		id: 1,
		colors: [
			{
				type: "BASE",
				name: "Farmhouse White",
				hex: "#F7EAD9",
			},
			{
				type: "PRIMARY",
				name: "Harvest Green",
				hex: "#5F8A3F",
			},
			{
				type: "ACCENT",
				name: "Sun-Kissed Orange",
				hex: "#F2B33D",
			},
		],
		displayFont: {
			name: "Nunito Sans",
			weight: "900",
		},
		textFont: {
			name: "Open Sans",
			weight: "400",
		},
	},

	{
		title: "Harvest Hues",
		id: 2,
		colors: [
			{
				type: "BASE",
				name: "Farm Fresh",
				hex: "#F4F1E9",
			},
			{
				type: "PRIMARY",
				name: "Carrot Crunch",
				hex: "#FF8C42",
			},
			{
				type: "ACCENT",
				name: "Sunny Citrus",
				hex: "#FFD166",
			},
		],
		displayFont: {
			name: "Abril Fatface",
			weight: null,
		},
		textFont: {
			name: "Lato",
			weight: "300",
		},
	},

	{
		title: "Fresh Harvest",
		id: 3,
		colors: [
			{
				type: "BASE",
				name: "Yolkshell Cream",
				hex: "#FDFBF4",
			},
			{
				type: "PRIMARY",
				name: "Plum Harvest",
				hex: "#8E5572",
			},
			{
				type: "ACCENT",
				name: "Carrot Burst",
				hex: "#FFC857",
			},
		],

		displayFont: {
			name: "Arvo",
			weight: "700",
		},
		textFont: {
			name: "Roboto",
			weight: "400",
		},
	},
];

// Mock data
// const brandName = "Farm Shop";
// const brandDescription = "Organic Farm Store";
// const starterKits = mockStarterKits;
// const isLoading = false;
// const error = null;

export const mockCustomKit: CustomKit = {
	id: 1,
	projectId: 1,
	title: "Farm Shop",
	colors: [
		{
			type: "BASE",
			name: "Farmhouse White",
			hex: "#F7EAD9",
		},
		{
			type: "PRIMARY",
			name: "Harvest Green",
			hex: "#5F8A3F",
		},
		{
			type: "ACCENT",
			name: "Sun-Kissed Orange",
			hex: "#F2B33D",
		},
	],
	displayFont: { name: "Nunito Sans", weight: "900" },
	textFont: { name: "Open Sans", weight: "400" },
};
