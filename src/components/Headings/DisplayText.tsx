import type { DisplayTextProps } from "@types";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Balancer from "react-wrap-balancer";
import { useRouter } from "next/router";

export const DisplayText = ({
	heading,
	text,
	type,
	buttonText,
	handleClick,
	route,
}: DisplayTextProps) => {
	const router = useRouter();

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
						onClick={() =>
							handleClick ? handleClick() : route ? router.push(route) : null
						}
						className="flex h-fit cursor-pointer items-center gap-2 rounded-md bg-presto-green px-7 py-3 font-Inter text-lg font-medium text-white hover:opacity-90"
					>
						{buttonText}
						<ArrowRightIcon className="w-5" />
					</button>
				)}
			</div>
		);
	}

	return null;
};
