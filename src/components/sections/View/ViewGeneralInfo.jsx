import React from 'react';
import ReactCountryFlag from "react-country-flag"


function ViewGeneralInfo({ sheetData }) {
  let lang = localStorage.getItem("lang");
  if(!lang)
    sheetData?.language ? lang = sheetData.language : lang = 'EN';
  const handleLanguage = (newLang) => {
    localStorage.setItem("lang", newLang);
    window.location.reload();
  };

  const getProjectImagePath = (projectName) => {
    return `sheets/${projectName}/header.png`;
  };

  const imagePath = sheetData.project_title ? getProjectImagePath(sheetData.project_title) : null;
  return (
  <div>
    <div className="flex justify-center items-center my-4 bg-base-100 rounded-lg p-6">
  {imagePath && (
    <div className="flex justify-center">
      <img 
        src={imagePath}
        alt={`${sheetData.project_title} logo`}
        className="max-h-[300px] w-auto"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </div>
  )}
</div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center my-4 bg-base-100 rounded-lg p-6">
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-3xl lg:text-2xl">⌛ Estimated duration</span>
          <span className="text-2xl md:text-3xl lg:text-2xl font-bold">{sheetData.time}`</span>
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
        <div className="flex flex-col items-center">
        <span className="text-2xl md:text-3xl lg:text-2xl ">👥 Students :</span>
        <span className="text-2xl md:text-3xl lg:text-2xl font-bold">{sheetData.students}</span>
        </div>
      </div>

      {sheetData?.languages && (
      <div className="flex flex-col gap-4 items-center justify-center text-center my-4 bg-base-100 rounded-lg p-6">
        <span className="text-2xl font-bold ">Languages :</span>
        <div className="flex gap-4 items-center justify-center">
          
            {sheetData?.languages?.map((language) => {
              const langClass = lang === language ? "border-2 border-blue-500 p-4" : "";
              const llang = language === 'EN' ? 'US' : language;
                  return (
                  <div className="ml-2"
                  key={`projects_${language}`}
                  onClick={() => handleLanguage(language)}
                  >
                  <ReactCountryFlag
                  className={`emojiFlag cursor-pointer ${langClass}`}
                  countryCode={llang.toUpperCase()}
                  style={{
                      fontSize: '5em',
                      lineHeight: '1em',
                  }}
              />
                  </div>
              )})}
        </div>
      </div>
      )}
    </div>
  );
}

export default ViewGeneralInfo;