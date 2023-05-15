import { DashboardLayout, KitViewSection } from "@components";
import { useGetLatestFullKitByTypeQuery } from "@features";
import type { NextPage } from "next/types";

const KitEditor: NextPage = ({}) => {
	const { data: kit, isSuccess: isKitLoaded } = useGetLatestFullKitByTypeQuery({
		type: "CUSTOM",
	});

	const { projectName, projectDescription } = kit || {};

	return (
		<DashboardLayout>
			{isKitLoaded ? (
				<section className="m-auto flex max-w-5xl flex-col items-center gap-12 py-6">
					<KitViewSection
						kit={kit}
						projectName={projectName}
						projectDescription={projectDescription}
					/>
				</section>
			) : (
				<section className="flex h-full items-center justify-center">
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
