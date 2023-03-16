import type { DynamicStylesheetsProps } from "../types/Props";
import { v4 as uuidv4 } from "uuid";
import { Fragment } from "react";
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
				<Fragment key={uuidv4()}>
					{weight ? (
						<link
							href={`https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&display=swap`}
							rel="stylesheet"
						/>
					) : (
						<link
							href={`https://fonts.googleapis.com/css2?family=${font}&display=swap`}
							rel="stylesheet"
						/>
					)}
				</Fragment>
			);
		});
	return <Head>{links}</Head>;
};
