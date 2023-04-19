/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"presto-green": "#4ABCA7",
				"presto-green-light": "#C2E5E2",
				"presto-grey": "#525A70",
				"presto-light-grey": "#F5F7FB",
				"presto-text-grey": "#9198A5",
			},
			fontFamily: {
				Inter: ["Inter", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require("tailwind-filter-utilities")],
};
