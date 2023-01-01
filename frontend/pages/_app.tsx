import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export type FormData = {
	name: string;
	industry: string;
};

export default function App({ Component, pageProps }: AppProps) {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		industry: ""
	});
	return (
		<Component {...pageProps} formData={formData} setFormData={setFormData} />
	);
}
