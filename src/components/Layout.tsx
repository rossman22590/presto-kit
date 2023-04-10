import type { LayoutProps } from "../types/Props";
import { Navbar } from "./Navbar";
import Head from "next/head";

export const Layout = ({
	children,
	title = "PrestoKit",
	description = "AI generated brand kits",
}: LayoutProps) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="flex min-h-screen flex-col">
				<Navbar />
				<main className="flex flex-grow flex-col">{children}</main>
			</div>
		</>
	);
};
