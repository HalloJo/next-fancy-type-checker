import bowser from 'bowser';
import SoundManager from '../audio/SoundManager';
import { useIsClientSide } from './useIsClientSide';

let soundManager: SoundManager | null = null;

/**
 * This hook can be used to access the sound manager
 *
 * Example:
 * ```ts
 * const soundManager = useSoundManager();
 * ```
 */
export const useSoundManager = (): SoundManager | null => {
  const isClientSide = useIsClientSide();

  if (isClientSide && soundManager === null) {
    soundManager = new SoundManager(`/public/audio/`, bowser.safari || bowser.ios ? 'mp3' : 'ogg');
  }

  return soundManager;
};
