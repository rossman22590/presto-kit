import Select, { components, ActionMeta } from "react-select";
import { FixedSizeList as List } from "react-window";
import { CSSProperties, useEffect } from "react";
import type { OptionType, ValueType } from "../../types/Fonts";
import type { FontSelectProps } from "../../types/Props";
import {
	moveLoadedFontToTop,
	findClosestWeight,
	updateLoadedFonts,
	loadFont,
} from "../../utils/helpers";

export const FontSelect = ({
	fonts,
	setFonts,
	loadedFonts,
	setLoadedFonts,
	selectedFont,
	setSelectedFont,
	selectedWeight,
	setSelectedWeight,
}: FontSelectProps) => {
	const isFontLoaded = loadedFonts[selectedFont] !== undefined;
	const isWeightAvailable =
		isFontLoaded && loadedFonts[selectedFont].weights.includes(selectedWeight);
	const shouldLoadFont = !isFontLoaded || !isWeightAvailable;

	useEffect(() => {
		if (selectedFont && selectedWeight && shouldLoadFont) {
			loadFont(selectedFont, selectedWeight);

			const newFontsList = moveLoadedFontToTop(selectedFont, fonts);
			setFonts(newFontsList);

			const newLoadedFonts = updateLoadedFonts(
				selectedFont,
				selectedWeight,
				loadedFonts,
				isFontLoaded
			);
			setLoadedFonts(newLoadedFonts);
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
			const newFont = option.value;
			const closestWeight = findClosestWeight(newFont, fonts, selectedWeight);

			setSelectedFont(newFont);
			setSelectedWeight(closestWeight);
		}
	};

	const FontOption = (props: any) => {
		const { data, selectedWeight } = props;
		const font = data.value;

		useEffect(() => {
			const closestWeight = findClosestWeight(font, fonts, selectedWeight);
			const previewText = font.split(" ").join("");

			loadFont(font, closestWeight, previewText);
		}, [font, selectedWeight]);

		return (
			<components.Option {...props}>
				<div style={{ fontFamily: font, fontWeight: selectedWeight }}>
					{data.label}
				</div>
			</components.Option>
		);
	};

	const FontsList = (props: any) => {
		const { children, maxHeight } = props;
		return (
			<List
				height={maxHeight}
				itemCount={children.length}
				itemSize={35}
				width="100%"
			>
				{({ index, style }: { index: number; style: CSSProperties }) => (
					<div style={style}>
						<FontOption
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
			components={{ Option: FontOption, MenuList: FontsList }}
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
