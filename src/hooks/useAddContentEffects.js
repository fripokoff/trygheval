import { useState, useEffect, useCallback, useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';
import { initialYesColor, initialNoColor, clickedYesColor, clickedNoColor } from '../constants/colors';

function useAddContentEffects(
    colorHandlers,
    sheetData,
    setSheetData,
    selectedDate,
    setSelectedDate
) {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [options, setOptions] = useState({});
    const [show, setShow] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [yesColorBonus, setYesColorBonus] = useState([]);
    const [noColorBonus, setNoColorBonus] = useState([]);
    const [mandatoryYesColor, setMandatoryYesColor] = useState([]);
    const [mandatoryNoColor, setMandatoryNoColor] = useState([]);
    const [mandatorySliderValues, setMandatorySliderValues] = useState([]);
    const [bonusSliderValues, setBonusSliderValues] = useState([]);
    const [pointsState, setPointsState] = useState(0);
    const [bonusPointsState, setBonusPointsState] = useState(0);
    const { addToast } = useContext(ToastContext);

    const handleAddToast = ({type, msg, position}) => {
    addToast({
        type: type,
        message: msg,
        duration: 5000,
        position: position,
        dismissable: true,
        animationIn: 'slide-in-right',
        animationOut: 'slide-out-left',
        animationSpeed: 0.5,
    });
    };

    useEffect(() => {
        setOptions({
            title: "Updated at",
            autoHide: true,
            todayBtn: true,
            clearBtn: true,
            clearBtnText: "Clear",
            maxDate: new Date("2030-01-01"),
            minDate: new Date("2023-01-01"),
            theme: {
                background: "bg-white dark:bg-[#121212]",
                todayBtn: "bg-blue-700",
                clearBtn: "bg-white dark:bg-[#121212]",
                icons: "bg-white dark:bg-[#121212]",
                text: "bg-white dark:bg-[#121212]",
                disabledText: "bg-white dark:bg-[#121212]",
                input: "bg-white dark:bg-[#121212]",
                inputIcon: "bg-white dark:bg-[#121212]",
                selected: "bg-white dark:bg-[#121212]",
            },
            icons: {
                prev: () => ` < `,
                next: () => ` > `,
            },
            datepickerClassNames: "top-12",
            defaultDate: new Date(),
            language: "en",
            disabledDates: [],
            weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            inputNameProp: "date",
            inputIdProp: "date",
            inputPlaceholderProp: "Select Date",
            inputDateFormatProp: {
                day: "numeric",
                month: "numeric",
                year: "numeric",
            },
        });
    }, []);

    const handleImportData = async (json) => {

        try {
            const data = JSON.parse(json);
            setSheetData(data.data[0]);
            handleAddToast({
                type: 'success',
                msg: 'Sheet imported successfully',
                position: 'top-right'
              })
        } catch (e) {
            console.error("Erreur lors de l'import:", e);
            handleAddToast({
                type: 'error',
                msg: 'Error importing sheet',
                position: 'bottom-right'
                })
            }
    };

    useEffect(() => {
        setOptions(prevOptions => ({
            ...prevOptions,
            defaultDate: selectedDate,
            language: "en",
            inputDateFormatProp: {
                day: "numeric",
                month: "numeric",
                year: "numeric"
            },
            selectedDates: [selectedDate],
            defaultValue: selectedDate
        }));
    }, [selectedDate]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                setShowBackToTop(true)
            } else {
                setShowBackToTop(false)
            }
        })
    }, []);

    useEffect(() => {
        let tempYesBonus = [];
        let tempNoBonus = [];
        let tempMandatoryYes = [];
        let tempMandatoryNo = [];
        let tempSliderMandatory = [];
        let tempSliderBonus = [];
    
        if (sheetData.bonusSections && sheetData.bonusSections.length > 0) {
            for (let i = 0; i < sheetData.bonusSections.length; i++) {
                tempYesBonus.push(initialYesColor);
                tempNoBonus.push(initialNoColor);
            }
        }
    
        if (sheetData.mandatorySections && sheetData.mandatorySections.length > 0) {
            for (let i = 0; i < sheetData.mandatorySections.length; i++) {
                tempMandatoryYes.push(initialYesColor);
                tempMandatoryNo.push(initialNoColor);
            }
        }
    
        if (sheetData.mandatorySections && sheetData.bonusSections) {
            const mandatorySectionsWithSliders = sheetData.mandatorySections.filter((section) => !section.yes_no);
            for (let i = 0; i < mandatorySectionsWithSliders.length; i++) {
                tempSliderMandatory.push(0);
            }
    
            const bonusSectionsWithSliders = sheetData.bonusSections.filter((section) => !section.yes_no);
            for (let i = 0; i < bonusSectionsWithSliders.length; i++) {
                tempSliderBonus.push(0);
            }
        }
    
        setYesColorBonus(tempYesBonus);
        setNoColorBonus(tempNoBonus);
        setMandatoryYesColor(tempMandatoryYes);
        setMandatoryNoColor(tempMandatoryNo);
        setMandatorySliderValues(tempSliderMandatory);
        setBonusSliderValues(tempSliderBonus);
    }, [sheetData.mandatorySections, sheetData.bonusSections, setYesColorBonus, setNoColorBonus, setMandatoryYesColor, setMandatoryNoColor, setMandatorySliderValues, setBonusSliderValues]);


    const calculatePoints = useCallback(() => {
        let mandatoryPoints = 0;
        let bonusPoints = 0

        if (sheetData.mandatorySections && sheetData.mandatorySections.length > 0) {
            sheetData.mandatorySections.forEach((section, index) => {
                if (section.yes_no) {
                    if (mandatoryYesColor[index] === clickedYesColor) {
                        mandatoryPoints += 100 / sheetData.mandatorySections.length;
                    }
                } else {
                    mandatoryPoints += (parseFloat(mandatorySliderValues[index]) / 100) * (100 / sheetData.mandatorySections.length);
                    mandatoryPoints = isNaN(mandatoryPoints) ? 0 : mandatoryPoints
                }
            });
        }

        if (sheetData.bonusSections && sheetData.bonusSections.length > 0) {
            sheetData.bonusSections.forEach((section, index) => {
                if (section.yes_no) {
                    if (yesColorBonus[index] === clickedYesColor) {
                        bonusPoints += 25 / sheetData.bonusSections.length
                    }
                } else {
                    bonusPoints += (parseFloat(bonusSliderValues[index]) / 100) * (25 / sheetData.bonusSections.length);
                    bonusPoints = isNaN(bonusPoints) ? 0 : bonusPoints
                }
            });
        }
        const totalMandatorySections = sheetData.mandatorySections ? sheetData.mandatorySections.length : 0;

        if (totalMandatorySections > 0) {
            mandatoryPoints = (mandatoryPoints / totalMandatorySections) * totalMandatorySections;
        }
        mandatoryPoints = Math.trunc(mandatoryPoints);
        bonusPoints = Math.trunc(bonusPoints);
        setPointsState(mandatoryPoints );

        if (bonusPoints % 1 !== 0) {
            setBonusPointsState(bonusPoints.toFixed(1))
        } else {
            setBonusPointsState(bonusPoints)
        }

    }, [sheetData, mandatoryYesColor, mandatorySliderValues, yesColorBonus, bonusSliderValues]);

    useEffect(() => {
        calculatePoints()
    }, [colorHandlers.okColor, colorHandlers.outstandingColor, colorHandlers.emptyWorkColor, colorHandlers.incompleteWorkColor, colorHandlers.invalidCompilationColor, colorHandlers.normeColor, colorHandlers.cheatColor, colorHandlers.crashColor, colorHandlers.concerningSituationsColor, colorHandlers.leaksColor, colorHandlers.forbiddenFunctionsColor, colorHandlers.cannotSupportColor, mandatoryYesColor, mandatoryNoColor, mandatorySliderValues, bonusSliderValues, yesColorBonus, noColorBonus, sheetData.mandatorySections, sheetData.bonusSections, calculatePoints]);

    const handleYesColor = useCallback((index, sectionType = "mandatory") => {
        if (sectionType === "mandatory") {
            setMandatoryYesColor((prevColors) => {
                const newColors = [...prevColors];
                newColors[index] = clickedYesColor;
                return newColors;
            });
            setMandatoryNoColor((prevColors) => {
                const newColors = [...prevColors];
                newColors[index] = initialNoColor;
                return newColors;
            });
        }
    }, [setMandatoryYesColor, setMandatoryNoColor]);

    const handleNoColor = useCallback((index, sectionType = "mandatory") => {
        if (sectionType === "mandatory") {
            setMandatoryNoColor((prevColors) => {
                const newColors = [...prevColors];
                newColors[index] = clickedNoColor;
                return newColors;
            });
            setMandatoryYesColor((prevColors) => {
                const newColors = [...prevColors];
                newColors[index] = initialYesColor;
                return newColors;
            });
        }
    }, [setMandatoryNoColor, setMandatoryYesColor]);

    const handleYesColorBonus = useCallback((index) => {
        setYesColorBonus((prevColors) => {
            const newColors = [...prevColors];
            newColors[index] = clickedYesColor;
            return newColors;
        });
        setNoColorBonus((prevColors) => {
            const newColors = [...prevColors];
            newColors[index] = initialNoColor;
            return newColors;
        });
    }, [setYesColorBonus, setNoColorBonus]);

    const handleNoColorBonus = useCallback((index) => {
        setNoColorBonus((prevColors) => {
            const newColors = [...prevColors];
            newColors[index] = clickedNoColor;
            return newColors;
        });
        setYesColorBonus((prevColors) => {
            const newColors = [...prevColors];
            newColors[index] = initialYesColor;
            return newColors;
        });
    }, [setNoColorBonus, setYesColorBonus]);

    const handleMandatorySliderValues = useCallback((index, value, sectionType = "mandatory") => {
        if (sectionType === "mandatory") {
            setMandatorySliderValues((prevValues) => {
                const newValues = [...prevValues];
                newValues[index] = value;
                return newValues;
            });
        }
        calculatePoints();
    }, [setMandatorySliderValues, calculatePoints]);

    const handleBonusSliderValues = useCallback((index, value) => {
        setBonusSliderValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
        calculatePoints();
    }, [setBonusSliderValues, calculatePoints]);
    
    return {
        hasLoaded,
        setHasLoaded,
        options,
        setOptions,
        selectedDate,
        setSelectedDate,
        show,
        setShow,
        showBackToTop,
        yesColorBonus,
        noColorBonus,
        mandatoryYesColor,
        mandatoryNoColor,
        points: pointsState,
        bonusPoints: bonusPointsState,
        handleImportData,
        handleYesColor,
        handleNoColor,
        handleYesColorBonus,
        handleNoColorBonus,
        handleMandatorySliderValues,
        handleBonusSliderValues,
    };
}

export default useAddContentEffects;