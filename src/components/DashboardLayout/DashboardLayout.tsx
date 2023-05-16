import { primaryNavigation, secondaryNavigation } from "@utils";
import { DesktopSidebar } from "./DesktopSidebar";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileSidebar } from "./MobileSidebar";
import { MobileNavbar } from "./MobileNavbar";
import { useState } from "react";
import Head from "next/head";

export type DashboardLayoutProps = React.PropsWithChildren<{
	title?: string;
	description?: string;
}>;

export const DashboardLayout = ({
	children,
	title = "PrestoKit",
	description = "Dashboard",
}: DashboardLayoutProps) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex h-full flex-col">
				<DesktopNavbar />
				<MobileNavbar setSidebarOpen={setSidebarOpen} />
				<div className="flex flex-grow">
					<MobileSidebar
						sidebarOpen={sidebarOpen}
						setSidebarOpen={setSidebarOpen}
						primaryNavigation={primaryNavigation}
						secondaryNavigation={secondaryNavigation}
					/>
					<DesktopSidebar
						primaryNavigation={primaryNavigation}
						secondaryNavigation={secondaryNavigation}
					/>
					<div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-presto-light-grey">
						<div className="relative z-0 flex flex-1 overflow-hidden">
							<main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
								<div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
									{children}
								</div>
							</main>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};
