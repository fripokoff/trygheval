import React from 'react';
import ReactCountryFlag from "react-country-flag"

function ViewGeneralInfo({ sheetData }) {
  const handleLanguage = (lang) => {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.pushState({}, '', url.toString());
    window.location.reload();
  };
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
								"en-US",
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
      <div className="flex flex-col gap-4 items-center justify-center text-center my-4 bg-base-100 rounded-lg p-6">
      <span className="text-2xl">Languages :</span>
      <div className="flex gap-4 items-center justify-center">
        
      {sheetData?.languages?.map((lang) => {
        const language = lang === "EN" ? "US" : lang;
        const actualLang = new URL(window.location.href).searchParams.get('lang');
        const langClass = actualLang === lang ? "border-2 border-blue-500 p-4" : "";
            return (
            <div className="ml-2"
            key={`projects_${lang}`}
            onClick={() => handleLanguage(lang)}
            >
            <ReactCountryFlag
            className={`emojiFlag cursor-pointer ${langClass}`}
            countryCode={language.toUpperCase()}
            style={{
                fontSize: '5em',
                lineHeight: '1em',
            }}
        />
            </div>
        )})}
      </div>
      </div>
    </div>
  );
}

export default ViewGeneralInfo;