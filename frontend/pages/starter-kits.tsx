import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Container from "./../components/Container";

//? refactored form data to be captured through queries to prevent losing data (state) on manual page refresh
//? is formData state still useful ? - leaving it in place for now
import { FormData } from "./_app";

export type StarterKitsProps = {
	formData: FormData;
};

const StarterKits: NextPage<StarterKitsProps> = ({ formData }) => {
	const router = useRouter();
	// const { name, industry } = formData;
	const { name, industry } = router.query;
	return (
		<Layout>
			<Container>
				<h1> {name} </h1>
				<h2> {industry} </h2>
			</Container>
		</Layout>
	);
};

export default StarterKits;
