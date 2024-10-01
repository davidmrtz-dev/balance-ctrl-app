export interface IOnboardingStep {
  id: string;
  title: string;
  description: string;
  selector: string;
}

export interface IOnboardingConfig {
  [route: string]: IOnboardingStep[];
}
