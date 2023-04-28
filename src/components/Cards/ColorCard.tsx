import { useState, useRef, useEffect } from "react";
import type { ColorCardProps } from "../../types/Props";
import { ChromePicker } from "react-color";
import { ColorsResponse } from "../../types/Data";

export const ColorCard = ({
	customColor,
	setCustomColors,
	i,
}: ColorCardProps) => {
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

	return (
		<div className="relative" ref={colorCardRef}>
			<div
				id="color-card"
				className="group w-[300px] cursor-pointer rounded-xl bg-white"
				onClick={() => setShowPicker(!showPicker)}
			>
				<div
					id="color-display"
					className="color h-44 w-full rounded-t-lg"
					style={{
						backgroundColor: customColor.hex,
					}}
				></div>
				<div id="text-container" className="flex flex-col gap-1 px-7 py-4">
					<h4 id="color-name" className="text-lg font-medium">
						{customColor?.name}
					</h4>
					<button
						id="color-hex"
						className="w-fit translate-x-[-4px] rounded-lg px-2 py-[2px] text-lg text-[#95A1B9] group-hover:bg-[#F5F7FB]"
					>
						{customColor.hex}
					</button>
				</div>
			</div>
			{showPicker && (
				<ChromePicker
					color={customColor.hex}
					onChange={handleColorChange}
					disableAlpha
				/>
			)}
		</div>
	);
};
