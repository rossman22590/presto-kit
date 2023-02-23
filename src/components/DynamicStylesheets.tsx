import type { DynamicStylesheetsProps } from "../types/Props";
import Head from "next/head";

export const DynamicStylesheets = ({
	starterKits,
}: DynamicStylesheetsProps) => {
	const links = starterKits
		.flatMap(({ typography: { typefaces } }) => [
			{ font: typefaces.display.font, weight: typefaces.display.weight },
			{ font: typefaces.text.font, weight: typefaces.text.weight },
		])
		.map(({ font, weight }) => {
			return (
				<>
					{weight ? (
						<link
							key={`${font}-${weight}`}
							href={`https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&display=swap`}
							rel="stylesheet"
						/>
					) : (
						<link
							key={`${font}`}
							href={`https://fonts.googleapis.com/css2?family=${font}&display=swap`}
							rel="stylesheet"
						/>
					)}
				</>
			);
		});
	return <Head>{links}</Head>;
};
