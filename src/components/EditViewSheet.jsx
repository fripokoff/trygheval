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
import { useNavigate } from "react-router-dom";
import NavigationViewHeader from './navigation/NavigationViewHeader';

function EditViewSheet({selectedDate, setSelectedDate}) {
    const navigate = useNavigate();
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    let [isOpen, setIsOpen] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const { handleSubmit } = useSubmit();
    const [projectInfo, setProjectInfo] = useState([]);
    const [editMode, setEditMode] = useState(localStorage.getItem('editMode') === 'true');
    const [sheetData, setSheetData] = useState({});
    const { isLoading, setIsLoading } = useLoading(true);
    const [isNotExam , setIsNotExam] = useState(true);
    const { okColor, outstandingColor, emptyWorkColor, incompleteWorkColor, invalidCompilationColor, normeColor, cheatColor, crashColor, concerningSituationsColor, leaksColor, forbiddenFunctionsColor, cannotSupportColor, handleOkColor, handleOutstandingColor, handleEmptyWorkColor, handleIncompleteWorkColor, handleInvalidCompilationColor, handleNormeColor, handleCheatColor, handleCrashColor, handleConcerningSituationsColor, handleLeaksColor, handleForbiddenFunctionsColor, handleCannotSupportColor } = useColorHandlers(greenColor, redColor);
    const { hasLoaded, setHasLoaded, options, setOptions, show, setShow, showBackToTop, yesColorBonus, noColorBonus, mandatoryYesColor, mandatoryNoColor, points, bonusPoints, handleImportData, handleYesColor, handleNoColor, handleYesColorBonus, handleNoColorBonus, handleMandatorySliderValues, handleBonusSliderValues } = useAddContentEffects({ okColor, outstandingColor, emptyWorkColor, incompleteWorkColor, invalidCompilationColor, normeColor, cheatColor, crashColor, concerningSituationsColor, leaksColor, forbiddenFunctionsColor, cannotSupportColor }, sheetData, setSheetData, selectedDate, setSelectedDate);
    let lang = localStorage.getItem("lang");
    if(!lang)
        sheetData?.language ? lang = sheetData.language : lang = 'EN';
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
                        
                        if(!editMode && !isScrolling && hasLoaded)
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
        const mandatory_section = localStorage.getItem('ActiveSection');
        setIsLoading(true);
        setIsScrolling(true);
        window.scrollTo(0, 0);
        if (newEditMode) {
            localStorage.setItem('editMode', 'true');
        } else {
            localStorage.setItem('editMode', 'false');
            getCurrentFormData(sheetData, setSheetData, handleSubmit)
        }

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

    const test = {
        "milestones": [
          {
            "milestone": "Milestone 1",
            "projects": [
              { "project": "Libft", "hours": 70, "hour" : true },
            ]
          },
          {
            "milestone": "Milestone 2",
            "projects": [
              { "project": "ft_printf", "hours": 70, "hour" : true },
              { "project": "get_next_line", "hours": 70, "hour" : true },
              { "project": "Born2beroot", "hours": 40, "hour" : true },
            ]
          },
          {
            "milestone": "Milestone 3",
            "projects": [
              { "project" : "Exam_rank_02", "hours" : 2},
              { "project": "push_swap", "hours": 60, "hour" : true },
              { "project": "so_long", "hours": 60, "hour" : true },
              { "project": "fract-ol", "hours": 60 },
              { "project": "FdF", "hours": 60 },
              { "project": "pipex", "hours": 50, "hour" : true },
              { "project": "minitalk", "hours": 50 }
            ]
          },
          {
            "milestone": "Milestone 4",
            "projects": [
              { "project" : "Exam_rank_03", "hours" : 2},
              { "project": "minishell", "hours": 210, "hour" : true },
              { "project": "philosophers", "hours": 70,"hour" : true  }
            ]
          },
          {
            "milestone": "Milestone 5",
            "projects": [
              { "project" : "Exam_rank_04", "hours" : 2},
              { "project": "NetPractice", "hours": 50, "hour" : true },
              { "project": "CPP", "hours": [22, 12, 12, 12, 12], "hour" : true },
              { "project": "miniRT", "hours": 280 },
              { "project": "cub3d", "hours": 280, "hour" : true}
            ]
          },
          {
            "milestone": "Milestone 6",
            "projects": [
              { "project" : "Exam_rank_05", "hours" : 2},
              { "project": "Inception", "hours": 210, "hour" : true },
              { "project": "CPP", "hours": [25, 25, 25, 25, 40], "hour" : true },
              { "project": "Webserv", "hours": 175 },
              { "project": "ft_irc", "hours": 175, "hour" : true }
            ]
          },
          {
            "milestone": "Milestone 7",
            "projects": [
              { "project" : "Exam_rank_06", "hours" : 2},
              { "project": "ft_transcendence", "hours": 210, "hour" : true }
            ]
          }
        ]
      };

    const findCurrentAndNextProject = (currentProject) => {
    let found = false;
    let nextProject = null;
    
    for (const milestone of test.milestones) {
        for (let i = 0; i < milestone.projects.length; i++) {
        if (found) {
            nextProject = milestone.projects[i].project;
            return { current: currentProject, next: nextProject };
        }
        if (milestone.projects[i].project === currentProject) {
            found = true;
            if (i + 1 < milestone.projects.length) {
            nextProject = milestone.projects[i + 1].project;
            return { current: currentProject, next: nextProject };
            }
        }
        }
    }
    return { current: currentProject, next: null };
    };

    useState(() => {
        if (!hasLoaded) {
            const fetchAllData = async () => {
                const getQueryParams = () => {
                    const params = {};
                    const hash = window.location.hash;
                    const queryString = hash.split('?')[1] || '';
                    
                    if (queryString) {
                        const queryArray = queryString.split("&");
                        queryArray.forEach((param) => {
                            const [key, value] = param.split("=");
                            if (key && value) {
                                params[key] = decodeURIComponent(value);
                            }
                        });
                    }
                    return params;
                };
                if(localStorage.getItem('editMode') === 'true')
                    setEditMode(true);
                const queryParams = getQueryParams();
                const projectName = queryParams.project;
                let data = null;
                if(projectName.includes('Exam'))
                {
                    setIsNotExam(false);
                }
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
                                sheetData={sheetData}
                                />
                                <EditAttachmentSection/>
                                <EditMandatorySection 
                                openModal={() => setIsOpen(true)}
                                sheetData={sheetData}
                                isNotExam={isNotExam}
                                />
                                <EditBonusSection
                                openModal={() => setIsOpen(true)}
                                sheetData={sheetData}
                                isNotExam={isNotExam}
                                />
                                <EditGradingOptionsSection show={isNotExam}/>
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

        <NavigationViewHeader 
        handleEdit={handleEdit}
        sheetData={sheetData}
        inView={true}
        />

        </div>

    <div className="max-w-7xl mx-auto pb-20 pt-4 px-5 2xl:px-0">
        <ViewGeneralInfo sheetData={sheetData} />
        <ViewIntroductionSection sheetData={sheetData} />
        <ViewGuidelinesSection sheetData={sheetData} />
        <ViewAttachmentsSection sheetData={sheetData} isNotExam={isNotExam}/>

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
            isNotExam={isNotExam}
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
            isNotExam={isNotExam}
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
            show={isNotExam}
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