import { Bars3Icon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export const DesktopNavbar = ({}) => {
	const router = useRouter();
	const handleClick = () => router.push("/");

	return (
		<nav className="sticky top-0 z-50 hidden flex-wrap items-center justify-between bg-white py-5 px-7 shadow xl:flex">
			<img
				src="/logo.png"
				alt="PrestoKit Logo"
				className="h-7 cursor-pointer"
				onClick={handleClick}
			/>

			<Bars3Icon className="h-7 w-7" />
		</nav>
	);
};
