import { DashboardLayout } from "../components/DashboardLayout/DashboardLayout";
import { primaryNavigation, setCurrentPage } from "../utils/navigation";
import { useDynamicStylesheets } from "../hooks/useDynamicStylesheets";
import { useKitViewSelection } from "../hooks/useKitViewSelection";
import { KitPreviewCard } from "../components/Cards/KitPreviewCard";
import { KitProgressCard } from "../components/Cards/KitProgressCard";
import { useColorBrightness } from "../hooks/useColorBrightness";
import { DisplayText } from "../components/Headings/DisplayText";
import { Layout } from "../components/LandingLayout/Layout";
import { useRouterQuery } from "../hooks/useRouterQuery";
import { useKitProgress } from "../hooks/useKitProgress";
import { useFetchKits } from "../hooks/useFetchKits";
import { mockStarterKits } from "../data/mockData";
import { useSelectedKit } from "../hooks/useKits";
import { KITS_COUNT } from "../constants/global";
import { useRouter } from "next/router";
import type { StarterKits } from "../types/Kits";
import type { NextPage } from "next";
import {
	ArrowRightIcon,
	Bars3Icon,
	CubeTransparentIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";

const StarterKits: NextPage = ({}) => {
	const router = useRouter();
	setCurrentPage(primaryNavigation, "Starter Kits");

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

	const kitViewSelection = useKitViewSelection(starterKits);
	const { isKitView, selectedKitView } = kitViewSelection;

	const { baseColor, primaryColor, accentColor, displayFont, textFont } =
		useSelectedKit(selectedKitView);

	const { isColorBright, accentColorRGB } = useColorBrightness(accentColor);

	useDynamicStylesheets(starterKits);

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
							type="MAIN"
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
						<DisplayText
							heading="Your starter kits are ready ✨"
							text="You can select any of the kits, colors and fonts below to see
								how they look in the Kit View section."
							type="DASHBOARD"
						/>
						<div className="flex w-full flex-col items-center justify-between gap-12 lg:flex-row lg:gap-0">
							{starterKits.map((starterKit, i) => (
								<KitPreviewCard
									starterKit={starterKit}
									kitViewSelection={kitViewSelection}
									key={i}
									i={i}
								/>
							))}
						</div>
						{/* Kit view section placeholder */}
					</section>
					<section className="m-auto my-12 flex max-w-5xl flex-col items-center gap-12 py-6">
						{isKitView() && (
							<>
								<DisplayText
									heading="Kit Preview"
									text="When you are ready, click continue to make changes, save and download your custom UI Kit"
									type="DASHBOARD"
									buttonText="Continue"
								/>

								<div className="flex aspect-[3.1/2] w-full flex-col rounded-xl border-4 border-white bg-white">
									<div className="flex h-7 w-full items-center justify-start gap-[7px]  rounded-t-lg bg-white pl-2">
										{Array(3)
											.fill(0)
											.map((_, i) => (
												<div
													className="aspect-square w-[11px] -translate-y-[2px] rounded-full bg-[#f0f2f7]"
													key={i}
												></div>
											))}
									</div>
									<div
										className="flex w-full grow flex-col justify-between rounded-b-lg"
										style={{
											backgroundColor: baseColor,
										}}
									>
										<div className="relative flex w-full justify-between py-5 px-6">
											<div className="flex items-center gap-2">
												<CubeTransparentIcon
													className="h-7"
													style={{
														color: accentColor,
													}}
												/>
												<h3
													className="text-lg"
													style={{
														color: primaryColor,
														fontFamily: displayFont,
													}}
												>
													{brandName}
												</h3>
											</div>

											<div
												className="absolute left-0 top-0 bottom-0 right-0 m-auto flex items-center justify-center gap-10 text-center text-sm font-light subpixel-antialiased"
												style={{
													color: primaryColor,
													fontFamily: textFont,
												}}
											>
												<p>Home</p>
												<p>About</p>
												<p>Contact</p>
											</div>

											<div className="flex items-center gap-3">
												<Bars3Icon
													className="w-7"
													style={{
														color: primaryColor,
													}}
												/>
												<UserCircleIcon
													className="w-7"
													style={{
														color: primaryColor,
													}}
												/>
											</div>
										</div>

										<div className="flex -translate-y-8 flex-col items-center gap-8">
											<div
												className="flex w-fit items-center justify-center gap-1 rounded-full border-[1px] py-2 px-7"
												style={{
													borderColor: `${accentColor}40`,
												}}
											>
												<p
													className="text-sm"
													style={{
														color: primaryColor,
													}}
												>
													Lorem ipsum dolor{" "}
													<span
														className="font-bold"
														style={{
															color: accentColor,
														}}
													>
														sit amet
													</span>
												</p>
												<ArrowRightIcon
													className="w-4"
													style={{
														color: accentColor,
													}}
												/>
											</div>

											<h4
												className="text-center text-6xl"
												style={{
													color: primaryColor,
													fontFamily: displayFont,
												}}
											>
												{displayFont} Heading
											</h4>

											<p
												className="px-32 text-center text-[19px] leading-[1.6] text-[#393b47]"
												style={{
													fontFamily: textFont,
												}}
											>
												{textFont} text lorem ipsum dolor sit amet, consectetur
												adipiscing elit, sed do eiusmod tempor incididunt ut
												labore et dolore magna aliqua. Ut enim ad minim.
											</p>

											<div className="flex items-center gap-4">
												<div
													className="rounded-md border-2 py-[9px] px-[34px] text-lg text-white subpixel-antialiased"
													style={{
														backgroundColor: accentColor,
														borderColor: accentColor,
														fontFamily: textFont,
														color:
															// If button color is bright, use black text, else use white text
															isColorBright(accentColorRGB)
																? "rgba(0, 0, 0, 1)"
																: "rgba(255, 255, 255, 1)",
													}}
												>
													Get started
												</div>
												<div
													className="rounded-md border-2 py-[9px] px-[34px] text-lg text-white subpixel-antialiased"
													style={{
														fontFamily: textFont,
														color: primaryColor,
														borderColor: primaryColor,
													}}
												>
													Learn more
												</div>
											</div>
										</div>
										<div
											className="h-[60px] w-full rounded-b-lg"
											style={{ backgroundColor: accentColor }}
										></div>
									</div>
								</div>
								<div className="h-20"></div>
							</>
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
								type="MAIN"
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
