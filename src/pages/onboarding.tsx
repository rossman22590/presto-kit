import type { NextPage } from "next";
import { DisplayText } from "../components/DisplayText";
import { Layout } from "../components/Layout";
import { Form } from "../components/Form";

const Onboarding: NextPage = ({}) => {
	return (
		<Layout>
			<section className="m-auto flex max-w-5xl flex-col items-center gap-8 pb-56">
				<DisplayText
					heading="Describe your brand in a few words"
					text="Knowing your niche will help us choose suitable styles for your brand"
				/>
				<Form
					placeholder="Halloween Store, Personal Finance App, Indy Music Platform... "
					buttonText="Get Started"
					formId="onboarding"
					submitRoute="starter-kits"
				/>
			</section>
		</Layout>
	);
};

export default Onboarding;
