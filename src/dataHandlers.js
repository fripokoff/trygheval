export const getCurrentFormData = (sheetData, setSheetData, handleSubmit) => {


	const GRADING_OPTIONS = [
		"ok",
		"outstanding",
		"empty_work",
		"incomplete_work",
		"invalid_compilation",
		"norme",
		"cheat",
		"crash",
		"concerning_situations",
		"leaks",
		"forbidden_functions",
		"cannot_support",
	];
	const introText = document.querySelector("#introduction")?.value || "";
	const introArray = introText
		.split("\n")
		.filter((line) => line.trim() !== "")
		.map((line) => line.trim());
	const guidelinesText = document.querySelector("#guidelines")?.value || "";
	const guidelinesArray = guidelinesText
		.split("\n")
		.filter((line) => line.trim() !== "")
		.map((line) => line.trim());
		const attachments = Array.from(
		document.querySelectorAll(".bg-base-300.text-base-content.mb-4")
	).map((attachment) => ({
		title: 
			attachment.querySelector('input[placeholder="Enter attachment title"]')
				?.value || "",
		url: 
			attachment.querySelector('input[placeholder="Enter attachment URL"]')
				?.value || "",
	})).filter(attachment => attachment.title && attachment.url);
	
	const mandatorySections = Array.from(
		document.querySelectorAll(".mandatory-section")
	).map((section, index) => {
		const description =
			section.querySelector(`#mandatory_description_${index}`)?.value || "";
		// const descriptionArray = description
		// 	.split("\n")
		// 	.filter((line) => line.trim() !== "")
		// 	.map((line) => line.trim());
	
		return {
			description: description,
			yes_no: section.querySelector(`#mandatory_yes_no_${index}`).checked ? true : false,
			separator:section.querySelector(`#mandatory_separator_${index}`).checked ? true : false,
			type: "mandatory",
		};
	});

	const bonusSections = Array.from(
		document.querySelectorAll(".bonus-section")
	).map((section, index) => {
		const description =
			section.querySelector(`#bonus_description_${index}`)?.value || "";
		const descriptionArray = description
			.split("\n")
			.filter((line) => line.trim() !== "")
			.map((line) => line.trim());

		return {
			title: section.querySelector(`#bonus_title_${index}`)?.value || "",
			subtitle:
				section.querySelector(`#bonus_subtitle_${index}`)?.value || "",
			description: descriptionArray.join("\n"),
			conclusion:section.querySelector(`#bonus_conclusion_${index}`)?.value || "",
			yes_no:
				section.querySelector(`#bonus_yes_no_${index}`)?.value === "true",
			type: "bonus",
		};
	});
	const getGradingOptions = () => {
		return GRADING_OPTIONS.reduce((acc, option) => {
			acc[option] = document.querySelector(`#${option}`)?.value === "true";
			return acc;
		}, {});
	};
	const actual_date = new Date().toISOString();
	const input_date = document.querySelector("#date")?.value;
	let dateFormat = new Date(sheetData.updated_at);
	if(actual_date != input_date)
	{
		dateFormat = new Date(input_date);
	}
	const formData = {
		...sheetData,
		project_title: document.querySelector("#project_title")?.value || "",
		students: parseInt(document.querySelector("#students")?.value) || 0,
		eval_points: parseInt(document.querySelector("#eval_points")?.value) || 0,
		time: parseInt(document.querySelector("#time")?.value) || 0,
		introduction: introArray || "",
		guidelines: guidelinesArray || "",
		attachments: attachments || [],
		mandatorySections: mandatorySections || [],
		mandatoryIntro : document.querySelector("#mandatory_intro")?.value || "",
		bonusSections: bonusSections,
		bonusIntro: document.querySelector("#bonus_intro")?.value || "",
		gradingOptions: [getGradingOptions()] || [],
		updated_at: dateFormat,
	};
	console.log(formData);
	handleSubmit(false, formData);
	setSheetData(formData);
	return formData;
};

let cppID = 0;

export const fetchData = async (folder) => {
	let project = folder;
	if (project.includes("CPP")) {
		project = "CPP/CPP0" + cppID;
		cppID++;
	}
	let home = window.location;
	home += "";
	if (home.includes("&edit=true")) {
		home = home.replace("&edit=true", "");
	}
	const url = home.replace(/\/sheet\?project=([a-zA-Z0-9\-_]+)/,`/Sheets/${project}/data.json`);
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data.data[0];
	} catch (error) {
		console.error(`Error fetching data for folder: ${project}`, error);
		return null;
	}
};