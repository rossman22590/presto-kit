type UseColorBrightness = (hex: string) => {
	isColorBright: (rgb: { red: number; green: number; blue: number }) => boolean;
	accentColorRGB: { red: number; green: number; blue: number };
};

export const useColorBrightness: UseColorBrightness = (hex) => {
	const convertHexToRGB = (hex: string) => {
		const red = parseInt(hex.slice(1, 3), 16);
		const green = parseInt(hex.slice(3, 5), 16);
		const blue = parseInt(hex.slice(5, 7), 16);
		return { red, green, blue };
	};
	const isColorBright = (rgb: { red: number; green: number; blue: number }) => {
		return rgb.red * 0.299 + rgb.green * 0.587 + rgb.blue * 0.114 > 185;
	};
	const accentColorRGB = convertHexToRGB(hex);

	return { isColorBright, accentColorRGB };
};
