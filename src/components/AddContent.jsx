import { SectionProvider } from "../context/SectionContext";
import { GeneralProvider } from "../context/GeneralContext";
import { SubmitProvider } from "../context/SubmitContext";
import { useSubmit } from "../context/SubmitContext";
import SheetForm from "../components/SheetForm";
import { AttachmentProvider } from "../context/AttachmentContext";
import { GradingProvider } from "../context/GradingContext";
import LoadingSheet from "../components/LoadingSheet";
import SheetHeader from "../components/SheetHeader";
import { useState, useEffect } from "react";
import useColorHandlers from "../hooks/useColorHandlers";
import useAddContentEffects from "../hooks/useAddContentEffects";
import GeneralInfo from "../components/sheet/GeneralInfo";
import IntroductionSection from "../components/sheet/IntroductionSection";
import GuidelinesSection from "../components/sheet/GuidelinesSection";
import AttachmentsSection from "../components/sheet/AttachmentsSection";
import ViewMandatorySections from "../components/sheet//ViewMandatorySections";
import BonusSections from "../components/sheet/BonusSections";
import GradingOptions from "../components/sheet/GradingOptions";
import InfoModal from "../components/InfoModal";
import { formatText } from "../utils";
import { initialYesColor, initialNoColor, greenColor, redColor } from '../constants/colors';
import FloatingElementsViewSheet from "../components/FloatingElementsViewSheet";
import FloatingElementsEditSheet from "../components/FloatingElementsEditSheet";
import {getCurrentFormData, fetchData} from "../dataHandlers";
import { useLocation } from "react-router-dom";

function AddContent({selectedDate, setSelectedDate}) {

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    let [isOpen, setIsOpen] = useState(false);
    const { hash } = useLocation();
    const [lastMandatorySection, setLastMandatorySection] = useState(null);
    const { handleSubmit } = useSubmit();
    const [editMode, setEditMode] = useState(false);
    const [sheetData, setSheetData] = useState({});
    const [loadingSheet, setLoadingSheet] = useState(true);
    const { okColor, outstandingColor, emptyWorkColor, incompleteWorkColor, invalidCompilationColor, normeColor, cheatColor, crashColor, concerningSituationsColor, leaksColor, forbiddenFunctionsColor, cannotSupportColor, handleOkColor, handleOutstandingColor, handleEmptyWorkColor, handleIncompleteWorkColor, handleInvalidCompilationColor, handleNormeColor, handleCheatColor, handleCrashColor, handleConcerningSituationsColor, handleLeaksColor, handleForbiddenFunctionsColor, handleCannotSupportColor } = useColorHandlers(greenColor, redColor);
    const { hasLoaded, setHasLoaded, options, setOptions, show, setShow, showBackToTop, yesColorBonus, noColorBonus, mandatoryYesColor, mandatoryNoColor, points, bonusPoints, handleImportData, handleYesColor, handleNoColor, handleYesColorBonus, handleNoColorBonus, handleMandatorySliderValues, handleBonusSliderValues } = useAddContentEffects({ okColor, outstandingColor, emptyWorkColor, incompleteWorkColor, invalidCompilationColor, normeColor, cheatColor, crashColor, concerningSituationsColor, leaksColor, forbiddenFunctionsColor, cannotSupportColor }, sheetData, setSheetData, selectedDate, setSelectedDate);
    const handleEdit = () => {
        // Get current hash
        const currentHash = window.location.hash;
        const newEditMode = !editMode;
        let newUrl;
    
        // Construire l'URL en préservant le hash
        if (newEditMode) {
            newUrl = `${window.location.pathname}?project=${sheetData.project_title}&edit=true${currentHash}`;
        } else {
            newUrl = `${window.location.pathname}?project=${sheetData.project_title}${currentHash}`;
        }
    
        // Mettre à jour l'URL sans recharger la page
        window.history.pushState({}, "", newUrl);

        setEditMode(newEditMode);
    };

    const handleDownload = () => {
        handleSubmit(true, getCurrentFormData(sheetData, setSheetData, handleSubmit));
    };

    useEffect(() => {
        // Check if there's an active section in localStorage
        const activeSection = localStorage.getItem('activeSection');
        if (activeSection) {
          // Scroll to the active section
          const element = document.getElementById(activeSection);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          // Remove the active section from localStorage
          localStorage.removeItem('activeSection');
        }
      }, [hash]);

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

                setLoadingSheet(false);
            };
            fetchAllData();
            setHasLoaded(true);
        }
    }, [
        setHasLoaded,
        fetchData,
        setSheetData,
        setEditMode,
        setLoadingSheet,
        hasLoaded,
    ]);
    
    if (loadingSheet) {
        return <LoadingSheet />;
    }

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
        <SheetHeader handleEdit={handleEdit} addMode={addMode} sheetData={sheetData} handleImportData={handleImportData} handleDownload={handleDownload}/>
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
                    <SheetForm
                        sheetData={sheetData}
                        options={options}
                        show={show}
                        handleClose={handleClose}
                        handleChange={handleChange}
                        selectedDate={selectedDate}
                        openModal={ () => setIsOpen(true)}
                        editMode={editMode}
                    />
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
                        className="w-16 sm:w-20 bg-orange-700 hover:bg-orange-800 text-white py-2 sm:py-3 px-3 sm:px-6 rounded-md transition text-sm sm:text-base"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>

    <div className="max-w-7xl mx-auto pb-20 pt-4 px-5 2xl:px-0">
        <GeneralInfo sheetData={sheetData} />
        <IntroductionSection sheetData={sheetData} formatText={formatText} />
        <GuidelinesSection sheetData={sheetData} formatText={formatText} />
        <AttachmentsSection sheetData={sheetData} />

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
            setLastMandatorySection={setLastMandatorySection}

        />

        {/* BONUS SECTIONS */}
        <BonusSections
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
        <GradingOptions
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

export default AddContent;