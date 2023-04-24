import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { MobileSidebarProps } from "../../types/Props";
import { handleNavClick } from "../../utils/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { classNames } from "../../utils/helpers";
import { useRouter } from "next/router";
import { Fragment } from "react";

export const MobileSidebar = ({
	sidebarOpen,
	setSidebarOpen,
	primaryNavigation,
	secondaryNavigation,
}: MobileSidebarProps) => {
	const supabase = useSupabaseClient();
	const router = useRouter();

	return (
		<Transition.Root show={sidebarOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-40 xl:hidden"
				onClose={setSidebarOpen}
			>
				<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-slate-600 bg-opacity-75" />
				</Transition.Child>

				<div className="fixed inset-0 z-40 flex">
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="w-full"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="w-full"
						leaveTo="-translate-x-full"
					>
						<Dialog.Panel className="relative flex h-full w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
							<Transition.Child
								as={Fragment}
								enter="ease-in-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in-out duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								{/* Close sidebar icon starts here */}
								<div className="absolute top-0 right-0 -mr-12 pt-2">
									<button
										type="button"
										className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
										onClick={() => setSidebarOpen(false)}
									>
										<span className="sr-only">Close sidebar</span>
										<XMarkIcon
											className="h-6 w-6 text-white"
											aria-hidden="true"
										/>
									</button>
								</div>
							</Transition.Child>
							<div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
								{/* Logo starts here */}
								<div className="flex flex-shrink-0 items-center px-6">
									<img
										src="/logo.png"
										alt="PrestoKit Logo"
										className="h-7 cursor-pointer"
										onClick={() => router.push("/")}
									/>
								</div>
								{/* Mobile primary navigation starts here */}
								<nav aria-label="Sidebar" className="mt-8 flex-1 p-4">
									<div className="space-y-6 p-4 px-2">
										{primaryNavigation.map((item) => (
											<button
												key={item.name}
												onClick={() =>
													handleNavClick(item.name, router, supabase)
												}
												className={classNames(
													item.current
														? "bg-presto-light-grey text-black"
														: "bg-white text-presto-grey hover:bg-presto-light-grey",
													"group flex w-full items-center rounded-xl px-6 py-3 font-Inter"
												)}
											>
												<item.icon
													className={classNames(
														item.current
															? "stroke-presto-green"
															: "stroke-[#A5DDD3]",
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
							{/* Mobile secondary navigation starts here */}
							<div className="flex flex-col border-t border-[#ebeff0] p-4">
								<div className="space-y-6 py-9 px-2">
									{secondaryNavigation.map((item) => (
										<button
											key={item.name}
											onClick={() =>
												handleNavClick(item.name, router, supabase)
											}
											className={classNames(
												item.current
													? "bg-presto-light-grey text-black"
													: "bg-white text-presto-grey hover:bg-presto-light-grey",
												"group flex w-full items-center rounded-xl px-6 py-3 font-Inter"
											)}
										>
											<item.icon
												className={classNames(
													item.current
														? "stroke-presto-green"
														: "stroke-[#A5DDD3]",
													"mr-3 h-6 w-6"
												)}
												aria-hidden="true"
											/>
											{item.name}
										</button>
									))}
								</div>
							</div>
						</Dialog.Panel>
					</Transition.Child>
					<div className="w-14 flex-shrink-0" aria-hidden="true">
						{/* Force sidebar to shrink to fit close icon */}
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
