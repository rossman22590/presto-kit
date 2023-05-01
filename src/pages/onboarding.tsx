import { useUploadStarterProject } from "../hooks/useUploadStarterProject";
import { ModalContainer } from "../components/Modals/ModalContainer";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Layout } from "../components/LandingLayout/Layout";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Form } from "../components/Forms/Form";
import { Auth } from "@supabase/auth-ui-react";
import { useRouter } from "next/router";
import { useState } from "react";
import type { NextPage } from "next";

const Onboarding: NextPage = ({}) => {
	const supabase = useSupabaseClient();
	const router = useRouter();

	const prevProgress = 0;
	const authProgress = 66;
	const [progress, setProgress] = useState(33);

	const [isAuthOpen, setIsAuthOpen] = useState(false);

	const handleAuth = () => {
		setProgress(authProgress);
		setIsAuthOpen(true);
	};

	useUploadStarterProject();

	return (
		<Layout prevProgress={prevProgress} progress={progress}>
			<section className="m-auto flex flex-grow flex-col items-center gap-8 pt-28 md:pt-40 lg:max-w-5xl">
				<Form
					type="ONBOARDING"
					buttonText="Continue"
					formId="description"
					route="starter-kits"
					heading="Describe your project in a few words"
					text="Knowing your niche will help us choose suitable styles, colors and fonts for your brand."
					placeholder="Organic Farm Shop, Halloween Store, Personal Finance App, Indy Music Platform... "
					handleAuth={handleAuth}
				/>
			</section>
			{isAuthOpen && (
				<ModalContainer
					open={isAuthOpen}
					setOpen={setIsAuthOpen}
					title="Almost there!"
					text="Sign up for a free account to generate, edit, save and export your custom UI kits."
				>
					<Auth
						supabaseClient={supabase}
						appearance={{ theme: ThemeSupa }}
						view="sign_up"
						providers={["facebook", "google", "twitter"]}
						socialLayout="horizontal"
						redirectTo={`http://localhost:3000/onboarding?name=${router.query.name}&description=${router.query.description}`}
					/>
				</ModalContainer>
			)}
		</Layout>
	);
};

export default Onboarding;
