import { useEffect, useRef, useState } from "react";
import { ColorsResponse } from "../types/Data";

export const useColorPicker = (
	setCustomColors: React.Dispatch<
		React.SetStateAction<ColorsResponse[] | null>
	>,
	i: number
) => {
	const [showPicker, setShowPicker] = useState(false);

	const handleColorChange = (color: any) => {
		setCustomColors((prevState) => {
			const newColors = [...(prevState as ColorsResponse[])];
			newColors[i].hex = color.hex;
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

	return { showPicker, setShowPicker, handleColorChange, colorCardRef };
};
