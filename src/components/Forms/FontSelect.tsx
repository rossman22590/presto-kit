import type { Font, OptionType, ValueType } from "../../types/Fonts";
import type { FontSelectProps } from "../../types/Props";
import Select, { components, ActionMeta } from "react-select";
import { FixedSizeList as List } from "react-window";
import { useEffect, useState } from "react";
import WebFont from "webfontloader";

const FontSelect = ({ selectedFont, setSelectedFont }: FontSelectProps) => {
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY || "";
	const [fonts, setFonts] = useState<Font[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`
				);
				const data = await response.json();
				setFonts(data.items);
				setSelectedFont(data.items[0].family);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	useEffect(() => {
		if (selectedFont) {
			WebFont.load({
				google: {
					families: [`${selectedFont}:regular`],
				},
			});
		}
	}, [selectedFont]);

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
		}
	};

	const Option = (props: any) => {
		const { data } = props;
		const font = data.value;

		const text = font.replace(/[^\w\s]/gi, "");

		useEffect(() => {
			WebFont.load({
				google: {
					families: [`${font}:regular&text=${encodeURIComponent(text)}`],
				},
			});
		}, [font, text]);

		return (
			<components.Option {...props} style={{ fontFamily: font }}>
				<div style={{ fontFamily: font }}>{data.label}</div>
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
						<Option {...children[index].props} />
					</div>
				)}
			</List>
		);
	};

	return (
		// ts-ignore
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
				}),
				control: (base) => ({
					...base,
					border: "none",
					boxShadow: "none",
					fontSize: "26px",
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
