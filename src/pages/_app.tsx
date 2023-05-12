import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import store from "src/store/store";
import { useState } from "react";
import type { Database } from "@types";
import "../styles/globals.css";

function MyApp({
	Component,
	pageProps,
}: AppProps<{
	initialSession: Session;
}>) {
	const [supabase] = useState(() => createBrowserSupabaseClient<Database>());

	return (
		<SessionContextProvider
			supabaseClient={supabase}
			initialSession={pageProps.initialSession}
		>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</SessionContextProvider>
	);
}
export default MyApp;
