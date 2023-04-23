import { DashboardLayout } from "../components/DashboardLayout/DashboardLayout";
import { KitViewSection } from "./../components/Sections/KitViewSection";
import { primaryNavigation, setCurrentPage } from "../utils/navigation";
import { useDynamicStylesheets } from "../hooks/useDynamicStylesheets";
import { KitProgressCard } from "../components/Cards/KitProgressCard";
import { KitPreviewCard } from "../components/Cards/KitPreviewCard";
import { useKitViewSelection } from "../hooks/useKitViewSelection";
import { DisplayText } from "../components/Headings/DisplayText";
import { Layout } from "../components/LandingLayout/Layout";
import { useRouterQuery } from "../hooks/useRouterQuery";
import { useKitProgress } from "../hooks/useKitProgress";
import { useFetchKits } from "../hooks/useFetchKits";
import { mockStarterKits } from "../data/mockData";
import { KITS_COUNT } from "../constants/global";
import { useRouter } from "next/router";
import type { StarterKits } from "../types/Kits";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { ModalContainer } from "../components/Modals/ModalContainer";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

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
	const brandDescription = "Organic Farm Store";
	const starterKits = mockStarterKits;
	const isLoading = false;
	const error = null;

	const kitViewSelection = useKitViewSelection(starterKits);
	const { isKitView, selectedKitView } = kitViewSelection;

	useDynamicStylesheets(starterKits);

	const session = useSession();
	const supabase = useSupabaseClient();

	const [isAuthOpen, setIsAuthOpen] = useState(false);

	const handleContinue = () => {
		if (!session) {
			setIsAuthOpen(true);
		}
		if (session) {
			router.push("/account");
		}
	};

	useEffect(() => {
		if (session) {
			setIsAuthOpen(false);
			router.push("/account");
		}
	}, [session]);

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
							heading={`Your ${brandName} starter kits are ready ✨`}
							text="You can select any of the kits, colors and fonts below to see
								how they look in the Kit View section."
							type="DASHBOARD"
						/>
						<div className="flex w-full flex-col items-center justify-between gap-12 lg:flex-row lg:items-start lg:gap-0">
							{starterKits.map((starterKit, i) => (
								<KitPreviewCard
									starterKit={starterKit}
									kitViewSelection={kitViewSelection}
									key={i}
									i={i}
								/>
							))}
						</div>
					</section>
					{isKitView() && (
						<KitViewSection
							selectedKitView={selectedKitView}
							brandName={brandName}
							brandDescription={brandDescription}
							handleContinue={handleContinue}
						/>
					)}
					{isAuthOpen && (
						<ModalContainer
							open={isAuthOpen}
							setOpen={setIsAuthOpen}
							title="Almost there!"
							text="Sign up for a free account to edit, save and export your custom UI kits."
						>
							<Auth
								supabaseClient={supabase}
								appearance={{ theme: ThemeSupa }}
								view="sign_up"
								providers={["facebook", "google", "twitter"]}
								socialLayout="horizontal"
								redirectTo="/account"
							/>
						</ModalContainer>
					)}
					<div className="h-20"></div>
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
