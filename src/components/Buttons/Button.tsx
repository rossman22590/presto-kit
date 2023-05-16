import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export type ButtonProps = {
	text: string;
	handleClick?: () => void;
	route?: string;
	withArrow?: boolean;
};

export const Button = ({
	text,
	handleClick,
	route,
	withArrow,
}: ButtonProps) => {
	const router = useRouter();

	return (
		<button
			onClick={() =>
				handleClick ? handleClick() : route ? router.push(route) : null
			}
			className="flex h-fit w-fit cursor-pointer items-center gap-2 rounded-md bg-presto-green px-7 py-3 text-lg font-medium text-white hover:opacity-90"
		>
			{text}
			{withArrow && <ArrowRightIcon className="w-5" />}
		</button>
	);
};
