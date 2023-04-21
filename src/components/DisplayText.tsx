import type { DisplayTextProps } from "../types/Props";
import Balancer from "react-wrap-balancer";

export const DisplayText = ({ heading, text, type }: DisplayTextProps) => {
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
			<div className="w-full">
				<h1 className="mb-2 text-center text-2xl font-bold lg:text-left">
					{heading}
				</h1>
				<p className="text-center text-base text-presto-text-grey lg:text-left">
					{text}
				</p>
			</div>
		);
	}

	return null;
};
