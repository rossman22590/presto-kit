import type { NextPage } from "next";
import { Layout } from "../components/LandingLayout/Layout";
import { Form } from "../components/Forms/Form";

const Onboarding: NextPage = ({}) => {
	return (
		<Layout prevProgress={0} progress={33}>
			<section className="m-auto flex flex-grow flex-col items-center gap-8 pt-28 md:pt-40 lg:max-w-5xl">
				<Form
					type="ONBOARDING"
					buttonText="Continue"
					formId="description"
					submitRoute="starter-kits"
					heading="Describe your brand in a few words"
					text="Knowing your niche will help us choose suitable styles, colors and fonts for your brand."
					placeholder="Organic Farm Shop, Halloween Store, Personal Finance App, Indy Music Platform... "
				/>
			</section>
		</Layout>
	);
};

export default Onboarding;
