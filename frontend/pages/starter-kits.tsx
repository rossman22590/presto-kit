import type { NextPage } from "next";
import { FormData } from "./_app";
import Layout from "../components/Layout";
import Container from "./../components/Container";

export type StarterKitsProps = {
	formData: FormData;
};

const StarterKits: NextPage<StarterKitsProps> = ({ formData }) => {
	const { name, industry } = formData;
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
