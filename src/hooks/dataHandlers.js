

export const getCurrentFormData = (sheetData, setSheetData, handleSubmit) => {
	let lang = localStorage.getItem("lang");
	if(!lang)
		sheetData?.language ? lang = sheetData.language : lang = 'EN';
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
	
	if (Array.isArray(sheetData.introduction)) {
		sheetData.introduction = {};
	  }
	if (Array.isArray(sheetData.guidelines)) {
		sheetData.guidelines = {};
	  }

    const introText = { ...sheetData.introduction, [lang]: document.querySelector("#introduction")?.value || ""};
    const guidelinesText = { ...sheetData.guidelines, [lang]: document.querySelector("#guidelines")?.value || ""};
	const attachments = Array.from(document.querySelectorAll(".bg-base-300.text-base-content.mb-4")
	).map((attachment) => ({
		title: attachment.querySelector('input[placeholder="Enter attachment title"]')?.value || "",
		url: attachment.querySelector('input[placeholder="Enter attachment URL"]')?.value || "",
	})).filter(attachment => attachment.title && attachment.url);
	
	const mandatorySections = Array.from(document.querySelectorAll(".mandatory-section")).map((section, index) => {
		const description = section.querySelector(`#mandatory_description_${index}`)?.value || "";
		const sepSize = section.querySelector(`#mandatory_separator_size_${index}`)?.value || false;
		const separator = section.querySelector(`#mandatory_separator_${index}`)?.checked ? sepSize : false;
		return {
			description: {
				...(typeof sheetData.mandatorySections[index]?.description === 'object' ? sheetData.mandatorySections[index]?.description : {}),
				[lang]: description,
			},
			yes_no: section.querySelector(`#mandatory_yes_no_${index}`)?.checked ? true : false,
			separator: separator,
			type: "mandatory",
		};
	});

	const bonusSections = Array.from(document.querySelectorAll(".bonus-section")).map((section, index) => {
			const sepSize = section.querySelector(`#bonus_separator_size_${index}`)?.value || false;
			const description =
				section.querySelector(`#bonus_description_${index}`)?.value || "";
			const separator = section.querySelector(`#bonus_separator_${index}`)?.checked ? sepSize : false;
			return {
				description: {
					...(typeof sheetData.bonusSections[index]?.description === 'object' ? sheetData.bonusSections[index]?.description : {}),
					[lang]: description,
				},
				separator : separator,
				yes_no:section.querySelector(`#bonus_yes_no_${index}`)?.checked ? true : false,
				type: "bonus",
			};
		});
	const getGradingOptions = () => {
		return GRADING_OPTIONS.reduce((acc, id) => {
			acc[id] = document.querySelector(`#grading_${id}`)?.checked ? true : false;
			return acc;
		}, {});
	};
	const languages = Array.from(document.querySelector("#languages")?.options).map((option) => option.value);
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
		languages: languages,
		language: 'EN',
		introduction: introText || "",
		guidelines: guidelinesText || "",
		attachments: attachments || [],
		mandatorySections: mandatorySections || [],
		bonusSections: bonusSections || [],
		gradingOptions: [getGradingOptions()] || [],
		updated_at: dateFormat,
	};
	handleSubmit(false, formData);
	setSheetData(formData);
	return formData;
};


export const fetchData = async (projects) => {

	if (typeof projects === "string")
		projects = [projects.split("#")[0]];
	
	const fetchOne = async (project) => {
		const reactBase = process.env.REACT_APP_BASENAME || '/';
		if (project.includes("CPP")) {
			project = "CPP/" + project;
		}
		const url = `${window.location.origin}${reactBase}/sheets/${project}/data.json`
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			return data.data[0];
		} catch (error) {
			console.error(`Error fetching data for folder: ${project}`, error);
			return [];
		}
	};
	if(projects.length > 1)
	{
		const data = await Promise.all(projects.map((project) => {
			let data = fetchOne(project);
			return data.length <= 0 ? null : data;
		}));
		const flattenedData = data.flat();
		const filteredData = flattenedData.filter(
			(data) => data && data.project_title
		);
		const sortedData = filteredData.sort((a, b) => a.id - b.id);
		return sortedData;
	}
	else
	{
		const data = await fetchOne(projects[0]);
		return data;
	}

};
