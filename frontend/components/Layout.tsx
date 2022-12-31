import Head from "next/head";
import Navbar from "./Navbar";

type LayoutProps = React.PropsWithChildren<{
	title?: string;
	description?: string;
	className?: string;
}>;

const Layout: React.FC<LayoutProps> = ({
	children,
	title = "PrestoKit",
	description = "AI generated brand kits"
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<main>{children}</main>
			{/* <Footer /> */}
		</>
	);
};

export default Layout;
