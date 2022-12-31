import Head from "next/head";

type LayoutProps = React.PropsWithChildren<{
	title?: string;
	description?: string;
	className?: string;
}>;

const Layout: React.FC<LayoutProps> = ({
	children,
	title = "PrestoKit",
	description = "AI generated brand kits",
	className = "bg-slate-900 min-h-screen"
}) => {
	return (
		<div className={className}>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{/* <Navbar /> */}
			<main>{children}</main>
			{/* <Footer /> */}
		</div>
	);
};

export default Layout;
