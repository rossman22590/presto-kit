import { useState } from "react";
import type {
	KitViewSelectionUtils,
	KitSelectionTypes,
	SelectedIndex,
	KitContent,
	AiKit,
} from "@types";

export const useKitViewSelection = (
	starterKits: AiKit[]
): KitViewSelectionUtils => {
	const [selectedIndex, setSelectedIndex] = useState<SelectedIndex>({
		fullKit: null,
		colors: null,
		displayFont: null,
		textFont: null,
	});
	const [selectedKitView, setSelectedKitView] = useState<KitContent>({
		colors: starterKits[0]?.colors,
		displayFont: starterKits[0]?.displayFont,
		textFont: starterKits[0]?.textFont,
	});
	const [isFullKitView, setIsFullKitView] = useState(true);

	const isSelected = (type: KitSelectionTypes, kitIndex: number) => {
		return selectedIndex[type] === kitIndex;
	};

	const isKitView = () => {
		return Object.values(selectedIndex).some((value) => value !== null);
	};

	const updateKitView = (type: KitSelectionTypes, kitIndex: number) => {
		if (type === "fullKit" && !isFullKitView) {
			setSelectedIndex({
				fullKit: null,
				colors: kitIndex,
				displayFont: kitIndex,
				textFont: kitIndex,
			});
		} else {
			setSelectedIndex({
				...selectedIndex,
				[type]: kitIndex,
			});
		}

		const kit = starterKits[kitIndex];
		let updatedKitView = { ...selectedKitView };

		if (type === "fullKit" || type === "colors") {
			updatedKitView.colors = kit.colors;
		}
		if (type === "fullKit" || type === "displayFont") {
			updatedKitView.displayFont = kit.displayFont;
		}
		if (type === "fullKit" || type === "textFont") {
			updatedKitView.textFont = kit.textFont;
		}
		setSelectedKitView(updatedKitView);
	};

	const toggleFullKitView = (kitIndex: number) => {
		if (!isFullKitView) {
			const kit = starterKits[kitIndex];
			const updatedKitView = { ...selectedKitView };
			updatedKitView.colors = kit.colors;
			updatedKitView.displayFont = kit.displayFont;
			updatedKitView.textFont = kit.textFont;
			setSelectedKitView(updatedKitView);
		}
		setSelectedIndex({
			fullKit: isFullKitView ? null : kitIndex,
			colors: isFullKitView ? kitIndex : null,
			displayFont: isFullKitView ? kitIndex : null,
			textFont: isFullKitView ? kitIndex : null,
		});

		setIsFullKitView(!isFullKitView);
	};

	const kitViewSelectionUtils = {
		toggleFullKitView,
		selectedKitView,
		isFullKitView,
		updateKitView,
		isSelected,
		isKitView,
	};

	return kitViewSelectionUtils;
};
