import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { KitPreviewCardProps } from "../../types/Props";
import { classNames } from "../../utils/helpers";

export function KitPreviewCard({
	kitViewSelection,
	starterKit,
	i,
}: KitPreviewCardProps) {
	const { isFullKitView, isSelected, updateKitView, toggleFullKitView } =
		kitViewSelection;

	return (
		<div key={i} className="group flex w-[310px] select-none flex-col gap-4">
			<div className="flex gap-5">
				{/* Kit title */}
				<h1
					className={classNames(
						isFullKitView && isSelected("fullKit", i)
							? "border-presto-green"
							: isFullKitView
							? "border-white group-hover:border-presto-green-light"
							: "border-white hover:border-presto-green-light",
						"w-fit cursor-pointer rounded-xl border-[1px] bg-white px-5 py-3 text-lg font-medium"
					)}
					onClick={() => updateKitView("fullKit", i)}
				>
					<span className="text-[#AAB2C6]">{`0${starterKit.id} `}</span>
					{starterKit.title}
				</h1>

				{/* Toggle lock icon */}
				<button
					className="hover:text-fuchsia-500"
					onClick={() => toggleFullKitView(i)}
				>
					{isFullKitView && isSelected("fullKit", i) && (
						<LockClosedIcon className="w-7 stroke-presto-green" />
					)}
					{!isFullKitView && (
						<LockOpenIcon className="w-7 translate-x-[3.5px] stroke-[#BCC5D9]" />
					)}
				</button>
			</div>

			{/* Color card */}
			<div
				className={classNames(
					isSelected("fullKit", i) || isSelected("color", i)
						? "border-presto-green"
						: isFullKitView
						? "border-white group-hover:border-presto-green-light"
						: "border-white hover:border-presto-green-light",
					"flex cursor-pointer flex-col gap-5 rounded-xl border-[1px] bg-white p-8"
				)}
				onClick={() =>
					isFullKitView
						? updateKitView("fullKit", i)
						: updateKitView("color", i)
				}
			>
				{starterKit.colors.details.map((color, i) => (
					<div className="flex items-center gap-4 text-base" key={i}>
						<div
							className="aspect-square h-14 rounded-md"
							style={{
								backgroundColor: color.hex,
							}}
						>
							&nbsp;
						</div>
						<div className="flex flex-col gap-[2px]">
							<p className="font-medium">{color.name}</p>
							<p className="tracking-wide text-[#AAB2C6]">{color.hex}</p>
						</div>
					</div>
				))}
			</div>

			{/* Display font card */}
			<div
				className={classNames(
					isSelected("fullKit", i) || isSelected("displayFont", i)
						? "border-presto-green"
						: isFullKitView
						? "border-white group-hover:border-presto-green-light"
						: "border-white hover:border-presto-green-light",
					"cursor-pointer rounded-xl border-[1px] bg-white px-8 py-5 text-xl text-[#343b45]"
				)}
				style={{
					fontFamily: starterKit.typography.typefaces.display.font,
				}}
				onClick={() =>
					isFullKitView
						? updateKitView("fullKit", i)
						: updateKitView("displayFont", i)
				}
			>
				{starterKit.typography.typefaces.display.font}{" "}
				{starterKit.typography.typefaces.display.weight} Display
			</div>

			{/* Text font card */}
			<div
				className={classNames(
					isSelected("fullKit", i) || isSelected("textFont", i)
						? "border-presto-green"
						: isFullKitView
						? "border-white group-hover:border-presto-green-light"
						: "border-white hover:border-presto-green-light",
					"cursor-pointer rounded-xl border-[1px] bg-white px-8 py-5 text-lg text-[#343b45] subpixel-antialiased "
				)}
				style={{
					fontFamily: starterKit.typography.typefaces.text.font,
				}}
				onClick={() =>
					isFullKitView
						? updateKitView("fullKit", i)
						: updateKitView("textFont", i)
				}
			>
				{starterKit.typography.typefaces.text.font}{" "}
				{starterKit.typography.typefaces.text.weight} Text
			</div>
		</div>
	);
}
