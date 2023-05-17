import type { Color, FontsResponse } from "@types";
import { useUpdateProjectAndFullKitMutation } from "@features";
import { Button } from "../Buttons/Button";
import { useRouter } from "next/router";
import { useState } from "react";
import { Input } from "./Input";

export type SaveKitFormProps = {
	kitId: number;
	title: string;
	projectId: number;
	name: string;
	description: string;
	customColors: Color[];
	displayFont: FontsResponse;
	textFont: FontsResponse;
};

export const SaveKitForm = ({
	kitId,
	title,
	projectId,
	name,
	description,
	customColors,
	displayFont,
	textFont,
}: SaveKitFormProps) => {
	const router = useRouter();

	const [kitTitle, setKitTitle] = useState(title);
	const [projectName, setProjectName] = useState(name);
	const [projectDescription, setProjectDescription] = useState(description);
	const [baseColor, setBaseColor] = useState(customColors[0]);
	const [primaryColor, setPrimaryColor] = useState(customColors[1]);
	const [accentColor, setAccentColor] = useState(customColors[2]);

	const [updateFullKit] = useUpdateProjectAndFullKitMutation();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateFullKit({
			kit: {
				id: kitId,
				title: kitTitle,
				projectId,
				projectName,
				projectDescription,
				colors: [baseColor, primaryColor, accentColor],
				displayFont,
				textFont,
			},
		}).then(() => router.push("/export-kit"));
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
					onChange={(e) => setProjectName(e.target.value)}
				/>
				<Input
					name="project-description"
					value={projectDescription}
					labelText="Project Description"
					placeholder="Describe your project in a few words"
					onChange={(e) => setProjectDescription(e.target.value)}
				/>
				<Input
					name="kit-title"
					value={kitTitle}
					labelText="UI Kit Title"
					placeholder="Name your UI kit"
					onChange={(e) => setKitTitle(e.target.value)}
				/>
				<Input
					name="base-color"
					value={baseColor.name}
					labelText="Base Color Name"
					placeholder="Name this color"
					colorView={customColors[0].hex}
					onChange={(e) => setBaseColor({ ...baseColor, name: e.target.value })}
				/>
				<Input
					name="primary-color-name"
					value={primaryColor.name}
					labelText="Primary Color Name"
					placeholder="Name this color"
					colorView={customColors[1].hex}
					onChange={(e) =>
						setPrimaryColor({ ...primaryColor, name: e.target.value })
					}
				/>
				<Input
					name="accent-color-name"
					value={accentColor.name}
					labelText="Accent Color Name"
					placeholder="Name this color"
					colorView={customColors[2].hex}
					onChange={(e) =>
						setAccentColor({ ...accentColor, name: e.target.value })
					}
				/>
			</div>
			<Button text="Save Kit" withArrow />
		</form>
	);
};
