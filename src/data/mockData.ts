import type { CustomKit, StarterKits } from "../types/Kits";

export const mockStarterKits: StarterKits | [] = [
	{
		title: "Organic Fields",
		id: 1,
		colors: {
			details: [
				{
					id: 1,
					name: "Farmhouse White",
					hex: "#F7EAD9",
				},
				{
					id: 2,
					name: "Harvest Green",
					hex: "#5F8A3F",
				},
				{
					id: 3,
					name: "Sun-Kissed Orange",
					hex: "#F2B33D",
				},
			],
		},
		typography: {
			typefaces: {
				display: {
					font: "Nunito Sans",
					weight: "900",
				},
				text: {
					font: "Open Sans",
					weight: "400",
				},
			},
		},
	},
	{
		title: "Harvest Hues",
		id: 2,
		colors: {
			details: [
				{
					id: 1,
					name: "Farm Fresh",
					hex: "#F4F1E9",
				},
				{
					id: 2,
					name: "Carrot Crunch",
					hex: "#FF8C42",
				},
				{
					id: 3,
					name: "Sunny Citrus",
					hex: "#FFD166",
				},
			],
		},
		typography: {
			typefaces: {
				display: {
					font: "Abril Fatface",
					weight: null,
				},
				text: {
					font: "Lato",
					weight: "300",
				},
			},
		},
	},
	{
		title: "Fresh Harvest",
		id: 3,
		colors: {
			details: [
				{
					id: 1,
					name: "Yolkshell Cream",
					hex: "#FDFBF4",
				},
				{
					id: 2,
					name: "Plum Harvest",
					hex: "#8E5572",
				},
				{
					id: 3,
					name: "Carrot Burst",
					hex: "#FFC857",
				},
			],
		},
		typography: {
			typefaces: {
				display: {
					font: "Arvo",
					weight: "700",
				},
				text: {
					font: "Roboto",
					weight: "400",
				},
			},
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
			category: "BASE",
			name: "Farmhouse White",
			hex: "#F7EAD9",
		},
		{
			category: "PRIMARY",
			name: "Harvest Green",
			hex: "#5F8A3F",
		},
		{
			category: "ACCENT",
			name: "Sun-Kissed Orange",
			hex: "#F2B33D",
		},
	],
	display: { font: "Nunito Sans", weight: "900" },
	text: { font: "Open Sans", weight: "400" },
};
