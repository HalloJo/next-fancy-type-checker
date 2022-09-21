import { TransitionController } from '../types/transition.types';

export function killTransitionControllersTimelines(
  transitionControllers: Set<TransitionController>,
): void {
  transitionControllers.forEach((transitionController) => {
    transitionController.getTimeline('in')?.kill();
    transitionController.getTimeline('out')?.kill();
  });
}
