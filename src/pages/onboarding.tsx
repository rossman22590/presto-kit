import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { Form } from "../components/Form";

const Onboarding: NextPage = ({}) => {
	return (
		<Layout>
			<section className="m-auto flex max-w-5xl flex-grow flex-col items-center gap-8 pt-40">
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
