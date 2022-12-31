import type { NextPage } from "next";
import Layout from "../components/Layout";

const Home: NextPage = () => {
	return (
		<Layout>
			<h1 className="text-slate-300 text-8xl font-mono">Hello World</h1>
		</Layout>
	);
};

export default Home;
