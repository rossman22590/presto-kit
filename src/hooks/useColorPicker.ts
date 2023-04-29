import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getColorsByKitsCategory } from "../utils/queries";
import { GetColorName } from "hex-color-to-color-name";
import { useEffect, useRef, useState } from "react";
import type { ColorsResponse } from "../types/Data";
import type { PresetColor } from "../types/Colors";

export const useColorPicker = (
	setCustomColors: React.Dispatch<
		React.SetStateAction<ColorsResponse[] | null>
	>,
	i: number
) => {
	const supabase = useSupabaseClient();

	const [showPicker, setShowPicker] = useState(false);

	const [presetColors, setPresetColors] = useState<PresetColor[] | undefined>();

	useEffect(() => {
		(async () => {
			const data = await getColorsByKitsCategory("STARTER", supabase);

			const colors = data?.map((color) => ({
				color: color.hex,
				title: color.name,
			}));

			setPresetColors(colors);
		})();
	}, []);

	const handleColorChange = (color: any) => {
		setCustomColors((prevState) => {
			const newColors = [...(prevState as ColorsResponse[])];

			const colorHex = color.hex.toUpperCase();

			const isPresetColor = presetColors?.find((p) => p.color === colorHex);

			const colorName = isPresetColor?.title || GetColorName(color.hex);

			newColors[i].hex = colorHex;
			newColors[i].name = colorName;

			return newColors;
		});
	};

	const colorCardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				colorCardRef.current &&
				!colorCardRef.current.contains(event.target as Node)
			) {
				setShowPicker(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [colorCardRef]);

	return {
		showPicker,
		setShowPicker,
		handleColorChange,
		colorCardRef,
		presetColors,
	};
};
