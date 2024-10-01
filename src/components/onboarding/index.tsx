import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { RootState } from '../../app/store';
import { onboardingConfig } from '../../features/onboarding/config/onboardingConfig';
import { completeOnboarding, setCurrentStep, skipOnboarding } from '../../features/onboarding/onboardingSlice';
import useWindowSize from '../../hooks/useWindowSize';
import './onboarding.css';

interface OnboardingProps {
  route: string;
}

const Onboarding: React.FC<OnboardingProps> = ({ route }) => {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state: RootState) => state.onboarding.currentStep[route] || 0);
  const completed = useAppSelector((state: RootState) => state.onboarding.completed[route]);
  const skipped = useAppSelector((state: RootState) => state.onboarding.skipped[route]);

  const steps = onboardingConfig[route];
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [dialogPosition, setDialogPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [hasScrolled, setHasScrolled] = useState(false);

  const windowSize = useWindowSize();

  const calculateDialogPosition = (rect: DOMRect) => {
    const dialogWidth = 360;
    const dialogHeight = 200;
    let top = rect.top + window.scrollY;
    let left = rect.right + window.scrollX + 10;

    if (left + dialogWidth > window.innerWidth + window.scrollX) {
      left = rect.left + window.scrollX - dialogWidth - 10;
    }

    if (top + dialogHeight > window.innerHeight + window.scrollY) {
      top = rect.top + window.scrollY - dialogHeight - 10;
    }

    if (top < window.scrollY) {
      top = window.scrollY + 10;
    }

    setDialogPosition({ top, left });
  };

  useEffect(() => {
    if (steps && steps[currentStep].selector) {
      const element = document.querySelector(steps[currentStep].selector) as HTMLElement;
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);

        const isInView =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth);

        if (!isInView && !hasScrolled) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHasScrolled(true);

          setTimeout(() => {
            const newRect = element.getBoundingClientRect();
            setTargetRect(newRect);
            calculateDialogPosition(newRect);
          }, 500);
        } else {
          calculateDialogPosition(rect);
        }
      } else {
        setTargetRect(null);
      }
    }
  }, [currentStep, steps, hasScrolled]);

  useEffect(() => {
    const updatePosition = () => {
      if (steps && steps[currentStep].selector) {
        const element = document.querySelector(steps[currentStep].selector) as HTMLElement;
        if (element) {
          const rect = element.getBoundingClientRect();
          setTargetRect(rect);
          calculateDialogPosition(rect);
        }
      }
    };

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep, steps]);

  useEffect(() => {
    setHasScrolled(false);
  }, [currentStep]);

  if (completed || skipped || !steps || windowSize.width < 1100) {
    return null;
  }

  const handleNext = () => {
    if (currentStep + 1 >= steps.length) {
      dispatch(completeOnboarding(route));
    } else {
      dispatch(setCurrentStep({ route, step: currentStep + 1 }));
    }
  };

  const handleBack = () => {
    dispatch(setCurrentStep({ route, step: currentStep - 1 }));
  };

  const handleSkip = () => {
    dispatch(skipOnboarding(route));
  };

  const step = steps[currentStep];

  return (
    <>
      {targetRect && (
        <div
          className="onboarding-highlight"
          style={{
            top: targetRect.top + window.scrollY - 5,
            left: targetRect.left + window.scrollX - 5,
            width: targetRect.width + 10,
            height: targetRect.height + 10,
          }}
        />
      )}
      {targetRect && <div className="onboarding-overlay" />}
      {targetRect && (
        <div
          className="onboarding-content"
          style={{
            top: dialogPosition.top,
            left: dialogPosition.left,
          }}
        >
          <h2>{step.title}</h2>
          <p>{step.description}</p>
          <div className="onboarding-actions">
            <button onClick={handleSkip}>Skip</button>
            <button onClick={handleBack} disabled={currentStep === 0}>
              Back
            </button>
            <button onClick={handleNext}>
              {currentStep + 1 === steps.length ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Onboarding;
