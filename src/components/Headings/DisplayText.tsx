import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { DisplayTextProps } from "../../types/Props";
import Balancer from "react-wrap-balancer";

export const DisplayText = ({
	heading,
	text,
	type,
	buttonText,
}: DisplayTextProps) => {
	if (type === "MAIN") {
		return (
			<>
				<h1 className="text-center font-Inter text-2xl font-semibold text-black md:text-3xl">
					<Balancer>{heading}</Balancer>
				</h1>
				{/* additional lg breakpoint on text resolved a visual bug with Balancer on screen resize */}
				<p className="text-center font-Inter text-base font-light text-presto-grey md:text-lg lg:text-xl">
					<Balancer>{text}</Balancer>
				</p>
			</>
		);
	}

	if (type === "DASHBOARD") {
		return (
			<div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:gap-0">
				<div className="w-full">
					<h1 className="mb-2 text-center text-2xl font-bold lg:text-left">
						{heading}
					</h1>
					<p className="text-center text-base text-presto-text-grey lg:text-left">
						{text}
					</p>
				</div>
				{buttonText && (
					<button
						type="submit"
						// onClick={() => router.push("/")}
						className="flex h-fit cursor-pointer items-center gap-2 rounded-md bg-presto-green py-4 pl-8 pr-8 font-Inter text-xl font-medium text-white hover:opacity-90"
					>
						{buttonText}
						<ArrowRightIcon className="w-6" />
					</button>
				)}
			</div>
		);
	}

	return null;
};
