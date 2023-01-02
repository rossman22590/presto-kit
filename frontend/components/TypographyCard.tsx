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
	const hex2rgb = (hex: string) => {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);

		return { r, g, b };
	};

	const rgb = hex2rgb(kit.colors.details[1].hex);

	return (
		<div
			className="flex flex-col gap-8 rounded-lg border-r-[64px] pl-20 pt-12 pr-20 pb-12"
			style={{
				backgroundColor: kit.colors.details[0].hex,
				borderColor: kit.colors.details[1].hex
			}}
		>
			<div className="flex flex-col gap-2">
				<p
					className="text-sm font-light text-[#48505F] opacity-50"
					style={{
						fontFamily: `${kit.typography.typefaces.text.font}`,
						fontWeight: `${kit.typography.typefaces.text.weight}`
					}}
				>
					{kit.typography.typefaces.display.font}{" "}
					{kit.typography.typefaces.display.weight}
				</p>
				<p
					className="text-5xl"
					style={{
						color: kit.colors.details[1].hex,
						fontWeight: `${kit.typography.typefaces.display.weight}`,
						fontFamily: `${kit.typography.typefaces.display.font}`
					}}
				>
					{kit.title}
				</p>
			</div>
			<div className="flex flex-col gap-3">
				<p
					className="text-sm font-light text-[#48505F] opacity-50"
					style={{
						fontFamily: `${kit.typography.typefaces.text.font}`,
						fontWeight: `${kit.typography.typefaces.text.weight}`
					}}
				>
					{kit.typography.typefaces.text.font}{" "}
					{kit.typography.typefaces.text.weight}
				</p>
				<p
					className="text-base leading-7 text-[#48505F] opacity-80"
					style={{
						fontFamily: `${kit.typography.typefaces.text.font}`,
						fontWeight: `${kit.typography.typefaces.text.weight}`
					}}
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation.
				</p>
			</div>
			<div
				className=" w-[10.5rem] rounded-md pt-3 pb-3 text-center font-Inter text-sm font-normal tracking-wide"
				style={{
					backgroundColor: kit.colors.details[2].hex,
					color:
						rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 140
							? "rgba(0, 0, 0, 0.7)"
							: "#FFFFFF"
				}}
			>
				Example Button
			</div>
		</div>
	);
};

export default TypographyCard;
