import type { ColorCardProps } from "../../types/Props";

export const ColorCard = ({ color }: ColorCardProps) => {
	return (
		<div
			id="color-card"
			className="group w-[300px] cursor-pointer rounded-xl bg-white"
		>
			<div
				id="color-display"
				className="color h-48 w-full rounded-t-lg"
				style={{
					backgroundColor: color.hex,
				}}
			></div>
			<div id="text-container" className="flex flex-col gap-1 px-7 py-5">
				<h4 id="color-name" className="text-lg font-medium">
					{color.name}
				</h4>
				<button
					id="color-hex"
					className="w-fit translate-x-[-4px] rounded-lg px-2 py-[2px] text-lg text-[#95A1B9] group-hover:bg-[#F5F7FB]"
				>
					{color.hex}
				</button>
			</div>
		</div>
	);
};
