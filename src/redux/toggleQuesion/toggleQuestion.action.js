import ToggleQuestionTypes from './toggleQuestion.types';

const setToggle = (toggleOption) => ({
    type:ToggleQuestionTypes.SET_TOGGLE,
    payload:toggleOption,
});

export default setToggle;