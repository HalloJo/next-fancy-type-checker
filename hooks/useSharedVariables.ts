import sharedVariables from '../data/shared-variables/shared-variables.json';

export function useSharedVariables(): Readonly<typeof sharedVariables> {
  return sharedVariables;
}
