export type PresetColor = { color: string; title: string };

export type Color = {
	type: "BASE" | "PRIMARY" | "ACCENT";
	name: string;
	hex: string;
};
