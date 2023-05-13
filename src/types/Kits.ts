import type { ColorsResponse, Kits, Projects } from "./Data";

export type AiKit = {
	title: string;
	id: number;
	colors: {
		type: "BASE" | "PRIMARY" | "ACCENT";
		name: string;
		hex: string;
	}[];
	displayFont: {
		name: string;
		weight: string | null;
	};
	textFont: {
		name: string;
		weight: string | null;
	};
};

export type KitSelectionTypes =
	| "colors"
	| "displayFont"
	| "textFont"
	| "fullKit";

export type KitContent = {
	colors: AiKit["colors"];
	displayFont: AiKit["displayFont"];
	textFont: AiKit["textFont"];
};

export type SelectedIndex = {
	fullKit: number | null;
	colors: number | null;
	displayFont: number | null;
	textFont: number | null;
};

export type KitViewSelectionUtils = {
	toggleFullKitView: (kitIndex: number) => void;
	selectedKitView: KitContent;
	isFullKitView: boolean;
	updateKitView: (type: KitSelectionTypes, kitIndex: number) => void;
	isSelected: (type: KitSelectionTypes, kitIndex: number) => boolean;
	isKitView: () => boolean;
};

export type CustomKit = {
	id: Kits["id"];
	projectId: Kits["project_id"];
	projectName: Projects["name"];
	projectDescription: Projects["description"];
	title: Kits["title"];
	colors: ColorsResponse[];
	displayFont: AiKit["displayFont"];
	textFont: AiKit["textFont"];
};
