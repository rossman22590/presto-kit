import { primaryNavigation, setCurrentPage } from "@utils";
import { KITS_COUNT } from "@constants";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { NextPage } from "next";
import {
	useAddAiColorsMutation,
	useAddAiFontsMutation,
	useAddAiKitsMutation,
	useGetLatestProjectQuery,
} from "@features";
import {
	useDynamicStylesheets,
	useKitViewSelection,
	useKitProgress,
	useFetchKits,
	useUploadKit,
	useSupabase,
} from "@hooks";
import {
	KitProgressCard,
	DashboardLayout,
	KitViewSection,
	KitPreviewCard,
	DisplayText,
	Layout,
} from "@components";

const StarterKits: NextPage = ({}) => {
	setCurrentPage(primaryNavigation, "Starter Kits");
	const { user } = useSupabase();
	const router = useRouter();

	// Step 1: Get latest project details from onboarding
	const { data: projectData, isSuccess: isProjectLoaded } =
		useGetLatestProjectQuery({ user }, { skip: !user });

	const {
		id: projectId,
		name: projectName,
		description: projectDescription,
	} = projectData || {};

	// Step 2: Get AI generated starter kits from express API using project details
	const { starterKits, isLoadingKits, error } = useFetchKits(
		projectDescription,
		projectName,
		isProjectLoaded
	);

	// Step 3: Update progress bar as each starter kit is generated
	const prevProgress = 66;
	const progress = useKitProgress(starterKits, prevProgress);

	// Step 4: When all starter kits have been generated, add kits and content to DB
	const [addAiKits, { data: kitsData }] = useAddAiKitsMutation();
	const { kitIds } = kitsData || {};
	const [addAiColors] = useAddAiColorsMutation();
	const [addAiFonts] = useAddAiFontsMutation();

	useEffect(() => {
		if (starterKits.length === KITS_COUNT) {
			addAiKits({ projectId, user, aiKits: starterKits }).then(() =>
				kitIds?.forEach((kitId, i) => {
					addAiColors({ kitId, aiKit: starterKits[i] });
					addAiFonts({ kitId, aiKit: starterKits[i] });
				})
			);
		}
	}, [starterKits]);

	// Step 6: Add starter kit fonts to stylesheets
	useDynamicStylesheets(starterKits);

	// Step 7: Handle user kit view selection process
	const kitViewSelectionUtils = useKitViewSelection(starterKits);
	const { isKitView, selectedKitView } = kitViewSelectionUtils;

	// TODO: Refactor to redux
	// Step 8: When user has chosen their preferred kit combination, add it to DB and continue to kit editor page
	const customKitTitle = `${projectName} Custom Kit`;

	const setIsKitReady = useUploadKit(
		"CUSTOM",
		projectId,
		customKitTitle,
		selectedKitView
	);

	const handleContinue = () => {
		setIsKitReady(true);
		router.push("/kit-editor");
	};

	if (!isProjectLoaded) {
		return (
			<Layout>
				<section className="m-auto flex max-w-[720px] flex-grow flex-col items-center gap-4 pt-28 md:gap-8 md:pt-40 md:pb-20">
					<img
						src="/loading-icon.png"
						alt="Loading Icon"
						className="h-16 w-16 animate-spin"
					/>
				</section>
			</Layout>
		);
	}

	if (isLoadingKits && !error) {
		return (
			<Layout prevProgress={prevProgress} progress={progress}>
				<section className="m-auto flex max-w-[720px] flex-grow flex-col items-center gap-4 pt-28 md:gap-8 md:pt-40 md:pb-20">
					<DisplayText
						heading="Generating Starter Kits"
						text={`Thank you for your patience while our AI works hard to create a selection of starter kits for your project. Currently generating kit ${
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
		);
	}

	if (!isLoadingKits && starterKits.length > 0) {
		return (
			<DashboardLayout>
				<section className="m-auto flex max-w-5xl flex-col items-center gap-12 py-6">
					<DisplayText
						heading={`Your ${projectName} starter kits are ready ✨`}
						text="You can select any of the kits, colors and fonts below to see
								how they look in the Kit View section."
						type="DASHBOARD"
					/>
					<div className="flex w-full flex-col items-center justify-between gap-12 lg:flex-row lg:items-start lg:gap-0">
						{starterKits.map((starterKit, i) => (
							<KitPreviewCard
								kit={starterKit}
								kitViewSelectionUtils={kitViewSelectionUtils}
								key={i}
								i={i}
							/>
						))}
					</div>
				</section>
				{isKitView() && projectName && projectDescription && (
					<KitViewSection
						kit={selectedKitView}
						projectName={projectName}
						projectDescription={projectDescription}
						handleContinue={handleContinue}
					/>
				)}

				<div className="h-20"></div>
			</DashboardLayout>
		);
	}

	return (
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
	);
};

export default StarterKits;
