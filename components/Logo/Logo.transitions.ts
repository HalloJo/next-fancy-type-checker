import type {
  SetupTransitionSignature,
  TransitionRef,
} from "../../transition-component/types/transition.types";
import { Back, gsap } from "gsap";
import { unwrapRefs } from "../../transition-component/lib/unwrapRefs";
import SplitText from "gsap/dist/SplitText";

gsap.registerPlugin(SplitText);

type TransitionRefs = {
  elementRef: TransitionRef<HTMLDivElement>;
};

export const setupTransitionInTimeline: SetupTransitionSignature<
  TransitionRefs
> = (timeline, refs) => {
  const { elementRef: element } = unwrapRefs(refs);

  const splitLogoText = new SplitText(element, { type: "words" });
  console.log(element);

  timeline.fromTo(
    splitLogoText.words,
    {
      autoAlpha: 0,
      x: -20,
    },
    {
      autoAlpha: 1,
      x: 0,
      stagger: 0.1,
      ease: Back.easeOut.config(5),
    }
  );

  timeline.add(() => {
    splitLogoText.revert();
  });
};

export const setupTransitionOutTimeline: SetupTransitionSignature<
  TransitionRefs
> = () => {
  // TODO: add a timeline here
};
