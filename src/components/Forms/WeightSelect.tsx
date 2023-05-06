import type { WeightSelectProps } from "../../types/Props";
import { findAvailableWeights } from "../../utils/helpers";
import Select, { components } from "react-select";
import { useEffect, useState } from "react";

export const WeightSelect = ({
	fonts,
	selectedFont,
	setSelectedFont,
	selectedWeight,
	setSelectedWeight,
	initialFont,
}: WeightSelectProps) => {
	const [weights, setWeights] = useState<string[]>([]);

	useEffect(() => {
		const fontWeights = findAvailableWeights(selectedFont, fonts);

		if (initialFont && !selectedFont) {
			setSelectedFont(initialFont);
		}
		setWeights(fontWeights);
	}, [selectedFont, fonts]);

	const weightOptions = weights.map((weight) => ({
		value: weight,
		label: weight,
	}));

	const changeWeight = (option: any) => {
		if (option) {
			setSelectedWeight(option.value);
		}
	};

	const WeightOption = (props: any) => {
		const { data } = props;
		const weight = data.value;

		return (
			<components.Option {...props}>
				<div style={{ fontWeight: weight }}>{data.label}</div>
			</components.Option>
		);
	};

	return (
		<Select
			className="w-[160px]"
			options={weightOptions}
			value={{ value: selectedWeight, label: selectedWeight }}
			onChange={changeWeight}
			components={{ Option: WeightOption }}
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
					borderRadius: "0 12px 12px 0",
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
