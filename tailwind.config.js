/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"presto-grey": "#525A70",
				"presto-green": "#4ABCA7",
				"presto-light-grey": "#F5F7FB",
			},
			fontFamily: {
				Inter: ["Inter", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require("tailwind-filter-utilities")],
};
