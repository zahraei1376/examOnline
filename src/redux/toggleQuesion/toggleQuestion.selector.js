import { createSelector } from 'reselect';

const Toggle = state =>state.toggle;

export const ToggleQuestion = createSelector(
    [Toggle],
    (toggle)=>toggle.toggle,
);