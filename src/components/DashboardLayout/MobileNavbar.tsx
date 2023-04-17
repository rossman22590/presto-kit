import type { MobileNavbarProps } from "../../types/Props";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export const MobileNavbar = ({ setSidebarOpen }: MobileNavbarProps) => {
	const router = useRouter();
	const handleClick = () => router.push("/");

	return (
		<div className="lg:hidden">
			<div className="flex items-center justify-between bg-white p-4 shadow">
				<img
					src="/logo.png"
					alt="PrestoKit Logo"
					className="h-7"
					onClick={handleClick}
				/>
				<button
					type="button"
					className="inline-flex items-center justify-center rounded-md"
					onClick={() => setSidebarOpen(true)}
				>
					<Bars3Icon className="h-7 w-7" aria-hidden="true" />
				</button>
			</div>
		</div>
	);
};

export default MobileNavbar;
