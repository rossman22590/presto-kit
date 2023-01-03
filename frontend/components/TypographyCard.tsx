import React from "react";

type TypographyCardProps = {
	kit: {
		title: string;
		id: number;
		colors: {
			details: { id: number; name: string; hex: string }[];
			description: string;
		};
		typography: {
			typefaces: {
				display: { font: string; weight: string };
				text: { font: string; weight: string };
			};
			description: string;
		};
	};
};

const TypographyCard: React.FC<TypographyCardProps> = ({ kit }) => {
	const { hex: baseColor } = kit.colors.details[0];
	const { hex: primaryColor } = kit.colors.details[1];
	const { hex: accentColor } = kit.colors.details[2];
	const { font: displayFont } = kit.typography.typefaces.display;
	const { weight: displayWeight } = kit.typography.typefaces.display;
	const { font: textFont } = kit.typography.typefaces.text;
	const { weight: textWeight } = kit.typography.typefaces.text;
	const { title: kitTitle } = kit;

	const hex2rgb = (hex: string) => {
		const red = parseInt(hex.slice(1, 3), 16);
		const green = parseInt(hex.slice(3, 5), 16);
		const blue = parseInt(hex.slice(5, 7), 16);
		return { red, green, blue };
	};
	const isColorBright = (rgb: { red: number; green: number; blue: number }) => {
		return rgb.red * 0.299 + rgb.green * 0.587 + rgb.blue * 0.114 > 180;
	};
	const accentColorRGB = hex2rgb(accentColor);

	return (
		// Background container
		<div
			className="flex flex-col gap-8 rounded-lg border-r-[64px] pl-16 pt-12 pr-16 pb-12 shadow"
			style={{
				backgroundColor: baseColor,
				borderColor: primaryColor
			}}
		>
			<div className="flex flex-col gap-2">
				{/* Display font name */}
				<p
					className="text-sm font-light text-[#48505F] opacity-50"
					style={{
						fontFamily: textFont,
						fontWeight: textWeight
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
						fontWeight: displayWeight
					}}
				>
					{kitTitle}
				</p>
			</div>
			<div className="flex flex-col gap-3">
				{/* Text font name */}
				<p
					className="text-sm font-light text-[#48505F] opacity-50"
					style={{
						fontFamily: textFont,
						fontWeight: textWeight
					}}
				>
					{textFont} {textWeight}
				</p>
				{/* Example text */}
				<p
					className="text-base leading-7 text-[#48505F] opacity-80"
					style={{
						fontFamily: textFont,
						fontWeight: textWeight
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
							? "rgba(0, 0, 0, 0.7)"
							: "rgba(255, 255, 255, 1)"
				}}
			>
				{/* Button text */}
				Example Button
			</div>
		</div>
	);
};

export default TypographyCard;
