import React from "react";

type ContainerProps = React.PropsWithChildren<{
	children?: React.ReactNode;
	gap: string;
	maxWidth: string;
}>;
const Container: React.FC<ContainerProps> = ({ children, gap, maxWidth }) => {
	return (
		<section
			className="m-auto flex max-w-[720px] flex-col items-center pb-56"
			style={{ gap: gap, maxWidth: maxWidth }}
		>
			{children}
		</section>
	);
};

export default Container;
