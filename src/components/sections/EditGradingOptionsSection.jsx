import { useGradingOptions } from "../../hooks/useGradingOptions";
import { useGeneralContext } from "../../contexts/GeneralContext";

export default function EditGradingOptionsSection({}) {
  const { gradingFields } = useGradingOptions();
  const { updateGradingOption, gradingOptions } = useGeneralContext();

  return (
    <div className="flex flex-col p-4 lg:p-5 rounded-xl gap-5 mt-10 bg-base-200 grading-options">
      <h1 className="text-2xl font-medium text-base-content font-bold">
        Grading Options (select yes to add in the sheet)
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full gap-4">
        {gradingFields.map(({ id, label }) => (
          <div key={id} className="flex flex-col w-full items-center">
            <label htmlFor={id} className="block text-sm text-base-content mb-2">
              {label}:
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id={id}
                className="sr-only peer"
                checked={gradingOptions?.[id] === true}
                onChange={(e) => {
                  updateGradingOption(id, e.target.checked);
                }}
              />
             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-success"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}