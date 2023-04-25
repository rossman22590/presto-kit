export const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(" ");
};

export const getColorCategory = (index: number) => {
	switch (index) {
		case 0:
			return "BASE";
		case 1:
			return "PRIMARY";
		case 2:
			return "ACCENT";
		default:
			throw new Error("Invalid index for color category");
	}
};
