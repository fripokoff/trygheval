import { SectionProvider } from "../contexts/SectionContext";
import { GeneralProvider } from "../contexts/GeneralContext";
import { SubmitProvider } from "../contexts/SubmitContext";
import { useSubmit } from "../contexts/SubmitContext";
import { AttachmentProvider } from "../contexts/AttachmentContext";
import { GradingProvider } from "../contexts/GradingContext";
import NavSheet from "./navigation/NavSheet";
import { useState, useEffect } from "react";
import useColorHandlers from "../hooks/useColorHandlers";
import useAddContentEffects from "../hooks/useAddContentEffects";
import ViewGeneralInfo from "./sections/View/ViewGeneralInfo";
import ViewIntroductionSection from "./sections/View/ViewIntroductionSection";
import ViewGuidelinesSection from "./sections/View/ViewGuidelinesSection";
import ViewAttachmentsSection from "./sections/View/ViewAttachmentsSection";
import ViewMandatorySections from "./sections/View/ViewMandatorySections";
import ViewBonusSections from "./sections/View/ViewBonusSections";
import ViewGradingOptions from "./sections/View/ViewGradingOptions";
import InfoModal from "./InfoModal";
import { initialYesColor, initialNoColor, greenColor, redColor } from '../constants/colors';
import FloatingElementsViewSheet from "./floating/FloatingElementsViewSheet";
import FloatingElementsEditSheet from "./floating/FloatingElementsEditSheet";
import {getCurrentFormData, fetchData} from "../hooks/dataHandlers";
import EditGeneralSection from "./sections/Edit/EditGeneralSection";
import EditAttachmentSection from "./sections/Edit/EditAttachmentSection";
import EditMandatorySection from "./sections/Edit/EditMandatorySection";
import EditBonusSection from "./sections/Edit/EditBonusSection";
import EditGradingOptionsSection from "./sections/Edit/EditGradingOptionsSection";
import { useLoading } from '../contexts/LoadingContext'; 

