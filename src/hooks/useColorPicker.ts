import { useEffect, useRef, useState } from "react";
import { ColorsResponse } from "../types/Data";
import { PresetColor } from "react-color/lib/components/sketch/Sketch";
import { getColorsByKitsCategory } from "../utils/queries";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetColorName } from "hex-color-to-color-name";

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
			newColors[i].hex = color.hex.toUpperCase();
			newColors[i].name = GetColorName(color.hex);
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
