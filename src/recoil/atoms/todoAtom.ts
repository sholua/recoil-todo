import { atom } from 'recoil';
import { Todo } from '../../types';

export const todoListAtom = atom({
  key: 'todoListState',
  default: [] as Todo[],
});
