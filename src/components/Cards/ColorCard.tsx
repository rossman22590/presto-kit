import type { ColorCardProps } from "../../types/Props";

export const ColorCard = ({ color }: ColorCardProps) => {
	return (
		<div id="color-card" className="w-[31%] rounded-lg shadow">
			<div
				id="color-display"
				className="color h-36 w-full rounded-t-lg"
				style={{
					backgroundColor: color.hex,
				}}
			></div>
			<div id="text-container" className="flex flex-col gap-1 p-4">
				<h4 id="color-name" className="font-Inter text-lg font-medium">
					{color.name}
				</h4>
				<p
					id="color-hex"
					className="font-Inter text-sm font-light text-[#95A1B9]"
				>
					{color.hex}
				</p>
			</div>
		</div>
	);
};
