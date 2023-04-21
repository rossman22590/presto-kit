import { DashboardLayout } from "../components/DashboardLayout/DashboardLayout";
import { primaryNavigation, setCurrentPage } from "../utils/navigation";
import { useDynamicStylesheets } from "../hooks/useDynamicStylesheets";
import { useKitViewSelection } from "../hooks/useKitViewSelection";
import { KitPreviewCard } from "./../components/KitPreviewCard";
import { KitProgressCard } from "../components/KitProgressCard";
import { TypographyCard } from "../components/TypographyCard";
import { useRouterQuery } from "../hooks/useRouterQuery";
import { useKitProgress } from "../hooks/useKitProgress";
import { DisplayText } from "../components/DisplayText";
import { useFetchKits } from "../hooks/useFetchKits";
import { mockStarterKits } from "../data/mockData";
import { KITS_COUNT } from "../constants/global";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import type { StarterKits } from "../types/Kits";
import type { NextPage } from "next";

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
							<h1 className="mb-2 text-center text-2xl font-bold lg:text-left">
								Your starter kits are ready ✨
							</h1>
							<p className="text-center text-base text-presto-text-grey lg:text-left">
								You can select any of the kits, colors and fonts below to see
								how they look in the Kit View section.
							</p>
						</div>
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
