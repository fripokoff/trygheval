import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ViewMandatorySections({ sheetData, handleYesColor, handleNoColor, mandatoryYesColor, mandatoryNoColor, initialYesColor, initialNoColor, handleMandatorySliderValues }) {
  const url = new URL(window.location.href);
  let lang = url.searchParams.get("lang");
  if(!lang)
    sheetData?.language ? lang = sheetData.language : lang = 'EN';

  return (
    <div className='mt-10 bg-base-100 p-5 lg:p-5 rounded-lg'>
        {
          sheetData.mandatorySections && sheetData.mandatorySections.length > 0 ? (
            sheetData.mandatorySections.map((section, index) => (
              <div
                id={`mandatory_section_${index + 1}`}
                className='card bg-base-100'
                key={index}
              >
                <div className='w-full'>
                    <ReactMarkdown
                      className="prose prose-stone w-full max-w-none"
                      children={section.description?.[lang]?.replace(/\n/g, '  \n')}
                      remarkPlugins={[remarkGfm]}
                    />
                </div>
                <div className='flex gap-1 items-center w-full mt-4'>
                  {section.yes_no ? (
                    <div className='flex gap-1 items-center w-full'>
                    <button
                        onClick={() => handleYesColor(index)}
                        className={
                            mandatoryYesColor[index] ? mandatoryYesColor[index] : initialYesColor
                        }>
                        Yes
                    </button>
                    <button
                        onClick={() => handleNoColor(index)}
                        className={
                            mandatoryNoColor[index] ? mandatoryNoColor[index] : initialNoColor
                        }>
                        No
                    </button>
                </div>
                  ) : (
                    <div className='w-full mx-auto'>
                      <p className='text-sm font-medium text-center pb-2'>
                        Rate it from 0 (failed) through 5 (excellent)
                      </p>
                      <input
                        onChange={(e) => handleMandatorySliderValues(index, e.target.value, 'mandatory')}
                        type="range" defaultValue={0} min={0} max={100} className="range range-info" step={20} />
                      <div className="flex w-full justify-between px-2 text-xs">
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                      </div>
                    </div>

                  )}
                </div>
                {section?.separator && (<hr className={`mt-4 mb-4 ${section.separator}`} />)}
              </div>
            ))
          ) : null
        }
    </div>
  );
}

export default ViewMandatorySections;