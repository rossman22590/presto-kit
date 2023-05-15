import { GOOGLE_FONTS_API_KEY as apiKey } from "@constants";
import { useGetLatestFullKitByTypeQuery } from "@features";
import { useEffect, useState } from "react";
import {
	DashboardLayout,
	KitViewSection,
	WeightSelect,
	DisplayText,
	FontSelect,
	ColorCard,
	ModalContainer,
} from "@components";
import type { NextPage } from "next/types";
import type {
	ColorsResponse,
	GoogleApiFont,
	LoadedFonts,
	PresetColor,
	FullKit,
} from "@types";
import { SaveKitForm } from "src/components/Forms/SaveKitForm";

const KitEditor: NextPage = ({}) => {
	const { data: kit, isSuccess: isKitLoaded } = useGetLatestFullKitByTypeQuery({
		type: "CUSTOM",
	});

	const { projectName, projectDescription } = kit || {};

	const [customKit, setCustomKit] = useState<FullKit | undefined>();
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

	const [onSaveKit, setOnSaveKit] = useState(false);

	useEffect(() => {
		if (isKitLoaded) {
			setCustomKit(kit);
		}
	}, [isKitLoaded]);

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

	const handleSaveKit = () => {
		setOnSaveKit(true);
	};

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

						{customKit.displayFont && customKit.textFont && googleFontList && (
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
								{projectName && projectDescription && (
									<KitViewSection
										kit={{
											...customKit,
											colors: customColors,
											displayFont: {
												name: customDisplayFont,
												weight: customDisplayWeight,
											},
											textFont: {
												name: customTextFont,
												weight: customTextWeight,
											},
										}}
										projectName={projectName}
										projectDescription={projectDescription}
										handleContinue={handleSaveKit}
									/>
								)}
							</>
						)}
					</section>
				</>
			)}
			{!isKitLoaded && (
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
