import fs from "fs";
import path from "path";

const dirsToExport = [
	"./src/components",
	"./src/constants",
	"./src/data",
	"./src/hooks",
	"./src/types",
	"./src/utils",
];

const getDirectories = (source) => {
	return fs
		.readdirSync(source, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
};

const createExportsFile = (dir) => {
	let exportStatements = "";
	let commentCounter = 0;

	const rootFiles = fs.readdirSync(dir);
	rootFiles.forEach((file) => {
		if (
			(file.endsWith(".js") ||
				file.endsWith(".jsx") ||
				file.endsWith(".ts") ||
				file.endsWith(".tsx")) &&
			!file.startsWith("index")
		) {
			const componentName = file.replace(/\.[^/.]+$/, "");
			const importPath = `./${componentName}`;
			exportStatements += `export * from "${importPath}";\n`;
		}
	});

	const subDirs = getDirectories(dir);
	subDirs.forEach((subDir) => {
		const subDirPath = path.join(dir, subDir);

		if (fs.existsSync(subDirPath)) {
			const files = fs.readdirSync(subDirPath);

			if (files.length > 0) {
				if (commentCounter > 0) {
					exportStatements += "\n";
				}
				exportStatements += `// ${subDir}\n`;
				commentCounter++;
			}

			files.forEach((file) => {
				if (
					(file.endsWith(".js") ||
						file.endsWith(".jsx") ||
						file.endsWith(".ts") ||
						file.endsWith(".tsx")) &&
					!file.startsWith("index")
				) {
					const componentName = file.replace(/\.[^/.]+$/, "");
					const importPath = `./${subDir}/${componentName}`;
					exportStatements += `export * from "${importPath}";\n`;
				}
			});
		}
	});

	fs.writeFileSync(path.join(dir, "index.ts"), exportStatements.trim());
};

dirsToExport.forEach((dir) => {
	createExportsFile(dir);
});
