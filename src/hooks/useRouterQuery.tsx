import type { NextRouter } from "next/router";

export const useRouterQuery = (router: NextRouter) => {
	let { name, description } = router.query;

	const capitaliseWords = (str: string) => {
		return str?.replace(/\b[a-z]/gi, (char) => char.toUpperCase());
	};

	const extractQueryStrings = (
		name: string | string[] | undefined,
		description: string | string[] | undefined
	) => {
		let brandName: string = "";
		let brandDescription: string = "";

		if (name) {
			brandName = Array.isArray(name) ? name[0] : name;
			brandName = capitaliseWords(brandName);
		}
		if (description) {
			brandDescription = Array.isArray(description)
				? description[0]
				: description;
			brandDescription = capitaliseWords(brandDescription);
		}

		return { brandName, brandDescription };
	};

	const { brandName, brandDescription } = extractQueryStrings(
		name,
		description
	);

	return { brandName, brandDescription };
};
