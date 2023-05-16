import type { DisplayTextProps } from "@types";
import Balancer from "react-wrap-balancer";
import { Button } from "../Buttons/Button";

export const DisplayText = ({
	heading,
	text,
	type,
	buttonText,
	handleClick,
	route,
}: DisplayTextProps) => {
	if (type === "MAIN") {
		return (
			<>
				<h1 className="text-center text-2xl font-semibold text-black md:text-3xl">
					<Balancer>{heading}</Balancer>
				</h1>
				{/* additional lg breakpoint on text resolved a visual bug with Balancer on screen resize */}
				<p className="text-center text-base font-light text-presto-grey md:text-lg lg:text-xl">
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
					<Button
						text={buttonText}
						handleClick={handleClick}
						route={route}
						withArrow
					/>
				)}
			</div>
		);
	}

	return null;
};
