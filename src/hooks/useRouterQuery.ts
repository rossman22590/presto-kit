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
		let projectName: string = "";
		let projectDescription: string = "";

		if (name) {
			projectName = Array.isArray(name) ? name[0] : name;
			projectName = capitaliseWords(projectName);
		}
		if (description) {
			projectDescription = Array.isArray(description)
				? description[0]
				: description;
			projectDescription = capitaliseWords(projectDescription);
		}

		return { projectName, projectDescription };
	};

	const { projectName, projectDescription } = extractQueryStrings(
		name,
		description
	);

	return { projectName, projectDescription };
};
