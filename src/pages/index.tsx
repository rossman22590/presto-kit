import { DisplayText } from "../components/Headings/DisplayText";
import { useSession } from "@supabase/auth-helpers-react";
import { Layout } from "../components/LandingLayout/Layout";
import { Form } from "../components/Forms/Form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { NextPage } from "next";

const Home: NextPage = ({}) => {
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) router.push("/account");
	}, [session]);

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
					placeholder="Enter your project name here..."
					buttonText="Get Started"
					formId="name"
					route="onboarding"
				/>
			</section>
		</Layout>
	);
};

export default Home;
