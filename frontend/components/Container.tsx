import React from "react";

const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<section className="m-auto flex max-w-6xl flex-col items-center gap-6">
			{children}
		</section>
	);
};

export default Container;
