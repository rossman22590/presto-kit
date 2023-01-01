import React from "react";

const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<section className="m-auto flex max-w-[720px] flex-col items-center gap-6 pb-56">
			{children}
		</section>
	);
};

export default Container;
