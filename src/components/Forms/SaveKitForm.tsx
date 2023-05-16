import { Button } from "../Buttons/Button";
import { useRouter } from "next/router";
import { useState } from "react";
import { Input } from "./Input";
import type { Color } from "@types";

export type SaveKitFormProps = {
	projectName: string;
	projectDescription: string;
	customColors: Color[];
};

export const SaveKitForm = ({
	projectName,
	projectDescription,
	customColors,
}: SaveKitFormProps) => {
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push("/export-kit");
	};

	return (
		<form
			className="mt-7 flex w-full flex-col gap-5 lg:gap-11"
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col gap-6">
				<Input
					name="project-name"
					value={projectName}
					labelText="Project Name"
					placeholder="Enter your project's name"
					// onChange={}
				/>
				<Input
					name="project-description"
					value={projectDescription}
					labelText="Project Description"
					placeholder="Describe your project in a few words"
					// onChange={}
				/>
				<Input
					name="base-color"
					value={customColors[0].name}
					labelText="Base Color Name"
					placeholder="Name this color"
					colorView={customColors[0].hex}
					// onChange={}
				/>
				<Input
					name="primary-color-name"
					value={customColors[1].name}
					labelText="Primary Color Name"
					placeholder="Name this color"
					colorView={customColors[1].hex}
					// onChange={}
				/>
				<Input
					name="accent-color-name"
					value={customColors[2].name}
					labelText="Accent Color Name"
					placeholder="Name this color"
					colorView={customColors[2].hex}
					// onChange={}
				/>
			</div>
			<Button text="Save Kit" withArrow />
		</form>
	);
};
