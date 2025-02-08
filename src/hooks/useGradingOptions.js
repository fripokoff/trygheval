import { useGradingContext } from '../context/GradingContext';

export const useGradingOptions = () => {
  const { gradingOptionsDataFromServer } = useGradingContext();

  const gradingFields = [
    { id: 'ok', label: 'OK' },
    { id: 'outstanding', label: 'Outstanding' },
    { id: 'empty_work', label: 'Empty Work' },
    { id: 'incomplete_work', label: 'Incomplete Work' },
    { id: 'invalid_compilation', label: 'Invalid Compilation' },
    { id: 'norme', label: 'Norme' },
    { id: 'cheat', label: 'Cheat' },
    { id: 'crash', label: 'Crash' },
    { id: 'concerning_situations', label: 'Concerning Situations' },
    { id: 'leaks', label: 'Leaks' },
    { id: 'forbidden_functions', label: 'Forbidden Functions' },
    { id: 'cannot_support', label: 'Cannot Support' }
  ];

  return {
    gradingFields,
    gradingOptionsDataFromServer
  };
};