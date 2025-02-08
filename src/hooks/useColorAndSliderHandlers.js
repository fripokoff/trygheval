import { useState } from 'react';

const useColorAndSliderHandlers = (
    initialYesColor,
    initialNoColor,
    clickedYesColor,
    clickedNoColor
) => {
    const [yesColorBonus, setYesColorBonus] = useState([]);
    const [noColorBonus, setNoColorBonus] = useState([]);
    const [preliminaryYesColor, setPreliminaryYesColor] = useState([]);
    const [preliminaryNoColor, setPreliminaryNoColor] = useState([]);
    const [mandatoryYesColor, setMandatoryYesColor] = useState([]);
    const [mandatoryNoColor, setMandatoryNoColor] = useState([]);
    const [preliminarySliderValues, setPreliminarySliderValues] = useState([]);
    const [mandatorySliderValues, setMandatorySliderValues] = useState([]);
    const [bonusSliderValues, setBonusSliderValues] = useState([]);

    const handleYesColor = (index, sectionType = 'mandatory') => {
        if (sectionType === 'mandatory') {
            setMandatoryYesColor(prevColors => {
                const newColors = [...prevColors];
                newColors[index] = clickedYesColor;
                return newColors;
            });
            setMandatoryNoColor(prevColors => {
                const newColors = [...prevColors];
                newColors[index] = initialNoColor;
                return newColors;
            });
        } else if (sectionType === 'preliminary') {
            setPreliminaryYesColor(prevColors => {
                const newColors = [...prevColors];
                newColors[index] = clickedYesColor;
                return newColors;
            });
            setPreliminaryNoColor(prevColors => {
                const newColors = [...prevColors];
                newColors[index] = initialNoColor;
                return newColors;
            });
        }
    };

    const handleNoColor = (index, sectionType = 'mandatory') => {
        if (sectionType === 'mandatory') {
            setMandatoryNoColor(prevColors => {
                const newColors = [...prevColors];
                newColors[index] = clickedNoColor;
                return newColors;
            });
            setMandatoryYesColor(prevColors => {
                const newColors = [...prevColors];
                newColors[index] = initialYesColor;
                return newColors;
            });
        } else if (sectionType === 'preliminary') {
            setPreliminaryNoColor(prevColors => {
                const newColors = [...prevColors];
                newColors[index] = clickedNoColor;
                return newColors;
            });
            setPreliminaryYesColor(prevColors => {
                const newColors = [...prevColors];
                newColors[index] = initialYesColor;
                return newColors;
            });
        }
    };

    const handleYesColorBonus = (index) => {
        let temp = [...yesColorBonus];
        let temp2 = [...noColorBonus];

        if (temp[index] === initialYesColor) {
            temp[index] = clickedYesColor;
            temp2[index] = initialNoColor;
        }

        setYesColorBonus(temp);
        setNoColorBonus(temp2);
    };

    const handleNoColorBonus = (index) => {
        let temp = [...noColorBonus];
        let temp2 = [...yesColorBonus];

        if (temp[index] === initialNoColor) {
            temp[index] = clickedNoColor;
            temp2[index] = initialYesColor;
        } else {
            temp[index] = initialNoColor;
        }

        setNoColorBonus(temp);
        setYesColorBonus(temp2);
    };

    const handleMandatorySliderValues = (index, value, sectionType = 'mandatory') => {
        if (sectionType === 'mandatory') {
            setMandatorySliderValues(prevValues => {
                const newValues = [...prevValues];
                newValues[index] = value;
                return newValues;
            });
        } else if (sectionType === 'preliminary') {
            setPreliminarySliderValues(prevValues => {
                const newValues = [...prevValues];
                newValues[index] = value;
                return newValues;
            });
        }
    };

    const handleBonusSliderValues = (index, value) => {
        setBonusSliderValues(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
    };

    return {
        yesColorBonus,
        setYesColorBonus,
        noColorBonus,
        setNoColorBonus,
        preliminaryYesColor,
        setPreliminaryYesColor,
        preliminaryNoColor,
        setPreliminaryNoColor,
        mandatoryYesColor,
        setMandatoryYesColor,
        mandatoryNoColor,
        setMandatoryNoColor,
        preliminarySliderValues,
        setPreliminarySliderValues,
        mandatorySliderValues,
        setMandatorySliderValues,
        bonusSliderValues,
        setBonusSliderValues,
        handleYesColor,
        handleNoColor,
        handleYesColorBonus,
        handleNoColorBonus,
        handleMandatorySliderValues,
        handleBonusSliderValues
    };
};

export default useColorAndSliderHandlers;