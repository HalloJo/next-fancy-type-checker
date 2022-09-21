import gsap from 'gsap';
import { TransitionDirection, TransitionRef } from '../types/transition.types';
import { findTransitionController } from '../context/TransitionControllers';
import { cloneTimeline } from '../utils/timeline.utils';

export function getTimeline(
  ref: TransitionRef,
  direction: TransitionDirection = 'in',
): gsap.core.Timeline {
  const controller = findTransitionController(ref);

  if (controller) {
    let timeline = controller.getTimeline(direction, true);

    if (timeline) {
      timeline = cloneTimeline(timeline, direction);
      timeline.restart(true);

      return timeline;
    }
  }

  return gsap.timeline();
}
