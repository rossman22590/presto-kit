import { DashboardLayout } from "../components/DashboardLayout/DashboardLayout";
import { DisplayText } from "../components/Headings/DisplayText";
import { useGetCustomKit } from "../hooks/useGetCustomKit";
import { ColorCard } from "../components/Cards/ColorCard";
import { mockCustomKit } from "../data/mockData";
import { ColorsResponse } from "../types/Data";
import { PresetColor } from "../types/Colors";
import { useEffect, useState } from "react";
import { CustomKit } from "../types/Kits";
import type { NextPage } from "next/types";
import dynamic from "next/dynamic";
import { Font } from "../types/Fonts";

const FontSelect = dynamic(() => import("../components/Forms/FontSelect"), {
	ssr: false,
});
const WeightSelect = dynamic(() => import("../components/Forms/WeightSelect"), {
	ssr: false,
});

const KitEditor: NextPage = ({}) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const { isLoadingKit, kit } = useGetCustomKit();

	const [customKit, setCustomKit] = useState<CustomKit | null>(null);

	useEffect(() => {
		setCustomKit(kit);
	}, [isLoadingKit]);

	const [customColors, setCustomColors] = useState<ColorsResponse[] | null>(
		null
	);

	const [presetColors, setPresetColors] = useState<PresetColor[] | undefined>();

	const [displayFonts, setDisplayFonts] = useState<Font[]>([]);
	const [customDisplayFont, setCustomDisplayFont] = useState("");
	const [customDisplayWeight, setCustomDisplayWeight] = useState("");

	const [textFonts, setTextFonts] = useState<Font[]>([]);
	const [customTextFont, setCustomTextFont] = useState("");
	const [customTextWeight, setCustomTextWeight] = useState("");

	useEffect(() => {
		if (customKit && customKit.display && customKit.text) {
			setCustomColors(customKit.colors);

			setCustomDisplayFont(customKit.display.font);
			setCustomDisplayWeight(customKit.display.weight || "400");

			setCustomTextFont(customKit.text.font);
			setCustomTextWeight(customKit.text.weight || "400");
		}
	}, [customKit]);

	return (
		<DashboardLayout>
			{customColors && (
				<>
					<section className="m-auto flex max-w-5xl flex-col items-center gap-12 py-6">
						<DisplayText
							heading="Edit Kit Colors"
							text="You can select any of the color hex codes below to edit and try out different colors."
							type="DASHBOARD"
						/>
						<div className="flex w-full flex-col items-center justify-between gap-12 lg:flex-row lg:items-start lg:gap-0">
							{customColors?.map((_, i) => (
								<ColorCard
									customColors={customColors}
									setCustomColors={setCustomColors}
									presetColors={presetColors}
									setPresetColors={setPresetColors}
									key={i}
									i={i}
								/>
							))}
						</div>
					</section>
					<section className="m-auto mt-10 flex max-w-5xl flex-col items-center gap-12 py-6">
						<DisplayText
							heading="Edit Kit Fonts"
							text="You can select any of the fonts below to select and try out different fonts."
							type="DASHBOARD"
						/>

						{isMounted && (
							<>
								<div className="flex w-full justify-between">
									<div className="flex">
										<FontSelect
											fonts={displayFonts}
											setFonts={setDisplayFonts}
											selectedFont={customDisplayFont}
											setSelectedFont={setCustomDisplayFont}
											selectedWeight={customDisplayWeight}
											setSelectedWeight={setCustomDisplayWeight}
										/>
										<WeightSelect
											fonts={displayFonts}
											selectedFont={customDisplayFont}
											selectedWeight={customDisplayWeight}
											setSelectedWeight={setCustomDisplayWeight}
										/>
									</div>
									<div className="flex">
										<FontSelect
											fonts={textFonts}
											setFonts={setTextFonts}
											selectedFont={customTextFont}
											setSelectedFont={setCustomTextFont}
											selectedWeight={customTextWeight}
											setSelectedWeight={setCustomTextWeight}
										/>
										<WeightSelect
											fonts={textFonts}
											selectedFont={customTextFont}
											selectedWeight={customTextWeight}
											setSelectedWeight={setCustomTextWeight}
										/>
									</div>
								</div>
								<div
									style={{
										fontFamily: customDisplayFont,
										fontWeight: customDisplayWeight,
										fontSize: 42,
									}}
								>
									The quick brown fox jumps over the lazy dog
								</div>
								<div
									style={{
										fontFamily: customTextFont,
										fontWeight: customTextWeight,
										fontSize: 24,
									}}
								>
									The quick brown fox jumps over the lazy dog
								</div>
							</>
						)}
					</section>
				</>
			)}
			{isLoadingKit && (
				<section className="m-auto flex max-w-[720px] flex-grow flex-col items-center gap-4 pt-28 md:gap-8 md:pt-40 md:pb-20">
					<img
						src="/loading-icon.png"
						alt="Loading Icon"
						className="h-16 w-16 animate-spin"
					/>
				</section>
			)}
		</DashboardLayout>
	);
};

export default KitEditor;
