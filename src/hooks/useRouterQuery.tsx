import type { NextRouter } from "next/router";

export const useRouterQuery = (router: NextRouter) => {
	let { name, industry } = router.query;

	const capitaliseWords = (str: string) => {
		return str?.replace(/\b[a-z]/gi, (char) => char.toUpperCase());
	};

	const extractQueryStrings = (
		name: string | string[] | undefined,
		industry: string | string[] | undefined
	) => {
		let brandName: string = "Brand Name";
		let brandDescription: string = "New Brand";

		if (name) {
			brandName = Array.isArray(name) ? name[0] : name;
			brandName = capitaliseWords(brandName);
		}
		if (industry) {
			brandDescription = Array.isArray(industry) ? industry[0] : industry;
			brandDescription = brandDescription;
		}

		return { brandName, brandDescription };
	};

	const { brandName, brandDescription } = extractQueryStrings(name, industry);

	return { brandName, brandDescription };
};
