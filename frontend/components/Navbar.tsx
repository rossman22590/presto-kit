import React from "react";

const Navbar = () => {
	return (
		<nav className="flex items-center justify-between flex-wrap bg-background-white p-6 shadow pl-8 pr-8">
			<img src="/logo.png" alt="PrestoKit Logo" className="h-8" />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="h-8"
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

export default Navbar;
