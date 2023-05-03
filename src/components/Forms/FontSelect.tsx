import { findClosestWeight, loadFont } from "../../utils/helpers";
import Select, { components, ActionMeta } from "react-select";
import { FixedSizeList as List } from "react-window";
import { CSSProperties, useEffect } from "react";
import type { OptionType, ValueType } from "../../types/Fonts";
import type { FontSelectProps } from "../../types/Props";

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

			const closestWeight = findClosestWeight(newFont, +selectedWeight);

			setSelectedWeight(closestWeight);
		}
	};

	useEffect(() => {
		if (
			selectedFont &&
			selectedWeight &&
			// Only load the selected font/weight combo if it hasn't been loaded yet
			(!isFontLoaded || !isWeightAvailable)
		) {
			loadFont(selectedFont, selectedWeight);

			// Move newly loaded font to the top of the options list
			const selectedIndex = fonts.findIndex(
				(item) => item.family === selectedFont
			);
			const newFonts = [
				fonts[selectedIndex],
				...fonts.slice(0, selectedIndex),
				...fonts.slice(selectedIndex + 1),
			];
			setFonts(newFonts);

			// Update the loadedFonts state
			const updatedLoadedFonts = { ...loadedFonts };

			if (isFontLoaded) {
				updatedLoadedFonts[selectedFont].weights = [
					...updatedLoadedFonts[selectedFont].weights,
					selectedWeight,
				];
			} else {
				updatedLoadedFonts[selectedFont] = {
					loaded: true,
					weights: [selectedWeight],
				};
			}
			setLoadedFonts(updatedLoadedFonts);
		}
	}, [selectedFont, selectedWeight]);

	// Option item component
	const Option = (props: any) => {
		const { data, selectedWeight } = props;
		const font = data.value;

		const fontNameCharacters = font.replace(/[^\w\s]/gi, "");

		useEffect(() => {
			const newFont = fonts.find((f) => f.family === font);

			const closestWeight = findClosestWeight(newFont, +selectedWeight);

			loadFont(font, closestWeight, fontNameCharacters);
		}, [font, fontNameCharacters, selectedWeight]);

		return (
			<components.Option {...props}>
				<div style={{ fontFamily: font, fontWeight: selectedWeight }}>
					{data.label}
				</div>
			</components.Option>
		);
	};

	// Options list component
	const MenuList = (props: any) => {
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
