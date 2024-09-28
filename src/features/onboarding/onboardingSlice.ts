import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardingState {
  currentStep: { [route: string]: number };
  completed: { [route: string]: boolean };
  skipped: { [route: string]: boolean };
}

const initialState: OnboardingState = {
  currentStep: {},
  completed: {},
  skipped: {},
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentStep(state, action: PayloadAction<{ route: string; step: number }>) {
      const { route, step } = action.payload;
      state.currentStep[route] = step;
    },
    completeOnboarding(state, action: PayloadAction<string>) {
      state.completed[action.payload] = true;
    },
    skipOnboarding(state, action: PayloadAction<string>) {
      state.skipped[action.payload] = true;
    },
  },
});

export const { setCurrentStep, completeOnboarding, skipOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;