function EditViewSheet({selectedDate, setSelectedDate}) {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    let [isOpen, setIsOpen] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const { handleSubmit } = useSubmit();
    const [editMode, setEditMode] = useState(false);
    const [sheetData, setSheetData] = useState({});
    const { isLoading, setIsLoading } = useLoading();
    const { okColor, outstandingColor, emptyWorkColor, incompleteWorkColor, invalidCompilationColor, normeColor, cheatColor, crashColor, concerningSituationsColor, leaksColor, forbiddenFunctionsColor, cannotSupportColor, handleOkColor, handleOutstandingColor, handleEmptyWorkColor, handleIncompleteWorkColor, handleInvalidCompilationColor, handleNormeColor, handleCheatColor, handleCrashColor, handleConcerningSituationsColor, handleLeaksColor, handleForbiddenFunctionsColor, handleCannotSupportColor } = useColorHandlers(greenColor, redColor);
    const { hasLoaded, setHasLoaded, options, setOptions, show, setShow, showBackToTop, yesColorBonus, noColorBonus, mandatoryYesColor, mandatoryNoColor, points, bonusPoints, handleImportData, handleYesColor, handleNoColor, handleYesColorBonus, handleNoColorBonus, handleMandatorySliderValues, handleBonusSliderValues } = useAddContentEffects({ okColor, outstandingColor, emptyWorkColor, incompleteWorkColor, invalidCompilationColor, normeColor, cheatColor, crashColor, concerningSituationsColor, leaksColor, forbiddenFunctionsColor, cannotSupportColor }, sheetData, setSheetData, selectedDate, setSelectedDate);
    
    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll('*[id]');
            elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
                    if (element.id.includes('mandatory_section') || element.id.includes('bonus_section')
                    || element.id.includes('attachment') || element.id.includes('guidelines')
                    || element.id.includes('grading') || element.id.includes('introduction'))
                    {
                        
                        if(!editMode && !isScrolling)
                        {
                            localStorage.setItem('ActiveSection', element.id);
                        }
                    }
                    
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [editMode, isScrolling]);
    
    const handleEdit = () => {
        const newEditMode = !editMode;
        let newUrl;
        const mandatory_section = localStorage.getItem('ActiveSection');
        setIsLoading(true);
        setIsScrolling(true);
        window.scrollTo(0, 0);
        
        if (newEditMode) {
            newUrl = `${window.location.pathname}?project=${sheetData.project_title}&edit=true`;
        } else {
            getCurrentFormData(sheetData, setSheetData, handleSubmit)
            newUrl = `${window.location.pathname}?project=${sheetData.project_title}`;
        }
        window.history.pushState({}, "", newUrl);
        
        setTimeout(() => {
            const container = document.getElementById(mandatory_section);
            if (container) {
                const yOffset = -100; 
                const y = container.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        }, 100);
        setTimeout(() => {
            const container = document.getElementById(mandatory_section);
            setIsLoading(false);
            if (container)
            {
                container.classList.add('glowing-border');
                setTimeout(() => {
                    container.classList.remove('glowing-border');
                }, 500);
            }
            setTimeout(() => {
                setIsScrolling(false);
            }, 500);
        }, 500);
        
        setEditMode(newEditMode);
        
    };

    const handleDownload = () => {
        handleSubmit(true, getCurrentFormData(sheetData, setSheetData, handleSubmit));
    };

    useState(() => {
        if (!hasLoaded) {
            const fetchAllData = async () => {
                const getQueryParams = () => {
                    const params = {};
                    const queryString = window.location.search.substring(1);
                    const queryArray = queryString.split("&");
                    queryArray.forEach((param) => {
                        const [key, value] = param.split("=");
                        params[key] = decodeURIComponent(value);
                    });
                    if (params.edit && params.edit === "true") {
                        setEditMode(true);
                    }
                    return params;
                };

                const queryParams = getQueryParams();
                const projectName = queryParams.project;
                let data = null;
                if (projectName) {
                    data = await fetchData(projectName);
                    setSheetData(data);
                } else {
                    setEditMode(true);
                }
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            };
            fetchAllData();
            setHasLoaded(true);
        }
    }, [
        setHasLoaded,
        fetchData,
        setSheetData,
        setEditMode,
        setIsLoading,
        hasLoaded,
    ]);

if (editMode) {
    
    const addMode = !sheetData.project_title;
    //DATE PICKER
    const handleChange = (date) => {

    setSelectedDate(date);
    setSheetData({ ...sheetData, updated_at: date.toISOString() });
    };
    const handleClose = (state) => {
    setShow(state);
    };

    return (
    <div className="bg-base-300 text-base-content">
        <NavSheet handleEdit={handleEdit} addMode={addMode} sheetData={sheetData} handleImportData={handleImportData} handleDownload={handleDownload}/>
        <div className="max-w-7xl mx-auto pb-20 px-3 2xl:px-0">
        <div>
            <SectionProvider sheetData={sheetData}>
            <AttachmentProvider sheetData={sheetData}>
                <GeneralProvider
                sheetData={sheetData}
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                >
                <SubmitProvider setSheetData={setSheetData} sheetData={sheetData}>
                    <GradingProvider>
                        <div className="mt-4">
                            <div className="bg-base-100 rounded-xl md:p-5 lg:p-5">
                            <EditGeneralSection
                                options={options}
                                show={show}
                                handleClose={handleClose}
                                handleChange={handleChange}
                                openModal={() => setIsOpen(true)}
                                selectedDate={selectedDate}
                                />
                                <EditAttachmentSection/>
                                <EditMandatorySection  openModal={() => setIsOpen(true)}/>
                                <EditBonusSection openModal={() => setIsOpen(true)}/>
                                <EditGradingOptionsSection/>
                            </div>
                            </div>
                    </GradingProvider>
                </SubmitProvider>
                </GeneralProvider>
            </AttachmentProvider>
            </SectionProvider>
        </div>
        
        <FloatingElementsEditSheet 
            showBackToTop={showBackToTop}
            scrollToTop={scrollToTop}
            handleEdit={handleEdit}
            sheetData={sheetData}
            handleImportData={handleImportData}
        />

        
        <InfoModal isOpen={isOpen} closeModal={ () => setIsOpen(false)} />
        
        </div>
    </div>
    );
}

return (
    <div className="bg-base-300 text-base-content min-h-screen">
        <div className="flex gap-3 justify-between max-w-7xl mx-auto px-3 sm:px-5 2xl:px-0 w-full pt-4">
            <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-3 gap-2 sm:gap-4 items-center w-full">
                <div className="flex justify-start">
                    <a href="./">
                        <div className="flex items-center bg-base-100 text-base-content p-2 sm:p-3 rounded-md transition border border-base">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                />
                            </svg>
                        </div>
                    </a>
                </div>
                <h1 className='text-xl sm:text-2xl font-bold text-center truncate px-1'>
                    {sheetData.project_title}
                </h1>
                <div className="flex justify-end">
                    <button
                        onClick={handleEdit}
                        className="w-16 sm:w-20 bg-orange-600 font-bold hover:bg-orange-800 text-white py-2 sm:py-3 px-3 sm:px-6 rounded-md transition text-sm sm:text-base"
                    >
                        EDIT
                    </button>
                </div>
            </div>
        </div>

    <div className="max-w-7xl mx-auto pb-20 pt-4 px-5 2xl:px-0">
        <ViewGeneralInfo sheetData={sheetData} />
        <ViewIntroductionSection sheetData={sheetData} />
        <ViewGuidelinesSection sheetData={sheetData} />
        <ViewAttachmentsSection sheetData={sheetData} />

        {/* MANDATORY SECTIONS */}
        <ViewMandatorySections
            sheetData={sheetData}
            handleYesColor={handleYesColor}
            handleNoColor={handleNoColor}
            mandatoryYesColor={mandatoryYesColor}
            mandatoryNoColor={mandatoryNoColor}
            initialYesColor={initialYesColor}
            initialNoColor={initialNoColor}
            handleMandatorySliderValues={handleMandatorySliderValues}
        />

        {/* BONUS SECTIONS */}
        <ViewBonusSections
            sheetData={sheetData}
            handleYesColorBonus={handleYesColorBonus}
            yesColorBonus={yesColorBonus}
            noColorBonus={noColorBonus}
            handleNoColorBonus={handleNoColorBonus}
            handleBonusSliderValues={handleBonusSliderValues}
            initialYesColor={initialYesColor}
            initialNoColor={initialNoColor}
            />

        {/* GRADING OPTIONS */}
        <ViewGradingOptions
            sheetData={sheetData}
            handleOkColor={handleOkColor}
            okColor={okColor}
            handleOutstandingColor={handleOutstandingColor}
            outstandingColor={outstandingColor}
            handleEmptyWorkColor={handleEmptyWorkColor}
            emptyWorkColor={emptyWorkColor}
            handleIncompleteWorkColor={handleIncompleteWorkColor}
            incompleteWorkColor={incompleteWorkColor}
            handleInvalidCompilationColor={handleInvalidCompilationColor}
            invalidCompilationColor={invalidCompilationColor}
            handleNormeColor={handleNormeColor}
            normeColor={normeColor}
            handleCheatColor={handleCheatColor}
            cheatColor={cheatColor}
            handleCrashColor={handleCrashColor}
            crashColor={crashColor}
            handleConcerningSituationsColor={handleConcerningSituationsColor}
            concerningSituationsColor={concerningSituationsColor}
            handleLeaksColor={handleLeaksColor}
            leaksColor={leaksColor}
            handleForbiddenFunctionsColor={handleForbiddenFunctionsColor}
            forbiddenFunctionsColor={forbiddenFunctionsColor}
            handleCannotSupportColor={handleCannotSupportColor}
            cannotSupportColor={cannotSupportColor}
        />
        <FloatingElementsViewSheet 
            showBackToTop={showBackToTop}
            scrollToTop={scrollToTop}
            handleEdit={handleEdit}
            sheetData={sheetData}
            />
            <div className="fixed bottom-0 left-0 p-4">
            <div
              style={{ zIndex: "99"}}
              className=" bg-base-100 p-4 rounded-lg shadow-lg border border-base"
            >
              <div className="text-lg font-bold text-sky-500">
                <span className="text-base-content">Points : </span> 
                {points >= 100 ? (
                  <span className="text-green-500">
                    {parseFloat(points) + parseFloat(bonusPoints)}
                  </span>
                ) : (
                  <span className="text-red-500">{parseFloat(points)}</span>
                )}
              </div>
            </div>
          </div>
    </div>
    </div>
);
}

export default EditViewSheet;