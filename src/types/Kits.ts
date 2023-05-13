import type { ColorsResponse, Kits } from "./Data";
import type { Color } from "./Colors";

export type AiKit = {
	title: string;
	id: number;
	colors: Color[];
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
	id: Kits["id"] | null;
	projectId: Kits["project_id"];
	title: Kits["title"] | null;
	colors: ColorsResponse[] | null;
	displayFont: AiKit["displayFont"] | null;
	textFont: AiKit["textFont"] | null;
};
