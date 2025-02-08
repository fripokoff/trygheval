import React from 'react';

function GeneralInfo({ sheetData }) {
  return (
  <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center my-4 bg-base-100 rounded-lg p-6">
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-3xl lg:text-2xl">⌛ Estimated duration</span>
          <span className="text-2xl md:text-3xl lg:text-2xl font-bold">{sheetData.time}'</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-3xl lg:text-2xl">🕒 Last update</span>

          <span className="text-2xl md:text-3xl lg:text-2xl font-bold">
          {new Date(sheetData.updated_at).toLocaleDateString(
								"en-GB",
								{
								day: "numeric",
								month: "numeric",
								year: "numeric",
								}
							)}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-3xl lg:text-2xl">🎯 Cost in points</span>
          <span className="text-2xl md:text-3xl lg:text-2xl font-bold">{sheetData.eval_points}</span>
        </div>
      </div>
    </div>
  );
}

export default GeneralInfo;