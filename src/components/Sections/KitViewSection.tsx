import { useColorBrightness } from "../../hooks/useColorBrightness";
import { useSelectedKit } from "../../hooks/useKits";
import { KitViewSelection, SelectedKitView } from "../../types/Kits";
import { DisplayText } from "../Headings/DisplayText";
import {
	ArrowRightIcon,
	Bars3Icon,
	CubeTransparentIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";

type KitViewSelectionProps = {
	selectedKitView: SelectedKitView;
	brandName: string;
};

export const KitViewSection = ({
	selectedKitView,
	brandName,
}: KitViewSelectionProps) => {
	const { baseColor, primaryColor, accentColor, displayFont, textFont } =
		useSelectedKit(selectedKitView);

	const { isColorBright, accentColorRGB } = useColorBrightness(accentColor);

	return (
		<section className="m-auto my-12 flex max-w-5xl flex-col items-center gap-12 py-6">
			<DisplayText
				heading="Kit Preview"
				text="When you are ready, click continue to make changes, save and download your custom UI Kit"
				type="DASHBOARD"
				buttonText="Continue"
			/>

			<div className="flex aspect-[3.1/2] w-full flex-col rounded-xl border-4 border-white bg-white">
				{/* Mockup top bar */}
				<div className="flex h-7 w-full items-center justify-start gap-[7px]  rounded-t-lg bg-white pl-2">
					{/* Mockup window controls */}
					{Array(3)
						.fill(0)
						.map((_, i) => (
							<div
								className="aspect-square w-[11px] -translate-y-[2px] rounded-full bg-[#f0f2f7]"
								key={i}
							></div>
						))}
				</div>
				{/* Mockup viewport wrapper */}
				<div
					className="flex w-full grow flex-col justify-between rounded-b-lg"
					style={{
						backgroundColor: baseColor,
					}}
				>
					{/* Navbar */}
					<div className="relative flex w-full justify-between py-5 px-6">
						{/* Logomark */}
						<div className="flex items-center gap-2">
							<CubeTransparentIcon
								className="h-7"
								style={{
									color: accentColor,
								}}
							/>
							<h3
								className="text-lg"
								style={{
									color: primaryColor,
									fontFamily: displayFont,
								}}
							>
								{brandName}
							</h3>
						</div>
						{/* Nav menu */}
						<div
							className="absolute left-0 top-0 bottom-0 right-0 m-auto flex items-center justify-center gap-10 text-center text-sm font-light subpixel-antialiased"
							style={{
								color: primaryColor,
								fontFamily: textFont,
							}}
						>
							<p>Home</p>
							<p>About</p>
							<p>Contact</p>
						</div>
						{/* Hamburger profile */}
						<div className="flex items-center gap-3">
							<Bars3Icon
								className="w-7"
								style={{
									color: primaryColor,
								}}
							/>
							<UserCircleIcon
								className="w-7"
								style={{
									color: primaryColor,
								}}
							/>
						</div>
					</div>
					{/* Hero wrapper */}
					<div className="flex -translate-y-8 flex-col items-center gap-8">
						{/* Hero top link */}
						<div
							className="flex w-fit items-center justify-center gap-1 rounded-full border-[1px] py-2 px-7"
							style={{
								borderColor: `${accentColor}40`,
							}}
						>
							<p
								className="text-sm"
								style={{
									color: primaryColor,
								}}
							>
								Lorem ipsum dolor{" "}
								<span
									className="font-bold"
									style={{
										color: accentColor,
									}}
								>
									sit amet
								</span>
							</p>
							<ArrowRightIcon
								className="w-4"
								style={{
									color: accentColor,
								}}
							/>
						</div>
						{/* Hero header */}
						<h4
							className="text-center text-6xl"
							style={{
								color: primaryColor,
								fontFamily: displayFont,
							}}
						>
							{displayFont} Heading
						</h4>
						{/* Hero text */}
						<p
							className="px-32 text-center text-[19px] leading-[1.6] text-[#393b47]"
							style={{
								fontFamily: textFont,
							}}
						>
							{textFont} text lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et dolore magna
							aliqua. Ut enim ad minim.
						</p>
						{/* Hero buttons */}
						<div className="flex items-center gap-4">
							<div
								className="rounded-md border-2 py-[9px] px-[34px] text-lg text-white subpixel-antialiased"
								style={{
									backgroundColor: accentColor,
									borderColor: accentColor,
									fontFamily: textFont,
									// If button color is bright, use black text, else use white text
									color: isColorBright(accentColorRGB)
										? "rgba(0, 0, 0, 1)"
										: "rgba(255, 255, 255, 1)",
								}}
							>
								Get started
							</div>
							<div
								className="rounded-md border-2 py-[9px] px-[34px] text-lg text-white subpixel-antialiased"
								style={{
									fontFamily: textFont,
									color: primaryColor,
									borderColor: primaryColor,
								}}
							>
								Learn more
							</div>
						</div>
					</div>
					{/* Accent bottom bar */}
					<div
						className="h-[60px] w-full rounded-b-lg"
						style={{
							backgroundColor: accentColor,
						}}
					></div>
				</div>
			</div>
		</section>
	);
};
