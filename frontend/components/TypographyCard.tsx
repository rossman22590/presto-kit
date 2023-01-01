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
	return (
		<div
			className="flex flex-col gap-8 rounded-lg border-r-[64px] pl-20 pt-12 pr-20 pb-12"
			style={{
				backgroundColor: kit.colors.details[0].hex,
				borderColor: kit.colors.details[1].hex
			}}
		>
			<div className="flex flex-col gap-2">
				<p className="text-sm font-light text-[#48505F] opacity-50">
					{kit.typography.typefaces.display.font}{" "}
					{kit.typography.typefaces.display.weight}
				</p>
				<p
					className="text-5xl"
					style={{
						color: kit.colors.details[1].hex,
						fontWeight: 500
					}}
				>
					{kit.title}
				</p>
			</div>
			<div className="flex flex-col gap-3">
				<p className="text-sm font-light text-[#48505F] opacity-50">
					{kit.typography.typefaces.text.font}{" "}
					{kit.typography.typefaces.text.weight}
				</p>
				<p className="text-sm font-light leading-7 text-[#48505F] opacity-80">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
				</p>
			</div>
			<div
				className=" w-[10.5rem] rounded-md pt-3 pb-3 text-center font-Inter text-sm font-light text-black text-opacity-70"
				style={{
					backgroundColor: kit.colors.details[2].hex
				}}
			>
				Lorem ipsum
			</div>
		</div>
	);
};

export default TypographyCard;
