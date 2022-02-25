import {
  Action,
  ThunkAction,
  ThunkDispatch
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  LoadProducts = 'data/loadProducts',
};

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
