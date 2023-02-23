import type { DynamicStylesheetsProps } from "../types/Props";
import Head from "next/head";

export const DynamicStylesheets = ({
	starterKits,
}: DynamicStylesheetsProps) => {
	return (
		<Head>
			<link
				href={`https://fonts.googleapis.com/css2?family=${starterKits[0].typography.typefaces.display.font}&display=swap`}
				rel="stylesheet"
			></link>
			<link
				href={`https://fonts.googleapis.com/css2?family=${starterKits[0].typography.typefaces.text.font}&display=swap`}
				rel="stylesheet"
			></link>
			<link
				href={`https://fonts.googleapis.com/css2?family=${starterKits[1].typography.typefaces.display.font}&display=swap`}
				rel="stylesheet"
			></link>
			<link
				href={`https://fonts.googleapis.com/css2?family=${starterKits[1].typography.typefaces.text.font}&display=swap`}
				rel="stylesheet"
			></link>
			<link
				href={`https://fonts.googleapis.com/css2?family=${starterKits[2].typography.typefaces.display.font}&display=swap`}
				rel="stylesheet"
			></link>
			<link
				href={`https://fonts.googleapis.com/css2?family=${starterKits[2].typography.typefaces.text.font}&display=swap`}
				rel="stylesheet"
			></link>
		</Head>
	);
};
