import { useState } from 'react';
import { clickedGreenColor, clickedRedColor} from '../constants/colors';

const useColorHandlers = (greenColor, redColor) => {

    const [okColor, setOkColor] = useState(greenColor);
    const [outstandingColor, setOutstandingColor] = useState(greenColor);
    const [emptyWorkColor, setEmptyWorkColor] = useState(redColor);
    const [incompleteWorkColor, setIncompleteWorkColor] = useState(redColor);
    const [invalidCompilationColor, setInvalidCompilationColor] = useState(redColor);
    const [normeColor, setNormeColor] = useState(redColor);
    const [cheatColor, setCheatColor] = useState(redColor);
    const [crashColor, setCrashColor] = useState(redColor);
    const [concerningSituationsColor, setConcerningSituationsColor] = useState(redColor);
    const [leaksColor, setLeaksColor] = useState(redColor);
    const [forbiddenFunctionsColor, setForbiddenFunctionsColor] = useState(redColor);
    const [cannotSupportColor, setCannotSupportColor] = useState(redColor);

    const setAllColorToDefault = () => {
        setOkColor(greenColor);
        setOutstandingColor(greenColor);
        setEmptyWorkColor(redColor);
        setIncompleteWorkColor(redColor);
        setInvalidCompilationColor(redColor);
        setNormeColor(redColor);
        setCheatColor(redColor);
        setCrashColor(redColor);
        setConcerningSituationsColor(redColor);
        setLeaksColor(redColor);
        setForbiddenFunctionsColor(redColor);
        setCannotSupportColor(redColor);
    };

    const handleOkColor = () => {
        if (okColor === greenColor) {
            setAllColorToDefault();
            setOkColor(clickedGreenColor);
        } else {
            setOkColor(greenColor);
        }
    };

    const handleOutstandingColor = () => {
        if (outstandingColor === greenColor) {
            setAllColorToDefault();
            setOutstandingColor(clickedGreenColor);
        } else {
            setOutstandingColor(greenColor);
        }
    };

    const handleEmptyWorkColor = () => {
        if (emptyWorkColor === redColor) {
            setAllColorToDefault();
            setEmptyWorkColor(clickedRedColor);
        } else {
            setEmptyWorkColor(redColor);
        }
    };

    const handleIncompleteWorkColor = () => {
        if (incompleteWorkColor === redColor) {
            setAllColorToDefault();
            setIncompleteWorkColor(clickedRedColor);
        } else {
            setIncompleteWorkColor(redColor);
        }
    };

    const handleInvalidCompilationColor = () => {
        if (invalidCompilationColor === redColor) {
            setAllColorToDefault();
            setInvalidCompilationColor(clickedRedColor);
        } else {
            setInvalidCompilationColor(redColor);
        }
    };

    const handleNormeColor = () => {
        if (normeColor === redColor) {
            setAllColorToDefault();
            setNormeColor(clickedRedColor);
        } else {
            setNormeColor(redColor);
        }
    };

    const handleCheatColor = () => {
        if (cheatColor === redColor) {
            setAllColorToDefault();
            setCheatColor(clickedRedColor);
        } else {
            setCheatColor(redColor);
        }
    };

    const handleCrashColor = () => {
        if (crashColor === redColor) {
            setAllColorToDefault();
            setCrashColor(clickedRedColor);
        } else {
            setCrashColor(redColor);
        }
    };

    const handleConcerningSituationsColor = () => {
        if (concerningSituationsColor === redColor) {
            setAllColorToDefault();
            setConcerningSituationsColor(clickedRedColor);
        } else {
            setConcerningSituationsColor(redColor);
        }
    };

    const handleLeaksColor = () => {
        if (leaksColor === redColor) {
            setAllColorToDefault();
            setLeaksColor(clickedRedColor);
        } else {
            setLeaksColor(redColor);
        }
    };

    const handleForbiddenFunctionsColor = () => {
        if (forbiddenFunctionsColor === redColor) {
            setAllColorToDefault();
            setForbiddenFunctionsColor(clickedRedColor);
        } else {
            setForbiddenFunctionsColor(redColor);
        }
    };

    const handleCannotSupportColor = () => {
        if (cannotSupportColor === redColor) {
            setAllColorToDefault();
            setCannotSupportColor(clickedRedColor);
        } else {
            setCannotSupportColor(redColor);
        }
    };

    return {
        okColor,
        outstandingColor,
        emptyWorkColor,
        incompleteWorkColor,
        invalidCompilationColor,
        normeColor,
        cheatColor,
        crashColor,
        concerningSituationsColor,
        leaksColor,
        forbiddenFunctionsColor,
        cannotSupportColor,
        handleOkColor,
        handleOutstandingColor,
        handleEmptyWorkColor,
        handleIncompleteWorkColor,
        handleInvalidCompilationColor,
        handleNormeColor,
        handleCheatColor,
        handleCrashColor,
        handleConcerningSituationsColor,
        handleLeaksColor,
        handleForbiddenFunctionsColor,
        handleCannotSupportColor
    };
};

export default useColorHandlers;