import React from "react";

type ContainerProps = React.PropsWithChildren<{
	children?: React.ReactNode;
}>;
const Container: React.FC<ContainerProps> = ({ children }) => {
	return (
		<section className="m-auto flex max-w-[720px] flex-col items-center gap-36 pb-56">
			{children}
		</section>
	);
};

export default Container;
