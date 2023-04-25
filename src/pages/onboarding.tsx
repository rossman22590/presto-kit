import { ModalContainer } from "../components/Modals/ModalContainer";
import { Layout } from "../components/LandingLayout/Layout";
import { useRouterQuery } from "../hooks/useRouterQuery";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Form } from "../components/Forms/Form";
import { Auth } from "@supabase/auth-ui-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import {
	User,
	useSession,
	useSupabaseClient,
	useUser,
} from "@supabase/auth-helpers-react";

import type { Database } from "../types/supabase";
type Projects = Database["public"]["Tables"]["projects"]["Row"];

const Onboarding: NextPage = ({}) => {
	const supabase = useSupabaseClient();
	const session = useSession();
	const router = useRouter();
	const user = useUser();

	const prevProgress = 0;
	const authProgress = 66;
	const [progress, setProgress] = useState(33);

	const [isAuthOpen, setIsAuthOpen] = useState(false);
	const [loading, setLoading] = useState(true);

	const handleAuth = () => {
		setProgress(authProgress);
		setIsAuthOpen(true);
	};

	useEffect(() => {
		if (session) {
			const { brandName: name, brandDescription: description } =
				useRouterQuery(router);
			uploadProject({ user, name, description });
			router.push("/starter-kits");
		}
	}, [session]);

	const uploadProject = async ({
		user,
		name,
		description,
	}: {
		user: User | null;
		name: Projects["name"];
		description: Projects["description"];
	}) => {
		try {
			setLoading(true);
			if (!user) throw new Error("No user at upload project");

			const updates = {
				user_id: user.id,
				name,
				description,
			};

			let { error } = await supabase
				.from("projects")
				.insert(updates)
				.eq("user_id", user.id);
			if (error) throw error;

			console.log("Project inserted!");
		} catch (error) {
			alert("Error inserting the data!");
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Layout prevProgress={prevProgress} progress={progress}>
			<section className="m-auto flex flex-grow flex-col items-center gap-8 pt-28 md:pt-40 lg:max-w-5xl">
				<Form
					type="ONBOARDING"
					buttonText="Continue"
					formId="description"
					route="starter-kits"
					heading="Describe your brand in a few words"
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
