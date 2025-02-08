import {useGradingOptions} from "../../hooks/useGradingOptions";
import {useGeneralContext} from "../../context/GeneralContext";


export default function GradingOptionsSection({}) {
  const { gradingFields } = useGradingOptions();
  const { updateGradingOption, gradingOptions } = useGeneralContext();
  return (
    <div className="flex flex-col p-4 lg:p-5 rounded-xl gap-5 mt-10 bg-base-200 grading-options">
       <h1 className='text-2xl font-medium text-base-content font-bold'>
       Grading Options (select yes to add in the sheet)
        </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 w-full">
        {gradingFields.map(({ id, label }) => (
          <div key={id} className="flex flex-col w-full items-center mb-6">
            <label htmlFor={id} className='block text-sm text-base-content mb-2'>
              {label}:
            </label>
            <select
              id={id}
              value={gradingOptions?.[id] === true ? "true" : "false"}
              className='block w-32 px-3 py-3 border bg-base-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm'
              onChange={(e) => {
                updateGradingOption(id, e.target.value === "true");
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}