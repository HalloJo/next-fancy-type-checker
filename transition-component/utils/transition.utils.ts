import gsap from 'gsap';
import type {
  SetupTimelineOptions,
  SetupTransitionOptions,
  TransitionController,
  TransitionDirection,
  TransitionOptions,
  TransitionOptionsWithDirection,
} from '../types/transition.types';
import { clearTimeline } from './timeline.utils';

/**
 * Creates the TransitionController
 *
 * @param setupOptions
 * @returns
 */
export function createTransitionController<T, V>(
  setupOptions: SetupTransitionOptions<T, V>,
): TransitionController {
  const timelines: Record<TransitionDirection, gsap.core.Timeline | undefined> = {
    in: undefined,
    out: undefined,
  };

  const controller: TransitionController = {
    ref: setupOptions.ref,

    /**
     * Function to get one of the timelines
     */
    getTimeline(
      direction: TransitionDirection,
      setupIfNeeded: boolean = false,
      fallbackToInTimeline: boolean = false,
    ): gsap.core.Timeline | undefined {
      let timeline =
        timelines[direction] || (fallbackToInTimeline && !setupIfNeeded ? timelines.in : undefined);

      if (!timeline && setupIfNeeded) {
        if (
          direction === 'out' &&
          !setupOptions.setupTransitionOutTimeline &&
          setupOptions.setupTransitionInTimeline &&
          fallbackToInTimeline &&
          !timelines.in
        ) {
          this.setupTimeline({ direction: 'in' });
        } else {
          const setupTimelineFunction =
            direction === 'in'
              ? setupOptions.setupTransitionInTimeline
              : setupOptions.setupTransitionOutTimeline;

          if (setupTimelineFunction) {
            this.setupTimeline({ direction });
          }
        }

        timeline = timelines[direction] || (fallbackToInTimeline ? timelines.in : undefined);
      }

      return timeline;
    },

    /**
     * Create timeline for given direction
     */
    setupTimeline({ direction, reset }: SetupTimelineOptions) {
      const setupTimelineFunction =
        direction === 'in'
          ? setupOptions.setupTransitionInTimeline
          : setupOptions.setupTransitionOutTimeline;

      if (setupTimelineFunction == null) {
        throw new Error(
          `Cannot setup timeline because no setup function is defined for '${direction}' direction`,
        );
      }

      let timelineVariables: gsap.TimelineVars = {
        paused: true,
      };

      if (direction === 'in') {
        // Allow external timeline variables for transition in timeline
        timelineVariables = {
          ...setupOptions.timelineVariables?.(),
          ...timelineVariables,
        };
      }

      let timeline = timelines[direction];

      if (!timeline) {
        timeline = gsap.timeline(timelineVariables);

        // Save new timeline for direction
        timelines[direction] = timeline;

        timeline.eventCallback('onStart', () => setupOptions.onStart?.(direction));
        timeline.eventCallback('onComplete', () => setupOptions.onComplete?.(direction));

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        timeline.eventCallback('onUpdate', () => setupOptions.onUpdate?.(timeline!));

        if (direction === 'in') {
          timeline.eventCallback('onReverseComplete', () => setupOptions.onComplete?.(direction));
        }
      }
      // Reset timeline when timeline exist and reset option is enabled
      else if (reset) {
        clearTimeline(timeline);
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setupTimelineFunction(timeline, setupOptions.refs!, setupOptions.setupVariables!);

      return timeline;
    },

    /**
     * Start transition for given direction from options
     */
    async transition(options: TransitionOptionsWithDirection) {
      const timeline = this.getTimeline(options.direction, true, true);

      if (!timeline) {
        throw new Error(`No timeline found for '${options.direction}' direction`);
      }

      // Timeline should be restarted, the old timeline is killed in case it's active
      timeline.kill();

      options.onStart?.(options.direction);

      // Reverse in transition when out timeline is empty
      if (options.direction === 'out' && timelines.out == null) {
        await timeline.reverse(0, true);
      } else {
        await timeline.restart(true, true);
      }

      options.onComplete?.(options.direction);
      setupOptions.onComplete?.(options.direction);
    },

    /**
     * Shorthand to start transition in
     */
    async transitionIn(options?: TransitionOptions) {
      await this.transition({
        ...options,
        direction: 'in',
      });
    },

    /**
     * Shorthand to start transition out
     */
    async transitionOut(options?: TransitionOptions) {
      await this.transition({
        ...options,
        direction: 'out',
      });
    },
  } as const;

  return controller;
}
