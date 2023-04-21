import type { KitProgressCardProps } from "../../types/Props";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export const KitProgressCard = ({
	starterKits,
	kitNumber,
	isGenerating,
	isComplete,
}: KitProgressCardProps) => {
	if (isGenerating) {
		return (
			<div className="flex h-[62px] w-[164px] items-center justify-center rounded-md border-2 border-presto-green">
				<div className="flex translate-x-[6px] items-center justify-center gap-3">
					<p className="text-xl font-medium text-presto-grey">
						Kit {kitNumber}
					</p>
					<img
						src="/loading-icon.png"
						alt="Loading Icon"
						className="h-10 w-10 animate-spin"
					/>
				</div>
			</div>
		);
	}

	if (isComplete) {
		return (
			<div className="flex h-[62px] w-[164px] items-center justify-center rounded-md border-[1px] border-[#e1e4e6]">
				<div className="flex translate-x-[2px] items-center justify-center gap-[6px]">
					<div className="flex items-center justify-center gap-1">
						{starterKits[kitNumber - 1].colors.details.map((color, i) => (
							<div
								key={i}
								className="h-6 w-6 rounded"
								style={{ backgroundColor: `${color.hex}` }}
							/>
						))}
					</div>
					<CheckCircleIcon className="h-10 w-10 stroke-presto-green stroke-[1.3px]" />
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-[62px] w-[164px] items-center justify-center rounded-md border-[1px] border-[#e1e4e6]">
			<p className="text-xl font-medium text-[#ccd7d9]">Kit {kitNumber}</p>
		</div>
	);
};
