import type { NextPage } from "next";
import { DisplayText } from "../components/DisplayText";
import { Layout } from "../components/Layout";
import { Form } from "../components/Form";

const Home: NextPage = ({}) => {
	return (
		<Layout>
			<section className="m-auto flex max-w-5xl flex-col items-center gap-8 pb-56">
				<DisplayText
					heading="Effortlessly create your own brand kit in seconds"
					text="Use our AI-powered tool to start building a unique visual identity for
				your project"
				/>
				<Form
					placeholder="Enter your brand name here..."
					buttonText="Get Started"
					formId="name"
					submitRoute="industry"
				/>
			</section>
		</Layout>
	);
};

export default Home;
