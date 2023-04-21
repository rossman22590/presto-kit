import { DashboardLayout } from "../components/DashboardLayout/DashboardLayout";
import { primaryNavigation, setCurrentPage } from "../utils/navigation";
import { useDynamicStylesheets } from "../hooks/useDynamicStylesheets";
import { TypographySection } from "../components/TypographySection";
import { KitProgressCard } from "../components/KitProgressCard";
import { ColorSection } from "../components/ColorSection";
import { useRouterQuery } from "../hooks/useRouterQuery";
import { useKitProgress } from "../hooks/useKitProgress";
import { DisplayText } from "../components/DisplayText";
import { KitHeading } from "../components/KitHeading";
import { useFetchKits } from "../hooks/useFetchKits";
import { mockStarterKits } from "../data/mockData";
import { KITS_COUNT } from "../constants/global";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Kit, StarterKits } from "../types/StarterKits";
import type { NextPage } from "next";
import { TypographyCard } from "../components/TypographyCard";
import { classNames } from "../utils/helpers";

const StarterKits: NextPage = ({}) => {
	const router = useRouter();

	// const { brandName, brandDescription } = useRouterQuery(router);
	// const { starterKits, isLoading, error } = useFetchKits(
	// 	brandDescription,
	// 	brandName
	// );
	// const prevProgress = 33;
	// const latestProgress = 66;
	// const progress = useKitProgress(starterKits, latestProgress);

	// Mock data
	const brandName = "Farm Shop";
	const starterKits = mockStarterKits;
	const isLoading = false;
	const error = null;

	useDynamicStylesheets(starterKits);

	setCurrentPage(primaryNavigation, "Starter Kits");

	type SelectedIndex = {
		fullKit: number | null;
		color: number | null;
		displayFont: number | null;
		textFont: number | null;
	};

	const isKitView = () => {
		return Object.values(selectedIndex).some((value) => value !== null);
	};

	const [colorView, setColorView] = useState(starterKits[0]?.colors);
	const [displayFontView, setDisplayFontView] = useState(
		starterKits[0]?.typography.typefaces.display
	);
	const [textFontView, setTextFontView] = useState(
		starterKits[0]?.typography.typefaces.text
	);

	const [isFullKitView, setIsFullKitView] = useState(true);

	const [selectedIndex, setSelectedIndex] = useState<SelectedIndex>({
		fullKit: null,
		color: null,
		displayFont: null,
		textFont: null,
	});

	const updateView = (
		type: "color" | "displayFont" | "textFont" | "fullKit",
		kitIndex: number
	) => {
		const kit = starterKits[kitIndex];

		setSelectedIndex({
			...selectedIndex,
			[type]: kitIndex,
		});

		switch (type) {
			case "color":
				setColorView(kit.colors);
				break;
			case "displayFont":
				setDisplayFontView(kit.typography.typefaces.display);
				break;
			case "textFont":
				setTextFontView(kit.typography.typefaces.text);
				break;
			case "fullKit":
				setColorView(kit.colors);
				setDisplayFontView(kit.typography.typefaces.display);
				setTextFontView(kit.typography.typefaces.text);
				break;
			default:
				break;
		}
	};

	// useEffect(() => {
	// 	updateView("fullKit", 0);
	// }, [starterKits]);

	// useEffect(() => {
	// 	console.log("selectedIndex:", selectedIndex);
	// }, [selectedIndex]);

	const selectedKitView = {
		title: "",
		id: 0,
		colors: colorView,
		typography: {
			typefaces: {
				display: displayFontView,
				text: textFontView,
			},
		},
	};

	const isSelected = (
		type: "color" | "displayFont" | "textFont" | "fullKit",
		kitIndex: number
	) => {
		switch (type) {
			case "color":
				return selectedIndex.color === kitIndex;
			case "displayFont":
				return selectedIndex.displayFont === kitIndex;
			case "textFont":
				return selectedIndex.textFont === kitIndex;
			case "fullKit":
				return selectedIndex.fullKit === kitIndex;
			default:
				return false;
		}
	};

	const toggleFullKitView = (kitIndex: number) => {
		setSelectedIndex({
			fullKit: isFullKitView ? null : kitIndex,
			color: isFullKitView ? kitIndex : null,
			displayFont: isFullKitView ? kitIndex : null,
			textFont: isFullKitView ? kitIndex : null,
		});
		setIsFullKitView(!isFullKitView);
	};

	return (
		<>
			{isLoading && !error ? (
				// <Layout prevProgress={prevProgress} progress={progress}>
				<Layout>
					<section className="m-auto flex max-w-[720px] flex-grow flex-col items-center gap-4 pt-28 md:gap-8 md:pt-40 md:pb-20">
						<DisplayText
							heading="Generating Starter Kits"
							text={`Thank you for your patience while our AI works hard to create a selection of starter kits for your brand. Currently generating kit ${
								starterKits.length + 1
							} of ${KITS_COUNT}`}
						/>
						<div className="mt-6 flex flex-col gap-8 md:flex-row md:gap-12">
							{Array(KITS_COUNT)
								.fill(0)
								.map((_, index) => {
									const kitNumber = index + 1;
									const isGenerating = kitNumber === starterKits.length + 1;
									const isComplete = kitNumber <= starterKits.length;
									return (
										<KitProgressCard
											key={kitNumber}
											starterKits={starterKits}
											kitNumber={kitNumber}
											isGenerating={isGenerating}
											isComplete={isComplete}
										/>
									);
								})}
						</div>
					</section>
				</Layout>
			) : !isLoading && starterKits.length > 0 ? (
				<DashboardLayout>
					<section className="m-auto flex max-w-5xl flex-col items-center gap-12 py-6">
						<div className="w-full">
							<h1 className="mb-2 text-2xl font-bold">
								Your starter kits are ready ✨
							</h1>
							<p className="text-base text-presto-text-grey">
								You can select any of the kits, colors and fonts below to see
								how they look in the Kit View section.
							</p>
						</div>
						<div className="flex w-full justify-between">
							{starterKits.map((starterKit, i) => (
								<div
									key={i}
									className={classNames(
										isFullKitView ? "cursor-pointer" : "",
										"group flex w-[310px] flex-col gap-4"
									)}
									onClick={() => {
										if (isFullKitView) {
											updateView("fullKit", i);
										}
									}}
								>
									<div className="flex gap-5">
										{/* placeholer logic */}
										<h1
											className={classNames(
												isFullKitView && isSelected("fullKit", i)
													? "border-presto-green"
													: isFullKitView
													? "border-white group-hover:border-presto-green-light"
													: "border-white hover:border-presto-green-light",
												"w-fit cursor-pointer rounded-xl border-[1px] bg-white px-5 py-3 text-lg font-medium"
											)}
										>
											<span className="text-[#AAB2C6]">{`0${starterKit.id} `}</span>
											{starterKit.title}
										</h1>

										<button
											className="hover:text-fuchsia-500"
											onClick={(e) => {
												e.stopPropagation();
												toggleFullKitView(i);
											}}
										>
											{isFullKitView ? "locked" : "unlocked"}
										</button>
									</div>

									<div
										className={classNames(
											isSelected("fullKit", i) || isSelected("color", i)
												? "border-presto-green"
												: isFullKitView
												? "border-white group-hover:border-presto-green-light"
												: "cursor-pointer border-white hover:border-presto-green-light",
											"flex flex-col gap-5 rounded-xl border-[1px] bg-white p-8"
										)}
										onClick={() => {
											if (!isFullKitView) {
												updateView("color", i);
											}
										}}
									>
										{starterKit.colors.details.map((color, i) => (
											<div
												className="flex items-center gap-4 text-base"
												key={i}
											>
												<div
													className="aspect-square h-14 rounded-md"
													style={{ backgroundColor: color.hex }}
												>
													&nbsp;
												</div>
												<div className="flex flex-col gap-[2px]">
													<p className="font-medium">{color.name}</p>
													<p className="tracking-wide text-[#AAB2C6]">
														{color.hex}
													</p>
												</div>
											</div>
										))}
									</div>

									<div
										className={classNames(
											isSelected("fullKit", i) || isSelected("displayFont", i)
												? "border-presto-green"
												: isFullKitView
												? "border-white group-hover:border-presto-green-light"
												: "cursor-pointer border-white hover:border-presto-green-light",
											"rounded-xl border-[1px] bg-white px-8 py-5 text-xl"
										)}
										style={{
											fontFamily: starterKit.typography.typefaces.display.font,
											color: starterKit.colors.details[1].hex,
										}}
										onClick={() => {
											if (!isFullKitView) {
												updateView("displayFont", i);
											}
										}}
									>
										{starterKit.typography.typefaces.display.font}{" "}
										{starterKit.typography.typefaces.display.weight} Display
									</div>

									<div
										className={classNames(
											isSelected("fullKit", i) || isSelected("textFont", i)
												? "border-presto-green"
												: isFullKitView
												? "border-white  group-hover:border-presto-green-light"
												: "cursor-pointer  border-white hover:border-presto-green-light",
											"rounded-xl border-[1px] bg-white px-8 py-5 text-lg text-[#343b45] subpixel-antialiased "
										)}
										style={{
											fontFamily: starterKit.typography.typefaces.text.font,
										}}
										onClick={() => {
											if (!isFullKitView) {
												updateView("textFont", i);
											}
										}}
									>
										{starterKit.typography.typefaces.text.font}{" "}
										{starterKit.typography.typefaces.text.weight} Text
									</div>
								</div>
							))}
						</div>
						{/* Kit view section placeholder */}
						<br />
						{isKitView() && (
							<TypographyCard kit={selectedKitView} brandName={brandName} />
						)}
					</section>
				</DashboardLayout>
			) : (
				<Layout>
					<section className="m-auto flex max-w-[720px] flex-col items-center gap-20 pb-56">
						<div className="m-auto flex flex-col items-center gap-8 pb-56">
							<DisplayText
								heading="Woops, something went wrong!"
								text="Occasionally the AI response is not valid but we are working to fix this."
							/>
							<button
								type="submit"
								onClick={() => router.push("/")}
								className="font-regular cursor-pointer rounded-md bg-presto-green pl-8 pr-8 pt-4 pb-4 font-Inter text-lg text-white hover:opacity-90"
							>
								Please try again
							</button>
						</div>
					</section>
				</Layout>
			)}
		</>
	);
};

export default StarterKits;

{
	/* <section className="m-auto flex max-w-[720px] flex-col items-center gap-20 pb-56">
	{starterKits.map((kit) => (
		<div className="mt-32 flex w-full flex-col gap-16" key={kit.id}>
			<KitHeading id={kit.id} title={kit.title} />
			<ColorSection kit={kit} />
			<TypographySection kit={kit} brandName={brandName} />
		</div>
	))}
</section>; */
}
