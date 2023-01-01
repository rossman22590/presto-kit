import React from "react";

type ColorSectionProps = {
	kit: {
		colors: {
			details: { id: number; name: string; hex: string }[];
			description: string;
		};
	};
};

const ColorSection: React.FC<ColorSectionProps> = ({ kit }) => {
	return (
		<section className="flex w-full flex-col gap-12">
			<h2 className="font-Inter text-4xl font-bold">
				<span className="text-[#AEB4C1]"> 01 </span> Calm Serenity
			</h2>
			<div id="colors-section-container" className="flex flex-col gap-12">
				<h3 className="font-Inter text-2xl font-semibold">Color Scheme</h3>
				<div id="color-cards-container" className="flex justify-between ">
					{kit.colors.details.map((color) => (
						<div
							id="color-card"
							key={color.id}
							className="w-[31%] rounded-lg shadow"
						>
							<div
								id="color-display"
								className="color h-36 w-full rounded-t-lg"
								style={{
									backgroundColor: color.hex
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
					))}
				</div>
				<p className="border-l-4 border-[#E8EDF4] pl-10 font-Inter font-light leading-8 text-[#48505F]">
					{kit.colors.description}{" "}
				</p>
			</div>
		</section>
	);
};

export default ColorSection;
