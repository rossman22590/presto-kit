import type { GoogleApiFont, OptionType, ValueType } from "../../types/Fonts";
import Select, { components, ActionMeta } from "react-select";
import { FixedSizeList as List } from "react-window";
import { useEffect } from "react";
import WebFont from "webfontloader";
import {
	findClosestAvailableWeight,
	findClosestWeight,
} from "../../utils/helpers";

export type FontSelectProps = {
	fonts: GoogleApiFont[];
	setFonts: (fonts: GoogleApiFont[]) => void;
	selectedFont: string;
	setSelectedFont: (font: string) => void;
	selectedWeight: string;
	setSelectedWeight: (weight: string) => void;
};

const FontSelect = ({
	fonts,
	setFonts,
	selectedFont,
	setSelectedFont,
	selectedWeight,
	setSelectedWeight,
}: FontSelectProps) => {
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY || "";

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`
				);
				const data = await response.json();
				setFonts(data.items);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	useEffect(() => {
		if (selectedFont && selectedWeight) {
			WebFont.load({
				google: {
					families: [`${selectedFont}:${selectedWeight}`],
				},
			});
		}
	}, [selectedFont, selectedWeight]);

	const fontOptions = fonts.map((font) => ({
		value: font.family,
		label: font.family,
	}));

	const changeFont = (
		option: ValueType,
		_actionMeta: ActionMeta<OptionType>
	) => {
		if (option) {
			setSelectedFont(option.value);

			const newFont = fonts.find((font) => font.family === option.value);
			if (newFont) {
				const availableWeights = newFont.variants
					.filter((variant) => !variant.includes("italic"))
					.map((variant) => (variant === "regular" ? "400" : variant))
					.map((variant) => parseInt(variant, 10));

				const closestWeight = findClosestWeight(
					availableWeights,
					parseInt(selectedWeight, 10)
				);
				setSelectedWeight(closestWeight.toString());
			}
		}
	};

	const Option = (props: any) => {
		const { data, selectedWeight } = props;
		const font = data.value;

		const text = font.replace(/[^\w\s]/gi, "");

		useEffect(() => {
			const newFont = fonts.find((f) => f.family === font);
			const closestWeight = newFont
				? findClosestAvailableWeight(newFont, parseInt(selectedWeight, 10))
				: "regular";

			WebFont.load({
				google: {
					families: [
						`${font}:${closestWeight}&text=${encodeURIComponent(text)}`,
					],
				},
			});
		}, [font, text, selectedWeight]);

		return (
			<components.Option {...props}>
				<div style={{ fontFamily: font, fontWeight: selectedWeight }}>
					{data.label}
				</div>
			</components.Option>
		);
	};

	const MenuList = (props: any) => {
		const { children, maxHeight } = props;
		const height = 35;

		const getItemSize = () => height;

		return (
			<List
				height={maxHeight}
				itemCount={children.length}
				itemSize={getItemSize()}
				width="100%"
			>
				{({ index, style }: { index: number; style: React.CSSProperties }) => (
					<div style={style}>
						<Option
							{...children[index].props}
							selectedWeight={selectedWeight}
						/>
					</div>
				)}
			</List>
		);
	};

	return (
		<Select
			className="w-[320px]"
			options={fontOptions}
			value={{ value: selectedFont, label: selectedFont }}
			onChange={changeFont}
			components={{ Option, MenuList }}
			styles={{
				singleValue: (base) => ({
					...base,
					fontFamily: selectedFont,
					fontWeight: selectedWeight,
				}),
				control: (base) => ({
					...base,
					border: "none",
					boxShadow: "none",
					fontSize: "24px",
					padding: "12px 20px",
					borderRadius: "12px 0 0 12px",
					cursor: "pointer",
				}),
				menu: (base) => ({
					...base,
					border: "none",
					boxShadow: "none",
					borderRadius: "12px",
					overflow: "hidden",
				}),
				indicatorSeparator: (base) => ({
					...base,
					display: "none",
				}),
				option: (base, state) => ({
					...base,
					cursor: "pointer",
					backgroundColor: state.isSelected
						? "#AAB1C0"
						: state.isFocused
						? "#E5EAF2"
						: "#fff",
				}),
			}}
		/>
	);
};

export default FontSelect;
