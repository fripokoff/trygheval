import React from 'react';

function ViewGradingOptions({
    sheetData,
    handleOkColor,
    okColor,
    handleOutstandingColor,
    outstandingColor,
    handleEmptyWorkColor,
    emptyWorkColor,
    handleIncompleteWorkColor,
    incompleteWorkColor,
    handleInvalidCompilationColor,
    invalidCompilationColor,
    handleNormeColor,
    normeColor,
    handleCheatColor,
    cheatColor,
    handleCrashColor,
    crashColor,
    handleConcerningSituationsColor,
    concerningSituationsColor,
    handleLeaksColor,
    leaksColor,
    handleForbiddenFunctionsColor,
    forbiddenFunctionsColor,
    handleCannotSupportColor,
    cannotSupportColor
}) {
    return (
        <div className='mt-10 bg-base-100 p-5 lg:p-10 rounded-lg'>
            <h2 className='text-2xl font-bold'>
                Ratings
            </h2>

            {sheetData.gradingOptions && sheetData.gradingOptions.length === 1 ? (
                <div className='pt-10 flex flex-wrap gap-2'>
                    <div className='flex gap-2 w-full'>
                        {sheetData.gradingOptions[0].ok && (
                            <button onClick={handleOkColor} className={okColor}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </span>
                                OK
                            </button>
                        )}
                        {sheetData.gradingOptions[0].outstanding && (
                            <button onClick={handleOutstandingColor} className={outstandingColor}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                </span>
                                Outstanding
                            </button>
                        )}
                    </div>
                    <div className='flex flex-wrap gap-2 w-full'>
                        {sheetData.gradingOptions[0].empty_work && (
                            <button onClick={handleEmptyWorkColor} className={emptyWorkColor}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                </span>
                                Empty Work
                            </button>
                        )}
                        {sheetData.gradingOptions[0].incomplete_work && (
                            <button onClick={handleIncompleteWorkColor} className={incompleteWorkColor}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.745-1.227Z" />
                                    </svg>
                                </span>
                                Incomplete Work
                            </button>
                        )}
                        {sheetData.gradingOptions[0].invalid_compilation && (
                            <button onClick={handleInvalidCompilationColor} className={invalidCompilationColor}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </span>
                                Invalid Compilation
                            </button>
                        )}
                        {sheetData.gradingOptions[0].norme && (
                            <button onClick={handleNormeColor} className={normeColor}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L21 13.5m-13.5 0L2.25 4.5m11.25 9l9-18m-9 9-.75 4.5m0-4.5-.75-4.5m0 4.5 6 6m-3-3-3-3" />
                                    </svg>
                                </span>
                                Norme
                            </button>
                        )}
                    </div>

                    <div className='flex flex-wrap gap-2 w-full'>
                        {sheetData.gradingOptions[0].cheat && (
                            <button onClick={handleCheatColor} className={cheatColor}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-4.037m-7.32-1.732a5.003 5.003 0 0 0-2.537-1.067 5.004 5.004 0 0 1-.88-3.184 5.004 5.004 0 0 1 6.424-1.747m-5.096 8.44a13.001 13.001 0 0 1-2.847-2.267 13.001 13.001 0 0 1-2.267-2.846m-.367-3.108a5.003 5.003 0 0 1 3.219-4.065 5.004 5.004 0 0 0 1.475 2.462m-7.72 5.43a12.999 12.999 0 0 0 .427 2.591m7.95-4.197a5.004 5.004 0 0 1-2.383 2.804M4.019 16.32a13.001 13.001 0 0 1-3.282-3.281" />
                                    </svg>
                                </span>
                                Cheat
                            </button>
                        )}
                        {sheetData.gradingOptions[0].crash && (
                            <button onClick={handleCrashColor} className={crashColor}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18.6 9.247c0-1.017-.377-2.025-1.094-2.889m-4.99 5.903a5.006 5.006 0 0 0-1.789-2.898c-1.272-1.28-2.817-1.905-4.392-1.905m-.5 9.02a5.006 5.006 0 0 0-1.789-2.898c-1.272-1.28-2.817-1.905-4.392-1.905m15.036 4.147c.483.043.972.07 1.465.072M17.23 12.397c.386.055.775.109 1.165.162" />
                                    </svg>
                                </span>
                                Crash
                            </button>
                        )}
                        {sheetData.gradingOptions[0].concerning_situations && (
                            <button onClick={handleConcerningSituationsColor} className={concerningSituationsColor}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                </span>
                                Concerning Situations
                            </button>
                        )}
                    </div>

                    <div className='flex flex-wrap gap-2 w-full'>
                        {sheetData.gradingOptions[0].leaks && (
                            <button onClick={handleLeaksColor} className={leaksColor}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.304 0-9.75 4.446-9.75 9.75s4.446 9.75 9.75 9.75c5.304 0 9.75-4.446 9.75-9.75S17.304 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0V6ZM12 15.75a.75.75 0 0 0-.75-.75H11.25a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 .75-.75Z" />
                                    </svg>
                                </span>
                                Leaks
                            </button>
                        )}
                        {sheetData.gradingOptions[0].forbidden_functions && (
                            <button onClick={handleForbiddenFunctionsColor} className={forbiddenFunctionsColor}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.828 3.727a1.958 1.958 0 0 1 0 2.828L9.88 8.946m-6.528 0a1.958 1.958 0 0 1 0-2.828L3.36 3.727m0 5.22l5.22-5.22m-1.257 7.711c0 .97.808 1.778 1.777 1.778s1.777-.808 1.777-1.777V11.21a1.724 1.724 0 0 0-1.777-1.725 1.724 1.724 0 0 0-1.777 1.725v2.281m1.47-4.221a4.89 4.89 0 0 1 6.664-3.583l.516 1.033c.553 1.105 1.579 1.945 2.791 2.524m-4.98 1.03a4.879 4.879 0 0 1-3.584 6.664l1.033.516c1.105.553 1.945 1.579 2.524 2.791" />
                                    </svg>
                                </span>
                                Forbidden Functions
                            </button>
                        )}
                        {sheetData.gradingOptions[0].cannot_support && (
                            <button onClick={handleCannotSupportColor} className={cannotSupportColor}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </span>
                                Cannot Support
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <p>No grading options available.</p>
            )}
        </div>
    );
}

export default ViewGradingOptions;