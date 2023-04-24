import { DisplayText } from "../components/Headings/DisplayText";
import { Layout } from "../components/LandingLayout/Layout";
import { Form } from "../components/Forms/Form";
import type { NextPage } from "next";

const Home: NextPage = ({}) => {
	return (
		<Layout>
			<section className="m-auto flex w-full flex-grow flex-col items-center gap-6 pt-28 md:justify-center md:gap-8 md:pb-20 md:pt-0">
				<DisplayText
					heading="Effortlessly create your own UI kit in seconds"
					text="Use our AI-powered tool to start building a unique visual identity for
				your project"
					type="MAIN"
				/>
				<Form
					type="SIMPLE"
					placeholder="Enter your brand name here..."
					buttonText="Get Started"
					formId="name"
					route="onboarding"
				/>
			</section>
		</Layout>
	);
};

export default Home;
