export interface IOnboardingStep {
  id: string;
  title: string;
  description: string;
  selector: string;
  // Puedes agregar más campos según tus necesidades, como componentes de ayuda, etc.
}

export interface IOnboardingConfig {
  [route: string]: IOnboardingStep[];
}
