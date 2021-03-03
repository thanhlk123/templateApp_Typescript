import * as React from 'react';
import {StackActions} from '@react-navigation/native';

export const navigationRef: any = React.createRef();

export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}

export function replace(name: string, params: any) {
  navigationRef.current?.replace(name, params);
}

export function push(...args: any) {
  navigationRef.current?.dispatch(StackActions.push(args[0], args[1]));
}

export function goBack() {
  return navigationRef.current?.goBack();
}
