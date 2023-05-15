import type { ColorsResponse, PresetColor } from "@types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetColorName } from "hex-color-to-color-name";
import { useEffect, useRef, useState } from "react";
import { getColorsByKitsType } from "@utils";

export const useColorPicker = (
	customColors: ColorsResponse[],
	setCustomColors: React.Dispatch<
		React.SetStateAction<ColorsResponse[] | null>
	>,
	presetColors: PresetColor[] | undefined,
	setPresetColors: React.Dispatch<
		React.SetStateAction<PresetColor[] | undefined>
	>,
	i: number
) => {
	const supabase = useSupabaseClient();
	const colorCardRef = useRef<HTMLDivElement>(null);

	const [showPicker, setShowPicker] = useState(false);

	// Get colors from all starter kits to popular color picker presets
	useEffect(() => {
		(async () => {
			const data = await getColorsByKitsType("STARTER", supabase);

			const colors = data?.map((color) => ({
				color: color.hex,
				title: color.name,
			}));

			setPresetColors(colors);
		})();
	}, []);

	// Updates custom kit colors when color picker is used
	// Also generates a name for the color if it doesn't have one yet
	const handleColorChange = (color: any) => {
		setCustomColors((prevState) => {
			const newColors = [...(prevState as ColorsResponse[])];

			const colorHex = color.hex.toUpperCase();

			const isPresetColor = presetColors?.find((p) => p.color === colorHex);

			const colorName = isPresetColor?.title || GetColorName(color.hex);

			newColors[i] = {
				...newColors[i],
				hex: colorHex,
				name: colorName,
			};

			return newColors;
		});
	};

	// Closes color picker when user clicks outside of it (colorCardRef)
	// Also adds new color to preset colors if it's not already there
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				colorCardRef.current &&
				!colorCardRef.current.contains(event.target as Node)
			) {
				if (showPicker) {
					setPresetColors((prevState) => {
						const newColors = [...(prevState as PresetColor[])];

						const colorHex = customColors[i].hex;

						const isPresetColor = presetColors?.find(
							(p) => p.color === colorHex
						);

						if (!isPresetColor) {
							const currentColor = {
								color: customColors[i].hex,
								title: customColors[i].name,
							};
							newColors.push(currentColor);
						}

						return newColors;
					});
				}
				setShowPicker(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [colorCardRef, showPicker]);

	return {
		showPicker,
		setShowPicker,
		handleColorChange,
		colorCardRef,
		presetColors,
	};
};
