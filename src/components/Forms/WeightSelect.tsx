import type { WeightSelectProps } from "../../types/Props";
import Select, { components } from "react-select";
import { useEffect, useState } from "react";

const WeightSelect = ({
	fonts,
	selectedFont,
	selectedWeight,
	setSelectedWeight,
}: WeightSelectProps) => {
	const [weights, setWeights] = useState<string[]>([]);

	useEffect(() => {
		const fontItem = fonts.find((f) => f.family === selectedFont);

		if (fontItem) {
			const filteredVariants = fontItem.variants.filter(
				(variant) => !variant.includes("italic")
			);

			const weightOptions = filteredVariants.map((variant) =>
				variant === "regular" ? "400" : variant.replace(/\D/g, "")
			);

			setWeights(weightOptions);
		}
	}, [selectedFont]);

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

export default WeightSelect;
