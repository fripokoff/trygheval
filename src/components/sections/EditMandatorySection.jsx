import { useSectionContext } from "../../contexts/SectionContext";
import { useMandatorySections } from "../../hooks/useMandatorySections";
import { useState } from "react";

export default function EditMandatorySection({
  openModal,
}) {
  const [hrEnabled, setHrEnabled] = useState({});
  const {
    mandatorySections,
    mandatoryOptionsDataFromServer,
    numberOfMandatorySections,
    updateMandatorySection,
  } = useSectionContext();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const { addMandatorySection, removeMandatorySection } =
    useMandatorySections();
  const [yesNo, setYesNo] = useState({});

  const handleHrChange = (index, value) => {
    setHrEnabled({ ...hrEnabled, [index]: value });
    updateMandatorySection(index, { separator: value });
  };

  const handleYesNoChange = (index, value) => {
    setYesNo({ ...yesNo, [index]: value });
    updateMandatorySection(index, { yes_no: value });
  };

  return (
    <div className="flex flex-col p-4 lg:p-5 rounded-xl gap-5 mt-10 bg-base-300">
      {numberOfMandatorySections === 0 && (
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium text-base-content font-bold">
            Add section
          </h1>

          <button
            type="button"
            onClick={addMandatorySection}
            className="bg-base-300 text-base-content py-3 px-5 rounded-md transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      )}
      {mandatorySections.map((section, index) => {
        const isYesNo =
          yesNo[index] !== undefined
            ? yesNo[index]
            : !mandatoryOptionsDataFromServer[index]
            ? true
            : mandatoryOptionsDataFromServer[index]?.yes_no === true;
        const isHrEnabled =
          hrEnabled[index] !== undefined ? hrEnabled[index] : false;
        return (
          <div
            key={section.id}
            className="mandatory-section"
            id={`mandatory_${index + 1}`}
          >
            {/* Contenu de la section */}
            <div className="mt-2 mb-2 flex justify-between items-center">
              <h1 className="text-xl font-medium text-base-content">
                Section {section.index + 1}
              </h1>
              <button
                onClick={() => removeMandatorySection(section.index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
            {/* Description */}
            <div className="mb-2 mt-2">
              <div className="flex justify-between items-center font-bold">
                <label
                  htmlFor="mandatory_description"
                  className="block text-sm text-base-content"
                >
                  Detailed description:
                </label>
                <button
                  onClick={openModal}
                  type="button"
                  className="ml-2 bg-base-300 text-base-content p-1 rounded-full transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                </button>
              </div>

              <textarea
                defaultValue={
                  mandatoryOptionsDataFromServer[index]?.description || ""
                }
                rows={20}
                placeholder="Enter detailed description separated by a new line"
                id={`mandatory_description_${section.index}`}
                className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
                onChange={(e) =>
                  updateMandatorySection(index, { description: e.target.value })
                }
              />
              <p className="mt-2 text-sm text-red-700">
                NOTE: Please separate each description with a new line
              </p>
            </div>

            {/* Switch */}
            <div className="flex items-center justify-between mb-2 mt-4 font-bold text-base-content">
              <label className="relative inline-flex items-center cursor-pointer mr-4">
                <input
                  type="checkbox"
                  value=""
                  id={"mandatory_yes_no_" + section.index}
                  className="sr-only peer"
                  checked={isYesNo}
                  onChange={() => handleYesNoChange(index, !isYesNo)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
              <div className="flex gap-1 items-center justify-center w-full">
                <button
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                  Yes
                </button>
                <button
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  No
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2 mt-4 font-bold text-base-content">
              <label className="relative inline-flex items-center cursor-pointer mr-4">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={!isYesNo}
                  onChange={() => handleYesNoChange(index, !isYesNo)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
              <div
                className="w-full"
                style={{ position: "relative", bottom: "-0.5em" }}
              >
                <input
                  type="range"
                  defaultValue={0}
                  min={0}
                  max={100}
                  className="range range-info"
                  step={20}
                />
                <div className="flex justify-between px-2 text-xs">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>
            </div>
            {isHrEnabled &&
              numberOfMandatorySections > 0 &&
              index < numberOfMandatorySections - 1 && (
                <hr className="mt-8 mb-4" />
              )}
            <div className="flex items-center mb-2 mt-4 font-bold text-base-content">
              <label className="relative inline-flex items-center cursor-pointer mr-4">
                <input
                  type="checkbox"
                  value=""
                  id={"mandatory_separator_" + section.index}
                  className="sr-only peer"
                  checked={isHrEnabled}
                  onChange={() => handleHrChange(index, !isHrEnabled)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
              <span>Add separator before next section</span>
            </div>
          </div>
        );
      })}

      {numberOfMandatorySections > 0 && (
        <div
          className="flex justify-center w-full p-4 bg-base-300 text-base-content rounded-md mb-2 border border-green-500 cursor-pointer"
          onClick={addMandatorySection}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="ml-2">Add section</span>
        </div>
      )}
    </div>
  );
}
