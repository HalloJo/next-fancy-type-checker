import { typedObjectKeys } from '@psimk/typed-object';

import DeviceStateTracker, { DeviceStateEvent } from 'seng-device-state-tracker';

import type IDeviceStateData from 'seng-device-state-tracker/lib/IDeviceStateData';
import { useMount } from 'react-use';
import { useState } from 'react';
import sharedVariables from '../data/shared-variables/shared-variables.json';

const cleanMediaQueries = typedObjectKeys(sharedVariables.mediaQueries).reduce((result, key) => {
  // eslint-disable-next-line no-param-reassign
  result[key] = sharedVariables.mediaQueries[key].replace(/'/g, '');
  return result;
}, {} as typeof sharedVariables.mediaQueries);

let deviceStateTracker: DeviceStateTracker | null = null;

export type DeviceState = IDeviceStateData['state'];
export type DeviceStateName = IDeviceStateData['name'];

/**
 * This hook can be used to access the active device state
 *
 * Example:
 * ```ts
 * const { state, name } = useDeviceStateTracker();
 * ```
 */
export const useDeviceStateTracker = (): {
  state: DeviceState;
  name: DeviceStateName;
} => {
  const [activeDeviceState, setActiveDeviceState] = useState<IDeviceStateData>({
    state: 0,
    name: '',
  });

  const onDeviceStateChange = (event: unknown) => {
    const { data } = event as DeviceStateEvent;

    setActiveDeviceState({
      ...data,
    });
  };

  useMount(() => {
    if (deviceStateTracker === null) {
      deviceStateTracker = new DeviceStateTracker({
        deviceState: sharedVariables.deviceState,
        mediaQueries: cleanMediaQueries,
        showStateIndicator: process.env.NODE_ENV === 'development',
      });
    }

    deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, onDeviceStateChange);

    setActiveDeviceState({
      state: deviceStateTracker.currentDeviceState.state ?? 0,
      name: deviceStateTracker.currentDeviceState.name ?? '',
    });

    return () => {
      deviceStateTracker?.removeEventListener(DeviceStateEvent.STATE_UPDATE, onDeviceStateChange);
    };
  });

  return activeDeviceState;
};
