import { useRouter } from "next/router";

export const Navbar = () => {
	const router = useRouter();

	const handleClick = () => router.push("/");

	return (
		<nav className="fixed top-0 left-0 z-50 flex w-full cursor-pointer flex-wrap items-center justify-between bg-white bg-opacity-70 p-4 shadow bg-blur-xl md:py-5 md:px-7">
			<img
				src="/logo.png"
				alt="PrestoKit Logo"
				className="h-7"
				onClick={handleClick}
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="h-7"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		</nav>
	);
};
