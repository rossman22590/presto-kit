import DisplayText from "../components/DisplayText";
import type { NextPage } from "next";
import { FormData } from "./_app";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Form from "../components/Form";

type IndustryProps = {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const Industry: NextPage<IndustryProps> = ({ formData, setFormData }) => {
	return (
		<Layout>
			<Container gap="2rem" maxWidth="1080px">
				<DisplayText
					heading="Pick your industry or niche"
					text="Knowing your industry will help us choose suitable styles for your brand"
				/>
				<Form
					placeholder="Tech, Restaurant, Finance..."
					buttonText="Get Started"
					formData={formData}
					setFormData={setFormData}
					formDataKey="industry"
					submitRoute="starter-kits"
				/>
			</Container>
		</Layout>
	);
};

export default Industry;
