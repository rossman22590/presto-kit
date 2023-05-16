import type { DesktopSidebarProps } from "@types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { handleNavClick, classNames } from "@utils";
import { useRouter } from "next/router";

export const DesktopSidebar = ({
	primaryNavigation,
	secondaryNavigation,
}: DesktopSidebarProps) => {
	const supabase = useSupabaseClient();
	const router = useRouter();

	return (
		<div className="hidden xl:flex xl:flex-shrink-0">
			<div className="flex w-64 flex-col">
				<div className="flex min-h-0 flex-1 flex-col bg-white">
					<div className="flex flex-1 flex-col overflow-y-auto pt-1 pb-4">
						<nav className="mt-5 flex-1 p-4" aria-label="Sidebar">
							<div className="space-y-6 px-2">
								{primaryNavigation.map((item) => (
									<button
										key={item.name}
										onClick={() => handleNavClick(item.name, router, supabase)}
										className={classNames(
											item.current
												? "bg-presto-light-grey text-black"
												: "bg-white text-presto-grey hover:bg-presto-light-grey",
											"group flex w-full items-center rounded-xl px-6 py-3 subpixel-antialiased"
										)}
									>
										<item.icon
											className={classNames(
												item.current
													? "stroke-presto-green"
													: "stroke-[#AAB1BE]",
												"mr-3 h-6 w-6"
											)}
											aria-hidden="true"
										/>
										{item.name}
									</button>
								))}
							</div>
						</nav>
					</div>
					<div className="flex flex-col border-t border-[#ebeff0] p-4">
						<div className="space-y-6 py-9 px-2">
							{secondaryNavigation.map((item) => (
								<button
									key={item.name}
									onClick={() => handleNavClick(item.name, router, supabase)}
									className={classNames(
										item.current
											? "bg-presto-light-grey text-black"
											: "bg-white text-presto-grey hover:bg-presto-light-grey",
										"group flex w-full items-center rounded-xl px-6 py-3 subpixel-antialiased"
									)}
								>
									<item.icon
										className={classNames(
											item.current ? "stroke-presto-green" : "stroke-[#AAB1BE]",
											"mr-3 h-6 w-6"
										)}
										aria-hidden="true"
									/>
									{item.name}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
