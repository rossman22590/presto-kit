import { useColorPicker } from "../../hooks/useColorPicker";
import type { ColorCardProps } from "../../types/Props";
import { SketchPicker } from "react-color";

export const ColorCard = ({
	customColors,
	setCustomColors,
	presetColors,
	setPresetColors,
	i,
}: ColorCardProps) => {
	const { showPicker, setShowPicker, handleColorChange, colorCardRef } =
		useColorPicker(
			customColors,
			setCustomColors,
			presetColors,
			setPresetColors,
			i
		);

	return (
		<div className="relative" ref={colorCardRef}>
			<div
				id="color-card"
				className="group relative w-[300px] cursor-pointer rounded-xl bg-white "
				onClick={() => setShowPicker(!showPicker)}
			>
				<div
					id="color-display"
					className="color h-44 w-full rounded-t-lg"
					style={{
						backgroundColor: customColors[i].hex,
					}}
				></div>
				<div id="text-container" className="flex flex-col gap-1 px-7 py-4">
					<h4 id="color-name" className="text-lg font-medium">
						{customColors[i].name}
					</h4>
					<button
						id="color-hex"
						className="w-fit translate-x-[-4px] rounded-lg px-2 py-[2px] text-lg text-[#95A1B9] group-hover:bg-[#F5F7FB]"
					>
						{customColors[i].hex}
					</button>
				</div>
			</div>
			{showPicker && (
				<SketchPicker
					className="absolute"
					color={customColors[i].hex}
					onChange={handleColorChange}
					presetColors={presetColors}
					disableAlpha
				/>
			)}
		</div>
	);
};
