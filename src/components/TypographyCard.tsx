import type { TypographyCardProps } from "../types/Props";
import { useColorBrightness } from "../hooks/useColorBrightness";
import { useKit } from "../hooks/useKit";

export const TypographyCard = ({ kit, brandName }: TypographyCardProps) => {
	const {
		baseColor,
		primaryColor,
		accentColor,
		displayFont,
		displayWeight,
		textFont,
		textWeight,
	} = useKit(kit);

	const { isColorBright, accentColorRGB } = useColorBrightness(accentColor);

	return (
		// Background container
		<div
			className="flex flex-col gap-8 rounded-lg border-r-[64px] pl-16 pt-12 pr-16 pb-12 shadow"
			style={{
				backgroundColor: baseColor,
				borderColor: primaryColor,
			}}
		>
			<div className="flex flex-col gap-2">
				{/* Display font name */}
				<p
					className="text-sm font-light text-[#48505F] opacity-50"
					style={{
						fontFamily: textFont,
						fontWeight: textWeight,
					}}
				>
					{displayFont} {displayWeight}
				</p>

				{/* Example title */}
				<p
					className="text-5xl"
					style={{
						color: primaryColor,
						fontFamily: displayFont,
						fontWeight: displayWeight,
					}}
				>
					{brandName}
				</p>
			</div>
			<div className="flex flex-col gap-3">
				{/* Text font name */}
				<p
					className="text-sm font-light text-[#48505F] opacity-50"
					style={{
						fontFamily: textFont,
						fontWeight: textWeight,
					}}
				>
					{textFont} {textWeight}
				</p>
				{/* Example text */}
				<p
					className="text-base leading-7 text-[#48505F] opacity-80"
					style={{
						fontFamily: textFont,
						fontWeight: textWeight,
					}}
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation.
				</p>
			</div>
			{/* Example button */}
			<div
				className=" w-[10.5rem] rounded-md pt-3 pb-3 text-center font-Inter text-sm font-normal tracking-wide"
				style={{
					backgroundColor: accentColor,
					color:
						// If button color is bright, use black text, else use white text
						isColorBright(accentColorRGB)
							? "rgba(0, 0, 0, 1)"
							: "rgba(255, 255, 255, 1)",
				}}
			>
				{/* Button text */}
				Example Button
			</div>
		</div>
	);
};
