import { DashboardLayout } from "../components/DashboardLayout/DashboardLayout";
import { DisplayText } from "../components/Headings/DisplayText";
import { WeightSelect } from "../components/Forms/WeightSelect";
import { FontSelect } from "../components/Forms/FontSelect";
import { useGetCustomKit } from "../hooks/useGetCustomKit";
import { ColorCard } from "../components/Cards/ColorCard";
import { mockCustomKit } from "../data/mockData";
import { useEffect, useState } from "react";
import type { GoogleApiFont, LoadedFonts } from "../types/Fonts";
import type { ColorsResponse } from "../types/Data";
import type { PresetColor } from "../types/Colors";
import type { CustomKit } from "../types/Kits";
import type { NextPage } from "next/types";

const KitEditor: NextPage = ({}) => {
	const { isLoadingKit, kit } = useGetCustomKit();

	const [customKit, setCustomKit] = useState<CustomKit | null>(null);
	const [customColors, setCustomColors] = useState<ColorsResponse[] | null>(
		null
	);
	const [presetColors, setPresetColors] = useState<PresetColor[] | undefined>();

	const [googleFontList, setGoogleFontList] = useState<GoogleApiFont[]>([]);
	const [loadedFonts, setLoadedFonts] = useState<LoadedFonts>({});

	const [customDisplayFont, setCustomDisplayFont] = useState("");
	const [customDisplayWeight, setCustomDisplayWeight] = useState("");

	const [customTextFont, setCustomTextFont] = useState("");
	const [customTextWeight, setCustomTextWeight] = useState("");

	useEffect(() => {
		setCustomKit(kit);
	}, [isLoadingKit]);

	useEffect(() => {
		if (customKit && customKit.displayFont && customKit.textFont) {
			setCustomColors(customKit.colors);

			setCustomDisplayFont("");
			setCustomDisplayWeight(customKit.displayFont.weight || "400");

			setCustomTextFont("");
			setCustomTextWeight(customKit.textFont.weight || "400");
		}
	}, [customKit]);

	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY || "";
		(async () => {
			try {
				const response = await fetch(
					`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`
				);
				const data = await response.json();
				setGoogleFontList(data.items);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<DashboardLayout>
			{customKit && customColors && (
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
							text="You can select any of the fonts below to browse and try out different fonts."
							type="DASHBOARD"
						/>

						{customKit.displayFont && customKit.textFont && (
							<>
								<div className="flex w-full justify-between gap-1">
									<div className="flex gap-[2px]">
										<FontSelect
											fonts={googleFontList}
											setFonts={setGoogleFontList}
											loadedFonts={loadedFonts}
											setLoadedFonts={setLoadedFonts}
											selectedFont={customDisplayFont}
											setSelectedFont={setCustomDisplayFont}
											selectedWeight={customDisplayWeight}
											setSelectedWeight={setCustomDisplayWeight}
										/>
										<WeightSelect
											fonts={googleFontList}
											selectedFont={customDisplayFont}
											setSelectedFont={setCustomDisplayFont}
											selectedWeight={customDisplayWeight}
											setSelectedWeight={setCustomDisplayWeight}
											initialFont={customKit.displayFont.name}
										/>
									</div>
									<div className="flex gap-[2px]">
										<FontSelect
											fonts={googleFontList}
											setFonts={setGoogleFontList}
											loadedFonts={loadedFonts}
											setLoadedFonts={setLoadedFonts}
											selectedFont={customTextFont}
											setSelectedFont={setCustomTextFont}
											selectedWeight={customTextWeight}
											setSelectedWeight={setCustomTextWeight}
										/>
										<WeightSelect
											fonts={googleFontList}
											selectedFont={customTextFont}
											setSelectedFont={setCustomTextFont}
											selectedWeight={customTextWeight}
											setSelectedWeight={setCustomTextWeight}
											initialFont={customKit.textFont.name}
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
