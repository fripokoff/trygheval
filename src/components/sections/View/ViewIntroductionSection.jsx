import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ViewIntroductionSection({ sheetData }) {
  const url = new URL(window.location.href);
  let lang = url.searchParams.get("lang");
  if(!lang)
    sheetData?.language ? lang = sheetData.language : lang = 'EN';
  return (
    <div className='mt-10 bg-base-100 p-5 lg:p-10 rounded-lg' id='introduction'>
      <div>
        {sheetData?.introduction && typeof sheetData?.introduction?.[lang] === "string" && (
                  <div className='w-full'>
                      <ReactMarkdown
                        className="prose prose-stone w-full max-w-none"
                        children={sheetData.introduction?.[lang]?.replace(/\n/g, '  \n')}
                        remarkPlugins={[remarkGfm]}
                      />
                  </div>
                )}
      </div>
    </div>
  );
}

export default ViewIntroductionSection;