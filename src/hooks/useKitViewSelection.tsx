import { useState } from "react";
import type {
	KitSelectionTypes,
	SelectedKitView,
	SelectedIndex,
	Kit,
} from "../types/Kits";

export const useKitViewSelection = (starterKits: Kit[]) => {
	const [selectedIndex, setSelectedIndex] = useState<SelectedIndex>({
		fullKit: null,
		color: null,
		displayFont: null,
		textFont: null,
	});
	const [selectedKitView, setSelectedKitView] = useState<SelectedKitView>({
		colors: starterKits[0]?.colors,
		displayFont: starterKits[0]?.typography.typefaces.display,
		textFont: starterKits[0]?.typography.typefaces.text,
	});
	const [isFullKitView, setIsFullKitView] = useState(true);

	const isSelected = (type: KitSelectionTypes, kitIndex: number) => {
		return selectedIndex[type] === kitIndex;
	};

	const isKitView = () => {
		return Object.values(selectedIndex).some((value) => value !== null);
	};

	const updateKitView = (type: KitSelectionTypes, kitIndex: number) => {
		setSelectedIndex({
			...selectedIndex,
			[type]: kitIndex,
		});
		const kit = starterKits[kitIndex];
		let updatedKitView = { ...selectedKitView };

		if (type === "fullKit" || type === "color") {
			updatedKitView.colors = kit.colors;
		}
		if (type === "fullKit" || type === "displayFont") {
			updatedKitView.displayFont = kit.typography.typefaces.display;
		}
		if (type === "fullKit" || type === "textFont") {
			updatedKitView.textFont = kit.typography.typefaces.text;
		}
		setSelectedKitView(updatedKitView);
	};

	const toggleFullKitView = (kitIndex: number, isFullKitView: boolean) => {
		setSelectedIndex({
			fullKit: isFullKitView ? null : kitIndex,
			color: isFullKitView ? kitIndex : null,
			displayFont: isFullKitView ? kitIndex : null,
			textFont: isFullKitView ? kitIndex : null,
		});
		setIsFullKitView(!isFullKitView);
	};

	return {
		isFullKitView,
		isKitView,
		isSelected,
		selectedKitView,
		toggleFullKitView,
		updateKitView,
	};
};
