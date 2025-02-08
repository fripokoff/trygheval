import { useCallback } from 'react';
import { initialYesColor, initialNoColor, clickedYesColor, clickedNoColor } from '../constants/colors';

const useHandlers = (
    setMandatoryYesColor,
    setMandatoryNoColor,
    setPreliminaryYesColor,
    setPreliminaryNoColor,
    setYesColorBonus,
    setNoColorBonus,
    setMandatorySliderValues,
    setPreliminarySliderValues,
    setBonusSliderValues,
    calculatePoints
) => {
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
        } else if (sectionType === "preliminary") {
            setPreliminaryYesColor((prevColors) => {
                const newColors = [...prevColors];
                newColors[index] = clickedYesColor;
                return newColors;
            });
            setPreliminaryNoColor((prevColors) => {
                const newColors = [...prevColors];
                newColors[index] = initialNoColor;
                return newColors;
            });
        }
    }, [setMandatoryYesColor, setMandatoryNoColor, setPreliminaryYesColor, setPreliminaryNoColor, clickedYesColor, initialNoColor]);

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
        } else if (sectionType === "preliminary") {
            setPreliminaryNoColor((prevColors) => {
                const newColors = [...prevColors];
                newColors[index] = clickedNoColor;
                return newColors;
            });
            setPreliminaryYesColor((prevColors) => {
                const newColors = [...prevColors];
                newColors[index] = initialYesColor;
                return newColors;
            });
        }
    }, [setMandatoryNoColor, setMandatoryYesColor, setPreliminaryNoColor, setPreliminaryYesColor, clickedNoColor, initialYesColor]);

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
    }, [setYesColorBonus, setNoColorBonus, clickedYesColor, initialNoColor]);

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
    }, [setNoColorBonus, setYesColorBonus, clickedNoColor, initialYesColor]);

    const handleMandatorySliderValues = useCallback((index, value, sectionType = "mandatory") => {
        if (sectionType === "mandatory") {
            setMandatorySliderValues((prevValues) => {
                const newValues = [...prevValues];
                newValues[index] = value;
                return newValues;
            });
        } else if (sectionType === "preliminary") {
            setPreliminarySliderValues((prevValues) => {
                const newValues = [...prevValues];
                newValues[index] = value;
                return newValues;
            });
        }
        calculatePoints();
    }, [setMandatorySliderValues, setPreliminarySliderValues, calculatePoints]);

    const handleBonusSliderValues = useCallback((index, value) => {
        setBonusSliderValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
        calculatePoints();
    }, [setBonusSliderValues, calculatePoints]);

    return {
        handleYesColor,
        handleNoColor,
        handleYesColorBonus,
        handleNoColorBonus,
        handleMandatorySliderValues,
        handleBonusSliderValues,
    };
};

export default useHandlers;